import {Platform} from 'react-native';
import Permissions, {
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';
import {showAlertInfo} from './main';
import notifee from '@notifee/react-native';

const IS_IOS = Platform.OS === 'ios';

export async function checkAndRequestNotificationPermission() {
  if (IS_IOS) {
    return await notifee.requestPermission();
  } else {
    return await checkAndRequestPermission(
      'Notification',
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    );
  }
}

export async function checkAndRequestLocationPermission() {
  return await checkAndRequestPermission(
    'Location',
    IS_IOS
      ? PERMISSIONS.IOS.LOCATION_ALWAYS
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );
}

export async function checkAndRequestPermission(
  name: string,
  type: Permission,
) {
  try {
    const status = await Permissions.check(type);

    const titleAlert = 'Permission to use ' + name;
    const messageAlert =
      'To use ' + name + ' activate it in the phone settings';
    if (status === RESULTS.GRANTED) {
      return true;
    }
    console.log('status', type, status);

    if (IS_IOS && (status === RESULTS.BLOCKED || status === RESULTS.DENIED)) {
      try {
        await showAlertInfo(titleAlert, messageAlert);
        await Permissions.openSettings();
      } catch (e) {
        return false;
      }
    }

    const permRequest = await Permissions.request(type);
    if (permRequest === RESULTS.BLOCKED) {
      try {
        await showAlertInfo(titleAlert, messageAlert);
        await Permissions.openSettings();
      } catch (e) {
        return false;
      }
    }

    return permRequest === RESULTS.GRANTED;
  } catch (error) {
    return false;
  }
}
