import SCALE from './scale';
import i18next from 'i18next';

const {rf} = SCALE;

const COLORS = {
  // primary  colors
  // Green
  primary: '#007864',
  lightPrimary: '#78CDBF',

  // danger
  danger: '#D7191C',
  lightDanger: '#FEB9BA',

  // success
  success: '#199E74',
  lightSuccess: '#ABF8DF',

  // social
  facebook: '#4267B2',
  gmail: '#EB4335',

  // black
  black: '#000',

  // white
  white: '#FFFFFF',

  //grey
  lightGrey: '#e1e1e1',
  darkGrey: '#979797',

  // shadow
  blackShadow: 'rgba(20, 20, 20, 0.37)',

  //
  linearGradientColor: 'rgba(20, 20, 20)',
};

const SIZES = {
  // global sizes
  base: 10,
  font: 14,
  radius: 12,
  padding: 16,
  margin: 20,

  // font sizes
  largeTitle: rf(30),
  h1: rf(24),
  h2: rf(22),
  h3: rf(20),
  h4: rf(16),
  h5: rf(14),

  xs: rf(12),
  s: rf(14),
  m: rf(16),
  l: rf(24),
  lg: rf(30),
};

const FONTS = {
  largeTitle: {
    fontSize: SIZES.largeTitle,
    fontFamily: 'Roboto-Black',
  },
  h1: {
    fontSize: SIZES.h1,
    fontFamily: 'Roboto-Bold',
  },
  h2: {
    fontSize: SIZES.h2,
    fontFamily: 'Roboto-Bold',
  },
  h3: {
    fontSize: SIZES.h3,
    fontFamily: 'Roboto-Bold',
  },
  h4: {
    fontSize: SIZES.h4,
    fontFamily: 'Roboto-Medium',
  },
  h5: {
    fontSize: SIZES.h5,
    fontFamily: 'Roboto-Medium',
  },
  large: {
    fontSize: SIZES.l,
    fontFamily: 'Roboto-Regular',
  },
  middle: {
    fontSize: SIZES.m,
    fontFamily: 'Roboto-Regular',
  },
  small: {
    fontSize: SIZES.s,
    fontFamily: 'Roboto-Regular',
  },
  xsmall: {
    fontSize: SIZES.xs,
    fontFamily: 'Roboto-Regular',
  },
};

export {COLORS, SIZES, FONTS};
