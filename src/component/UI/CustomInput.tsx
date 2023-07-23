import {
  ViewStyle,
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SCALE} from '../../constants';

const {rh, rw} = SCALE;

type Porps = {
  inputConfig: TextInputProps;
  containerStyle?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  onIconPress: () => void;
};

const CustomInput = ({
  icon,
  inputConfig,
  containerStyle,
  onIconPress,
}: Porps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon && (
        <TouchableOpacity style={styles.icon} onPress={onIconPress}>
          {icon}
        </TouchableOpacity>
      )}

      <TextInput {...inputConfig} style={styles.input} />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: rh(50),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    paddingHorizontal: rw(10),
  },
  icon: {position: 'absolute', right: rw(10)},
  input: {width: '90%', ...FONTS.h5, color: COLORS.black},
});
