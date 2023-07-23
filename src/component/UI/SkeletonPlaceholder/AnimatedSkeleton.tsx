import {StyleSheet, Text, View, Animated, Easing} from "react-native";
import React from "react";
import {SCALE} from "../../../constants";

import LinearGradient from "react-native-linear-gradient";

const AnimateGradient = Animated.createAnimatedComponent(LinearGradient);

const AnimatedSkeleton = () => {
  const animatedValue = React.useRef(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue.current, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const translateX = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCALE.SC_Width, SCALE.SC_Width],
  });

  return (
    <View style={styles.container}>
      <AnimateGradient
        colors={["#C8EBE5", "#E3F6F3", "#E3F6F3", "#C8EBE5"]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.linearGradient, {transform: [{translateX}]}]}
      />
    </View>
  );
};

export default AnimatedSkeleton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C8EBE5",
    borderColor: "#E3F6F3",
    width: "100%",
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
