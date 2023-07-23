import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import locales from './locales';
import {store} from '../store/configureStore';
import {I18nManager} from 'react-native';

const resources = locales;

console.log('store.getState().setting.lang', store.getState().setting.lang);

export async function initI18Next() {
  I18nManager.forceRTL(false);
  I18nManager.allowRTL(false);

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'en',
    lng: store.getState().setting.lang || 'en',

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });
}
