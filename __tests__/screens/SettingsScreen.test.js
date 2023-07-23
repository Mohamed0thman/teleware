import React from 'react';
import LanguageScreen from '../../src/screens/LanguageScreen';

import {fireEvent, waitFor, screen} from '@testing-library/react-native';
import SettingsScreen from '../../src/screens/SettingsScreen';
import renderer, {act} from 'react-test-renderer';
import settingSlice, {
  changeLang,
  initialState,
  setLocation,
} from '../../src/store/slices/settingSlice';

describe('languge screen', () => {
  it('renders correctly', () => {
    renderWithRedux(<SettingsScreen />);
  });

  it('snapshot', () => {
    expect(renderWithRedux(<SettingsScreen />)).toMatchSnapshot();
  });

  it('should navigate to Location', async () => {
    const mockNavigation = {navigate: jest.fn()};

    const {getByTestId, findByTestId} = renderWithRedux(
      <SettingsScreen navigation={mockNavigation} />,
    );

    fireEvent.press(getByTestId('toLocation'));
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Location');
  });

  describe('tests for settingSlice', () => {
    test('initialize slice with initialValue', () => {
      const listSliceInit = settingSlice.getInitialState();
      expect(listSliceInit).toBe(initialState);
    });

    test('test change lang', () => {
      const testData = {
        lang: 'ar',
        isRtl: true,
      };

      const afterReducerOperation = settingSlice.reducer(
        initialState,
        changeLang(testData),
      );

      expect(afterReducerOperation).toStrictEqual({
        ...initialState,
        ...testData,
      });
    });

    test('test change location', () => {
      const testData = {location: {shortCode: 'eg', placeName: 'lolololo'}};
      const afterReducerOperation = settingSlice.reducer(
        initialState,
        setLocation(testData.location),
      );

      expect(afterReducerOperation).toStrictEqual({
        ...initialState,
        ...testData,
      });
    });
  });
});
