import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import RootNavigation from '../src/navigation/RootNavigation';
import {renderWithRedux} from '../__helper__';

describe('Testing react navigation', () => {
  it('renders correctly', () => {
    renderWithRedux(<RootNavigation />);
  });

  it('snapshot', () => {
    expect(renderWithRedux(<RootNavigation />)).toMatchSnapshot();
  });

  it('page header', async () => {
    const {findByTestId} = renderWithRedux(<RootNavigation />);
    const header = await findByTestId('screen-title');
    expect(header).toBeDefined();
  });
});
