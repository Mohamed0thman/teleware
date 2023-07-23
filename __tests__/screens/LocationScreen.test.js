import React from 'react';
import LocationScreen from '../../src/screens/LocationScreen';

import {fireEvent} from '@testing-library/react-native';

describe('location screen', () => {
  it('renders correctly', async () => {
    renderWithRedux(<LocationScreen />);
  });
  it('make snapshot', () => {
    // expect(renderWithRedux(<LocationScreen />)).toMatchSnapshot();
  });
  it('should navigate to Home', async () => {
    const mockNavigation = {replace: jest.fn()};
    const {findByTestId} = renderWithRedux(
      <LocationScreen navigation={mockNavigation} />,
    );

    const btn = await findByTestId('next');
    fireEvent.press(btn);
    expect(mockNavigation.replace).toHaveBeenCalledTimes(1);
    expect(mockNavigation.replace).toHaveBeenCalledWith('Home');
  });
});
