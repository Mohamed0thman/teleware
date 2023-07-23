import 'react-native-gesture-handler/jestSetup';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'; // or use require
import mockRNPremission from 'react-native-permissions/mock';
import mockRNNotifee from '@notifee/react-native/jest-mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

import {renderWithRedux} from './__helper__';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-device-info', () => mockRNDeviceInfo);

jest.mock('react-native-permissions', () => mockRNPremission);
jest.mock('@notifee/react-native', () => mockRNNotifee);
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: 'en',
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));
// jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
//   get: jest.fn().mockReturnValue({width: 100, height: 100}),
// }));

// global.navigator = {
//   geolocation: {
//     clearWatch: jest.fn(),
//     getCurrentPosition: jest.fn((success, failure, options) => {
//       success({
//         coords: {
//           longitude: 60,
//           latitude: 60,
//         },
//       });
//     }),
//     stopObserving: jest.fn(),
//     watchPosition: jest.fn(),
//   },
// };

global.renderWithRedux = renderWithRedux;
