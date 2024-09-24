import {
  Badge,
  Box,
  Button,
  Card,
  Modal,
  styled,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Paper,
  useTheme,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Container,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
  createTheme,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import React from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaCalendar } from 'react-icons/fa';
const StyledForm = styled('form')(({ theme }) => ({
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#22cfe2', // Label color when focused
  },
  '& .MuiInputLabel-root:hover': {
    color: '#22cfe2', // Label color on hover
  },
  '& .MuiInputBase-root': {
    '&:hover fieldset': {
      borderColor: '#22cfe2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#22cfe2',
    },
  },
}));
const GradientBackground = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  color: 'blue',
}));

const AccountTab = ({ handleSubmit, theme, userData }) => (
  <ThemeProvider theme={theme}>
    <Container maxWidth="md">
      <GradientBackground>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="left" style={{ color: '#cb8b59', fontSize: '16px' }}>
                Bank Account
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Name"
                name="bank_name"
                value={userData.bank_name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name as per bank"
                name="holder_name"
                value={userData.name_as_per_bank}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Account No"
                name="account_no"
                value={userData.bank_account_number}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Branch Name"
                name="branch_name"
                value={userData.branch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifsc"
                value={userData.bank_ifsc}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="left" style={{ color: '#cb8b59', fontSize: '16px' }}>
                PF Account
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="PF Number"
                name="pf_no"
                value={userData.pf_no}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="UAN Number"
                name="UAN_no"
                value={userData.uan}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="PF Join Date"
                name="pf_join_date"
                value={userData.pf_join_date}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="left" style={{ color: '#cb8b59', fontSize: '16px' }}>
                Other IDs
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Adhar Number"
                name="adhar_no"
                value={userData.aadhaar_no}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Permanent Account Number"
                name="pan_no"
                value={userData.identity_no}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser />
                    </InputAdornment>
                  ),
                }}
                disabled
              />
            </Grid>
          </Grid>
        </StyledForm>
      </GradientBackground>
    </Container>
  </ThemeProvider>
);

export default AccountTab;
