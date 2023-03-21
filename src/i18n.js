import i18n from 'i18next';
import {initReactI18next,useTranslation} from 'react-i18next';
import Arabic from './Languages/Arabic.json'
import English from './Languages/English.json'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation:English
      },
      ar: {
        translation:Arabic
      },
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'e',
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    debug:true,
  });
  export default i18n;