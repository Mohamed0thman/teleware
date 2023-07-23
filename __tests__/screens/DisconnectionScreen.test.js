import React from 'react';

import DisconnectionScreen from '../../src/screens/DisconnectionScreen';

describe('languge screen', () => {
  it('renders correctly', () => {
    renderWithRedux(<DisconnectionScreen />);
  });

  it('renders correctly', () => {
    expect(renderWithRedux(<DisconnectionScreen />)).toMatchSnapshot();
  });
});
