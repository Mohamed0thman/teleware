import React from 'react';
import LanguageScreen from '../../src/screens/LanguageScreen';

import {fireEvent} from '@testing-library/react-native';
import {act} from 'react-test-renderer';

describe('languge screen', () => {
  it('renders correctly', () => {
    renderWithRedux(<LanguageScreen />);
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<LanguageScreen />)).toMatchSnapshot();
  });

  it('should navigate to Location', async () => {
    // Wait for the component to be rendered
    const mockNavigation = {replace: jest.fn()};

    const {getByTestId} = renderWithRedux(
      <LanguageScreen navigation={mockNavigation} />,
    );

    fireEvent.press(getByTestId('ar-btn'));

    expect(mockNavigation.replace).toHaveBeenCalledTimes(1);
    expect(mockNavigation.replace).toHaveBeenCalledWith('Location');
  });
});
