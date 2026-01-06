import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Store, persistor } from './redux/Store';
import routes from './routes';
import i18n from './i18n';
import { PreferencesProvider } from './contexts/PreferencesContext';
import LanguageHandler from './components/LanguageHandler';

const App = () => {
  const content = useRoutes(routes);

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <SettingsProvider>
            <PreferencesProvider>
              <LanguageHandler />
              <MatxTheme>
                <AuthProvider>{content}</AuthProvider>
              </MatxTheme>
            </PreferencesProvider>
          </SettingsProvider>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
