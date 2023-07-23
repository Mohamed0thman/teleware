import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {FC, PropsWithChildren} from 'react';
import {COLORS} from '../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

const RootScreen: FC<PropsWithChildren<Props>> = ({
  children,
  containerStyle,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        styles.container,
        containerStyle,
      ]}>
      {children}
    </View>
  );
};

export default RootScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
