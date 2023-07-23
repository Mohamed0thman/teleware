import React from 'react';
import LanguageScreen from '../../src/screens/LanguageScreen';

import {fireEvent, screen} from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import renderer, {act} from 'react-test-renderer';
import ChartScreen from '../../src/screens/ChartScreen';

describe('languge screen', () => {
  const route = {params: {currency: {key: 'EUR', name: 'Euro', symbol: '€'}}};
  it('renders correctly', () => {
    renderWithRedux(<ChartScreen route={route} />);
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<ChartScreen route={route} />)).toMatchSnapshot();
  });

  it('should render Spinner', async () => {
    // Wait for the component to be rendered

    const {getByTestId} = renderWithRedux(<ChartScreen route={route} />);

    const spinner = getByTestId('loading');

    expect(spinner).toBeDefined();
  });
});
