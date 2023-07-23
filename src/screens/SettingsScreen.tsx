import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootScreen from '../component/RootScreen';
import {RootStackParamList} from '../navigation/RootNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '../store/configureStore';
import {CustomButton, LineDivider, RadioButton} from '../component/UI';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import {COLORS, FONTS, ICONS, SCALE, SIZES} from '../constants';
import {setNotifee} from '../store/slices/settingSlice';

const {BellIcon} = ICONS;
const {rh, rw} = SCALE;

type Props = StackScreenProps<RootStackParamList, 'Settings'> & {};

const SettingsScreen = ({navigation}: Props) => {
  const {isRtl, location, enableNotifee} = useAppSelector(
    state => state.setting,
  );

  const dispatch = useAppDispatch();

  return (
    <RootScreen containerStyle={styles.root}>
      <Text style={{...FONTS.h3, color: COLORS.black}}>Your Location</Text>
      <Text style={{...FONTS.h4, color: COLORS.black, marginTop: rh(10)}}>
        {location?.placeName}
      </Text>
      <CustomButton
        testID="toLocation"
        label="Change Location"
        onPress={() => navigation.navigate('Location')}
        containerStyle={{marginTop: rh(20), alignSelf: 'center'}}
      />
      <LineDivider lineStyle={{marginVertical: rh(20)}} />

      <Text style={{...FONTS.h3, color: COLORS.black}}>Change Setting</Text>

      <RadioButton
        icon={<BellIcon width={rw(24)} height={rh(24)} fill={COLORS.white} />}
        isSelected={enableNotifee}
        onPress={() => dispatch(setNotifee(!enableNotifee))}
      />
    </RootScreen>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  root: {paddingHorizontal: rw(SIZES.radius)},
});
