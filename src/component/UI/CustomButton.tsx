import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SCALE} from '../../constants';

const {rh} = SCALE;

type Props = TouchableOpacityProps & {
  onPress: () => void;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const CustomButton = ({
  label,
  containerStyle,
  onPress,
  disabled,
  ...otherProps
}: Props) => {
  return (
    <TouchableOpacity
      {...otherProps}
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: rh(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  label: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});
