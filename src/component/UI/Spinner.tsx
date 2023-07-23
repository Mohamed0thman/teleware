import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

const Spinner = () => {
  return (
    <View style={styles.container} testID="loading">
      <ActivityIndicator size={'large'} color={COLORS.primary} />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
