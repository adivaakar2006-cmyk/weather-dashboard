import { useContext } from 'react';
import { PreferencesContext } from '../context/PreferencesContext';
import { translations } from '../locales/translations';

export function useTranslation() {
  const { language } = useContext(PreferencesContext);
  
  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };
  
  return { t, language };
}
