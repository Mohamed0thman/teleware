import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import MaskedView from '@react-native-masked-view/masked-view';
import AnimatedSkeleton from './AnimatedSkeleton';

type Props = {};

export default ({children}: React.PropsWithChildren<Props>) => {
  return (
    <MaskedView
      style={{flex: 1, flexDirection: 'row', height: '100%'}}
      maskElement={
        <View
          style={{
            // Transparent background because mask is based off alpha channel.
            backgroundColor: 'transparent',
            flex: 1,
          }}>
          {children}
        </View>
      }>
      <AnimatedSkeleton />
    </MaskedView>
  );
};

const styles = StyleSheet.create({});
