import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from '../src/store/configureStore';
import {render} from '@testing-library/react-native';
import React from 'react';

export function renderWithRedux(renderedCompnent) {
  return render(
    <SafeAreaProvider>
      <Provider store={store}>{renderedCompnent}</Provider>
    </SafeAreaProvider>,
  );
}
