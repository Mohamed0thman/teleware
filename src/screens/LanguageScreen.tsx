import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/configureStore';
import {useTranslation} from 'react-i18next';
import RootScreen from '../component/RootScreen';
import {COLORS, FONTS, ICONS, SCALE} from '../constants';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/RootNavigation';
import {checkAndRequestNotificationPermission} from '../utils/permissions';
import {changeLang, setNotifee} from '../store/slices/settingSlice';
import {Typography} from '../component/UI';

const {rw, rh, SC_Width} = SCALE;
const {EgyptFlag, AmircaFlag} = ICONS;

type Props = StackScreenProps<RootStackParamList, 'Language'> & {};

const LanguageScreen = ({navigation}: Props) => {
  const {t, i18n} = useTranslation();
  const {isRtl} = useAppSelector(state => state.setting);
  const dispatch = useAppDispatch();

  const handleOnSelectLang = (lang: 'ar' | 'en', isRtl: boolean) => {
    i18n.changeLanguage(lang);
    dispatch(changeLang({lang, isRtl}));
    navigation.replace('Location');
  };

  useEffect(() => {
    checkAndRequestNotificationPermission().then(() =>
      dispatch(setNotifee(true)),
    );
  }, []);

  //   render button to select lang
  const langSelector = (lang: 'ar' | 'en', title: string, isRtl: boolean) => {
    return (
      <TouchableOpacity
        testID={`${lang}-btn`}
        style={styles.langButton}
        onPress={() => handleOnSelectLang(lang, isRtl)}>
        {/* icon */}
        {lang === 'ar' ? (
          <EgyptFlag width={rw(50)} height={rh(50)} />
        ) : (
          <AmircaFlag width={rw(50)} height={rh(50)} />
        )}
        <Text style={styles.langTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <RootScreen containerStyle={styles.rootScreen}>
      <Typography testID="screen-title" isRtl={isRtl} style={styles.title}>
        {t('app:titles.langScreen')}
      </Typography>
      <View
        style={[styles.btns, {flexDirection: isRtl ? 'row-reverse' : 'row'}]}>
        {langSelector('en', 'English', false)}
        {langSelector('ar', 'العربيه', true)}
      </View>
    </RootScreen>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  rootScreen: {},
  title: {
    ...FONTS.h2,
    color: COLORS.black,
    textAlign: 'center',
    marginTop: rh(40),
  },
  btns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  langButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: rw(80),
    height: rh(120),
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  langTitle: {...FONTS.h3, color: COLORS.black},
});
