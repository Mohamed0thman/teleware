import React from 'react';

import {fireEvent, screen} from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import {act} from 'react-test-renderer';
import axios from 'axios';
import mockAxios from 'jest-mock-axios';

jest.mock('axios');

describe('Home screen', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('renders correctly', () => {
    renderWithRedux(<HomeScreen />);
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<HomeScreen />)).toMatchSnapshot();
  });

  it('should loading spinner', async () => {
    const {getAllByTestId} = renderWithRedux(<HomeScreen />);

    const loading = getAllByTestId('skeletonPlaceHolder');
    expect(loading).toBeDefined();
  });

  it('should get all currencies', async () => {
    const {findAllByTestId} = renderWithRedux(<HomeScreen />);
    const currencies = await findAllByTestId('currencies');

    expect(currencies.length).toBeGreaterThan(0);
  });

  it('should get currency text', async () => {
    const {findByText} = renderWithRedux(<HomeScreen />);

    const text = await findByText('Euro');
    const symbol = await findByText('€');
    const name = await findByText('EUR');

    expect(text).toBeDefined();
    expect(symbol).toBeDefined();
    expect(name).toBeDefined();
  });

  it('should get all currencies', async () => {
    const {findAllByTestId} = renderWithRedux(<HomeScreen />);
    const currencies = await findAllByTestId('currencies');

    expect(currencies.length).toBeGreaterThan(0);
  });

  it('should navigate to  Chart with data', async () => {
    const mockNavigation = {navigate: jest.fn()};

    const {findByLabelText} = renderWithRedux(
      <HomeScreen navigation={mockNavigation} />,
    );
    const currencyBtn = await findByLabelText('currency-EUR');

    await act(() => fireEvent.press(currencyBtn));

    expect(mockNavigation.navigate).toHaveBeenCalled();
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Chart', {
      currency: {
        key: 'EUR',
        name: 'Euro',
        symbol: '€',
      },
    });
  });

  describe('when API call is successful', () => {
    it('should return users list', async () => {
      const BASE_URL = 'https://api.vatcomply.com/';
      const currencies = {
        EUR: {
          name: 'Euro',
          symbol: '€',
        },
        USD: {
          name: 'US Dollar',
          symbol: '$',
        },
      };

      axios.get.mockResolvedValueOnce(currencies);

      const result = await axios.get(`${BASE_URL}currencies`);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(Object.keys(result).length).toBeGreaterThan(0);
      expect(axios.get.mock.calls[0][0]).toBe(`${BASE_URL}currencies`);
    });
  });

  describe('when API call fails', () => {
    it('should return empty users list', async () => {
      const BASE_URL = 'https://api.vatcomply.com/';

      const message = 'Network Error';
      axios.get.mockResolvedValueOnce(new Error(message));

      const result = await axios.get(`${BASE_URL}currencies`);

      console.log('result', result);
      console.log('result', result);
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}currencies`);
      expect(result.message).toEqual(message);
    });
  });
});
