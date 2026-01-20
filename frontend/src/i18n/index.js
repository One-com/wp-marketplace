import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translations
import en_GB from './locales/en_GB.json';
import da_DK from './locales/da_DK.json';
import de_DE from './locales/de_DE.json';
import es_ES from './locales/es_ES.json';
import fi_FI from './locales/fi_FI.json';
import fr_FR from './locales/fr_FR.json';
import it_IT from './locales/it_IT.json';
import nl_NL from './locales/nl_NL.json';
import no_NO from './locales/no_NO.json';
import pt_PT from './locales/pt_PT.json';
import sv_SE from './locales/sv_SE.json';

const resources = {
  en_GB: { translation: en_GB },
  da_DK: { translation: da_DK },
  de_DE: { translation: de_DE },
  es_ES: { translation: es_ES },
  fi_FI: { translation: fi_FI },
  fr_FR: { translation: fr_FR },
  it_IT: { translation: it_IT },
  nl_NL: { translation: nl_NL },
  no_NO: { translation: no_NO },
  nb_NO: { translation: no_NO },
  pt_PT: { translation: pt_PT },
  sv_SE: { translation: sv_SE },
  fi: { translation: fi_FI },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en_GB', // default fallback
  fallbackLng: 'en_GB',
  interpolation: { escapeValue: false },
});

export default i18n;
