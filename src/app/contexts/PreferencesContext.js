// src/app/contexts/PreferencesContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { format, parseISO } from 'date-fns';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('userPreferences');
    return saved
      ? JSON.parse(saved)
      : {
          language: 'en',
          dateFormat: 'dd/MM/yyyy',
        };
  });

  const [pendingPreferences, setPendingPreferences] = useState({ ...preferences });

  const applyPreferences = useCallback(() => {
    const newPrefs = { ...preferences, ...pendingPreferences };
    setPreferences(newPrefs);
    localStorage.setItem('userPreferences', JSON.stringify(newPrefs));
    localStorage.setItem('i18nextLng', newPrefs.language);
    return newPrefs;
  }, [preferences, pendingPreferences]);

  const updatePreferences = useCallback((newPrefs) => {
    setPendingPreferences((prev) => ({
      ...prev,
      ...newPrefs,
    }));
  }, []);

  const formatDate = useCallback(
    (date, formatStr = null) => {
      try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        return format(dateObj, formatStr || preferences.dateFormat);
      } catch (error) {
        console.error('Error formatting date:', error);
        return date;
      }
    },
    [preferences.dateFormat]
  );

  return (
    
    <PreferencesContext.Provider
      value={{
        preferences,
        pendingPreferences,
        updatePreferences,
        applyPreferences,
        formatDate,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
