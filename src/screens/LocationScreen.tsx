import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import RootScreen from '../component/RootScreen';

import Mapbox, {MapView} from '@rnmapbox/maps';
import {COLORS, ICONS, SCALE} from '../constants';
import {CustomButton, CustomInput} from '../component/UI';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import {RootStackParamList} from '../navigation/RootNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {checkAndRequestLocationPermission} from '../utils/permissions';
import {useAppDispatch, useAppSelector} from '../store/configureStore';
import {useTranslation} from 'react-i18next';
import {setLocation} from '../store/slices/settingSlice';

const {
  rh,
  rw,

  SC_Width,
  SC_HEIGHT,
} = SCALE;
const {LocationIcon, LocationDotIcon} = ICONS;

type Props = StackScreenProps<RootStackParamList, 'Location'> & {};

const LocationScreen = ({navigation}: Props) => {
  const {t} = useTranslation();

  const [markerCoordinate, setMarkerCoordinate] = useState<number[]>([
    30.626982, 31.129336,
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [location, SetLocation] = useState<{
    shortCode: string;
    placeName: string;
  }>({
    shortCode: '',
    placeName: '',
  });

  const map = useRef<MapView>(null);

  const dispatch = useAppDispatch();

  async function getCenterCoordinates() {
    const center = (await map.current?.getCenter()) as number[];
    setMarkerCoordinate(center);
  }

  const getLocation = () => {
    checkAndRequestLocationPermission().then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setMarkerCoordinate([
              position.coords.longitude,
              position.coords.latitude,
            ]);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const handleOnNext = () => {
    dispatch(setLocation(location));
    navigation.replace('Home');
  };

  const fetchPlaceByCon = async () => {
    try {
      const result = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${markerCoordinate.toString()}.json?access_token=pk.eyJ1IjoibW9oYW1lZC1vdGhtYW4iLCJhIjoiY2xrOGVzeG8wMDFiNTNlbzVncmZtNzMwMCJ9.EImm0qxbCMDHi2EhfrmCow`,
      );

      const codes = result.data.features?.[0]?.context.filter(
        (con: any) => con.short_code,
      );

      SetLocation(prev => ({
        placeName: result.data.features?.[0]?.place_name || prev.placeName,
        shortCode: codes?.[1]?.short_code || prev.shortCode,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPlaceByCon();
    setLoading(false);
  }, [markerCoordinate]);

  useEffect(() => {
    Mapbox.setWellKnownTileServer('Mapbox');
    Mapbox.setAccessToken(
      'pk.eyJ1IjoibW9oYW1lZC1vdGhtYW4iLCJhIjoiY2xrOGVzeG8wMDFiNTNlbzVncmZtNzMwMCJ9.EImm0qxbCMDHi2EhfrmCow',
    );
  }, []);

  return (
    <RootScreen>
      <CustomInput
        containerStyle={styles.input}
        inputConfig={{
          placeholder: 'select Location',
          editable: false,
          placeholderTextColor: COLORS.black,
          value: location.placeName,
        }}
        icon={<LocationIcon width={rw(24)} height={rh(24)} />}
        onIconPress={getLocation}
      />
      <View style={styles.centerIcon}>
        <LocationDotIcon
          width={rw(32)}
          height={rh(32)}
          style={styles.centerIcon}
          fill={COLORS.danger}
        />
      </View>

      <Mapbox.MapView
        ref={map}
        rotateEnabled={false}
        onTouchEnd={getCenterCoordinates}
        style={styles.map}>
        <Mapbox.Camera
          maxZoomLevel={12}
          minZoomLevel={4}
          followZoomLevel={12}
          centerCoordinate={markerCoordinate}
        />
      </Mapbox.MapView>
      <CustomButton
        testID="next"
        label={t('app:buttons.next')}
        onPress={handleOnNext}
        containerStyle={styles.btn}
        disabled={loading}
      />
    </RootScreen>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  input: {
    position: 'absolute',
    top: rh(100),
    zIndex: 100,
    width: '80%',
    alignSelf: 'center',
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
  },
  btn: {
    width: '80%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: rh(50),
    zIndex: 100,
  },
  centerIcon: {
    pointerEvents: 'none',
    width: SC_Width,
    height: SC_HEIGHT,
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'none',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
