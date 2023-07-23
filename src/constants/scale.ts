import {Dimensions, PixelRatio, Platform} from "react-native";
import {isTablet} from "react-native-device-info";

//dimensions of design
const WIDTH = 375;
const HEIGHT = 812;

const SC_Width = Dimensions.get("window").width;
const SC_HEIGHT = Dimensions.get("window").height;

const calcHeight = (size: number) => {
  var {height} = Dimensions.get("window");
  var percentage = (size / HEIGHT) * 100;
  var calculations = (percentage * height) / 100;
  return PixelRatio.roundToNearestPixel(calculations);
};

const calcWidth = (size: number) => {
  var {width} = Dimensions.get("window");
  var percentage = (size / WIDTH) * 100;
  var calculations = (percentage * width) / 100;
  return PixelRatio.roundToNearestPixel(calculations);
};
const calcFont = (size: number) => {
  if (isTablet()) {
    if (SC_HEIGHT > 1000) {
      size = size * 1.7;
    } else if (SC_HEIGHT <= 1000 && SC_HEIGHT > 800) {
      size = size * 1.3;
    }
  }
  const newSize = size;
  if (Platform.OS === "ios") {
    return PixelRatio.roundToNearestPixel(newSize);
  } else {
    return PixelRatio.roundToNearestPixel(newSize) - 2;
  }
};

const rw = calcWidth;
const rh = calcHeight;
const rf = calcFont;

export default {rw, rh, rf, SC_Width, SC_HEIGHT};
