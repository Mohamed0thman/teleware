import {StyleSheet, Text, TextProps, StyleProp, TextStyle} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {COLORS} from '../../constants';

type Props = TextProps & {
  isRtl: boolean;
  style?: StyleProp<TextStyle>;
};

const Typography = ({
  children,
  isRtl,
  style,
  ...otherProps
}: PropsWithChildren<Props>) => {
  return (
    <Text
      style={[styles.text, {textAlign: isRtl ? 'right' : 'left'}, style]}
      {...otherProps}>
      {children}
    </Text>
  );
};

export default Typography;

const styles = StyleSheet.create({
  text: {color: COLORS.black},
});
