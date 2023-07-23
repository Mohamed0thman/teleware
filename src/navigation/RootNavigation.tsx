import {StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LanguageScreen from '../screens/LanguageScreen';
import LocationScreen from '../screens/LocationScreen';
import ChartScreen from '../screens/ChartScreen';
import NetInfo from '@react-native-community/netinfo';
import DisconnectionScreen from '../screens/DisconnectionScreen';
import {Currency} from '../models';
import {useAppSelector} from '../store/configureStore';
import SettingsScreen from '../screens/SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  Language: undefined;
  Location: undefined;
  Chart: {currency: Currency} | undefined;
  Disconnection: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);

  const {lang} = useAppSelector(state => state.setting);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        navigationRef.current?.navigate('Disconnection');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Language"
        screenOptions={{
          headerShown: false,
        }}>
        {!lang && <Stack.Screen name="Language" component={LanguageScreen} />}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen
          options={{headerShown: true}}
          name="Chart"
          component={ChartScreen}
        />
        <Stack.Screen name="Disconnection" component={DisconnectionScreen} />
        <Stack.Screen
          options={{headerShown: true}}
          name="Settings"
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
