import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Animated,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';

type Props = {
  icon: React.ReactNode;
  label?: string;
  isSelected?: boolean;
  onPress?: () => void;
};
const RadioButton = ({icon, label, isSelected, onPress}: Props) => {
  const radioAnimated = React.useRef(new Animated.Value(0)).current;
  const circleColorAnimated = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: [COLORS.darkGrey, COLORS.primary],
  });
  const lineColorAnimated = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: [COLORS.darkGrey, COLORS.primary],
  });

  React.useEffect(() => {
    if (isSelected) {
      Animated.timing(radioAnimated, {
        toValue: 17,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(radioAnimated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isSelected]);

  return (
    <View style={{flexDirection: 'row', height: 80, alignItems: 'center'}}>
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: COLORS.primary,
        }}>
        {icon}
      </View>

      {/* Label  */}
      <View style={{flex: 1, marginLeft: SIZES.radius}}>
        <Text style={{...FONTS.h3, color: COLORS.primary}}>{label}</Text>
      </View>

      {/* Radio Button */}
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}>
        <Animated.View
          style={{
            width: '100%',
            height: 5,
            borderRadius: 3,
            backgroundColor: lineColorAnimated,
          }}
        />

        <Animated.View
          style={{
            position: 'absolute',
            left: radioAnimated,
            width: 25,
            height: 25,
            borderRadius: 15,
            borderWidth: 5,
            borderColor: circleColorAnimated,
            backgroundColor: lineColorAnimated,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
