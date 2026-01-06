import React, { useEffect } from 'react';
import { usePreferences } from 'app/contexts/PreferencesContext';
import i18n from 'app/i18n';

const LanguageHandler = () => {
  const { preferences } = usePreferences();

  useEffect(() => {
    if (preferences.language) {
      i18n.changeLanguage(preferences.language);
      document.documentElement.lang = preferences.language;
    }
  }, [preferences.language]);

  return null;
};

export default LanguageHandler;
