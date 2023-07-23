module.exports = {
  preset: 'react-native',

  setupFiles: ['<rootDir>/jestSetupFile.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    '@rnmapbox/maps/setup-jest',
    '@testing-library/jest-native/extend-expect',
  ],

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|@rnmapbox|@notifee|rollbar-react-native|@fortawesome|@react-native|@react-navigation)',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
  preset: '@testing-library/react-native',
  collectCoverage: true,
};
