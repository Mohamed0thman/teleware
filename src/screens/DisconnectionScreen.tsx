import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import RootScreen from '../component/RootScreen';
import {FONTS, IMAGES, SCALE} from '../constants';
import {CustomButton, Typography} from '../component/UI';
import {useAppSelector} from '../store/configureStore';
import NetInfo from '@react-native-community/netinfo';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNavigation';
import {useTranslation} from 'react-i18next';

const {rh, rw} = SCALE;

type Props = StackScreenProps<RootStackParamList, 'Disconnection'> & {};

const DisconnectionScreen = ({navigation}: Props) => {
  const {isRtl} = useAppSelector(state => state.setting);
  const [isRetrying, setIsRetring] = useState<boolean>(false);

  const {t} = useTranslation();

  const onRetry = async () => {
    setIsRetring(true);
    const netInfo = await NetInfo.fetch();
    if (netInfo.isConnected) {
      navigation.replace('Home');
    }
    setIsRetring(false);
  };

  return (
    <RootScreen containerStyle={styles.rootScreen}>
      <Image
        source={IMAGES.disconctionImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Typography isRtl={isRtl} style={{marginTop: rh(5), ...FONTS.h3}}>
        {t('app:titles.connectionError')}
      </Typography>
      <Typography style={{marginTop: rh(5), ...FONTS.h4}} isRtl={isRtl}>
        {t('app:titles.oops')}{' '}
      </Typography>
      <CustomButton
        label={t('app:buttons.retry')}
        onPress={onRetry}
        disabled={isRetrying}
        containerStyle={{marginTop: rh(20)}}
      />
    </RootScreen>
  );
};

export default DisconnectionScreen;

const styles = StyleSheet.create({
  rootScreen: {justifyContent: 'center', alignItems: 'center'},
  image: {width: '80%', height: '50%'},
});
