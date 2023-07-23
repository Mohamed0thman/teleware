/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store/configureStore';
import RootNavigation from './navigation/RootNavigation';
import {initI18Next} from './localization';

const onBeforeLift = async () => {
  await initI18Next();
};

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={onBeforeLift}>
          <RootNavigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
