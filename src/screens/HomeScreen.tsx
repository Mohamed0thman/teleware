import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useCallback} from 'react';
import RootScreen from '../component/RootScreen';
import {RootStackParamList} from '../navigation/RootNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {COLORS, FONTS, ICONS, SCALE, SIZES} from '../constants';
import {useAppDispatch, useAppSelector} from '../store/configureStore';
import {getCurrencies} from '../store/slices/mainSlice';
import {Currency} from '../models';
import {SkeletonPlaceholder, Spinner, Typography} from '../component/UI';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

const {rh, rw} = SCALE;
const {GearIcon} = ICONS;

type Props = StackScreenProps<RootStackParamList, 'Home'> & {};

const colors = [
  ['#a18cd1', '#fbc2eb'],
  ['#f9d423', '#ff4e50'],
  ['#6a11cb', '#2575fc'],
  ['#ff9a9e', '#fad0c4'],
];

const HomeScreen = ({navigation}: Props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const {isLoading, currencies, error} = useAppSelector(state => state.main);
  const {isRtl} = useAppSelector(state => state.setting);

  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCurrencies()).finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: Currency; index: number}) => {
      const backgroundColor = colors[index % colors.length];

      return (
        <TouchableOpacity
          testID="currencies"
          accessibilityLabel={`currency-${item.key}`}
          style={styles.currencie}
          onPress={() => navigation.navigate('Chart', {currency: item})}>
          <LinearGradient
            colors={backgroundColor}
            style={styles.linearGradient}>
            <Text testID={item.key} style={styles.key}>
              {item.key}
            </Text>
            <Text testID={item.name} style={styles.name}>
              {item.name}
            </Text>
            <Text testID={item.symbol} style={styles.symbol}>
              {item.symbol}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    },
    [],
  );

  const renderSkeleton = () => {
    return (
      <View
      testID='skeletonPlaceHolder'
        style={[
          styles.currencie,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <SkeletonPlaceholder>
          <View style={styles.placholder}></View>
        </SkeletonPlaceholder>
      </View>
    );
  };

  // if (isLoading) return <Spinner />;

  console.log('isRtl', isRtl);

  return (
    <RootScreen containerStyle={styles.rootScreen}>
      <View
        style={{
          flexDirection: isRtl ? 'row' : 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <GearIcon width={rw(24)} height={rh(24)} />
        </TouchableOpacity>

        <Typography testID="screen-title" isRtl={isRtl} style={styles.title}>
          {t('app:titles.HomeTitle')}
        </Typography>
      </View>
      {isLoading ? (
        <FlatList
          scrollEnabled
          horizontal={false}
          keyExtractor={(item, index) => `currencies-${index}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={new Array(12)}
          renderItem={renderSkeleton}
          ItemSeparatorComponent={() => <View style={{height: rh(20)}} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <FlatList
          scrollEnabled
          horizontal={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={item => `currencies-${item.key}`}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={currencies}
          contentContainerStyle={{paddingBottom: rh(20)}}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{height: rh(20)}} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </RootScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rootScreen: {paddingHorizontal: rw(20)},
  currencie: {
    width: rw(150),
    height: rh(140),
    borderRadius: rw(SIZES.radius),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    padding: rw(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {...FONTS.h1, color: COLORS.black, marginVertical: rh(20)},
  key: {...FONTS.h3, color: COLORS.white},
  name: {...FONTS.h3, color: COLORS.white},
  symbol: {...FONTS.h3, color: COLORS.white},
  textholder: {
    height: rh(20),
    backgroundColor: COLORS.black,
    width: rw(50),
    marginTop: rh(5),
  },
  placholder: {
    backgroundColor: COLORS.black,
    flex: 1,
    width: '100%',
  },
});
