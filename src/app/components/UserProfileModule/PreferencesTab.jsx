// src/app/components/UserProfileModule/PreferencesTab.jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Divider,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import { usePreferences } from 'app/contexts/PreferencesContext';
import { useTranslation } from 'react-i18next';

const TabPanel = styled(Box)({
  padding: 0,
  marginTop: '16px',
});

const dateFormats = [
  { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY (e.g., 25/12/2023)' },
  { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY (e.g., 12/25/2023)' },
  { value: 'yyyy-MM-dd', label: 'YYYY-MM-DD (e.g., 2023-12-25)' },
  { value: 'dd MMM yyyy', label: 'DD MMM YYYY (e.g., 25 Dec 2023)' },
];

const PreferencesTab = () => {
  const { t, i18n } = useTranslation();
  const { preferences, pendingPreferences, updatePreferences, applyPreferences, formatDate } =
    usePreferences();

  const [showSuccess, setShowSuccess] = useState(false);

  const handleApply = () => {
    const newPrefs = applyPreferences();
    i18n.changeLanguage(newPrefs.language);
    setShowSuccess(true);
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  const languages = [
    { code: 'en', name: t('English') },
    { code: 'kn', name: t('Kannada') },
    { code: 'hi', name: t('Hindi') },
  ];

  return (
    <TabPanel>
      <Typography align="center" color="warning.main" sx={{ mb: 3, fontWeight: 'bold' }}>
        This section is under development
      </Typography>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('preferences.title')}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 3 }}>
              <InputLabel>{t('preferences.language')}</InputLabel>
              <Select
                value={pendingPreferences.language || 'en'}
                onChange={(e) => updatePreferences({ language: e.target.value })}
                label={t('preferences.language')}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 3 }}>
              <InputLabel>{t('preferences.dateFormat')}</InputLabel>
              <Select
                value={pendingPreferences.dateFormat || 'dd/MM/yyyy'}
                onChange={(e) => updatePreferences({ dateFormat: e.target.value })}
                label={t('preferences.dateFormat')}
              >
                {dateFormats.map((format) => (
                  <MenuItem key={format.value} value={format.value}>
                    {format.label}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                {t('preferences.preview')}: {formatDate(new Date())}
              </Typography>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApply}
            disabled={
              pendingPreferences.language === preferences.language &&
              pendingPreferences.dateFormat === preferences.dateFormat
            }
          >
            {t('app.apply')}
          </Button>
        </Box>
      </Card>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {t('app.preferencesSaved')}
        </Alert>
      </Snackbar>
    </TabPanel>
  );
};

export default PreferencesTab;
