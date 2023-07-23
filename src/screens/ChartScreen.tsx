import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import RootScreen from '../component/RootScreen';
import {RootStackParamList} from '../navigation/RootNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {Currency} from '../models';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import {getCurrencyRates} from '../store/slices/mainSlice';
import {useAppDispatch, useAppSelector} from '../store/configureStore';
import {COLORS, FONTS, SCALE} from '../constants';
import {Spinner} from '../component/UI';

const {rh, rw, SC_Width} = SCALE;

type Props = StackScreenProps<RootStackParamList, 'Chart'> & {};

const ChartScreen = ({navigation, route}: Props) => {
  const {currency} = route.params as {currency: Currency};

  const [loading, setLoading] = useState<boolean>(false);

  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const {currencyRates} = useAppSelector(state => state.main);

  const dispatch = useAppDispatch();

  const subtractDay = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const subtractMonth = moment().subtract(1, 'months').format('YYYY-MM-DD');
  const subtractYear = moment().subtract(1, 'years').format('YYYY-MM-DD');
  const subtractFiveYear = moment().subtract(5, 'years').format('YYYY-MM-DD');

  const filterDates = [
    {id: 1, date: subtractDay, title: '1D'},
    {id: 2, date: subtractMonth, title: '1M'},
    {id: 3, date: subtractYear, title: '1Y'},
    {id: 4, date: subtractFiveYear, title: '5Y'},
  ];

  function filterByDate(filterDate: string) {
    dispatch(getCurrencyRates({date: filterDate, base: currency.key}));
  }

  useEffect(() => {
    setLoading(true);
    dispatch(getCurrencyRates({date, base: currency.key})).finally(() =>
      setLoading(false),
    );
  }, [currency.key]);

  const renderFilter = () => {
    return (
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filtter</Text>
        <View style={styles.dates}>
          {filterDates.map((date, index) => (
            <TouchableOpacity
              key={`date${index}`}
              style={styles.date}
              onPress={() => {
                setDate(date.date);
                filterByDate(date.date);
              }}>
              <Text style={styles.dateText}>{date.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  if (loading) return <Spinner />;
  return (
    <RootScreen containerStyle={styles.rootScreen}>
      {renderFilter()}
      {currencyRates && (
        <LineChart
          data={{
            labels: currencyRates?.keys || [''],

            datasets: [
              {
                data: currencyRates?.values || [1, 2, 3, 4],
              },
            ],
          }}
          width={SC_Width} // from react-native
          height={rh(600)}
          yAxisLabel="$"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
            barPercentage: 0.5,
            barRadius: 5,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          withInnerLines={false}
          withOuterLines={false}
        />
      )}
    </RootScreen>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  rootScreen: {},
  filterContainer: {paddingHorizontal: rw(20), marginBottom: rh(20)},
  filterTitle: {...FONTS.h3, color: COLORS.black, marginVertical: rh(10)},
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: rw(20),
  },
  date: {borderWidth: 1, borderColor: COLORS.black, padding: rw(20)},
  dateText: {...FONTS.h4, color: COLORS.black},
});
