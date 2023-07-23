import {StyleSheet, Text, View, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

type Props = {
  lineStyle?: StyleProp<ViewStyle>;
};
const LineDivider = ({lineStyle}: Props) => {
  return (
    <View
      style={[
        {height: 2, width: '100%', backgroundColor: COLORS.lightGrey},
        lineStyle,
      ]}
    />
  );
};

export default LineDivider;

const styles = StyleSheet.create({});
