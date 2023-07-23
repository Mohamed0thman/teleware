import {Alert} from 'react-native';

export async function showAlertInfo(title: string, message: string) {
  return new Promise(resolve => {
    Alert.alert(title, message, [{text: 'Ok', onPress: resolve}]);
  });
}

export const changeItemToBeFirst = (
  item: string | number,
  arr: (string | number)[],
) => {
  const foundIdx = arr.findIndex(el => el == item); // -> foundIdx = 3
  arr.splice(foundIdx, 1);
  arr.unshift(item);
  return arr;
};
