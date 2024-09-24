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
const EmploymentTab = ({ handleSubmit, theme, userData }) => (
  <ThemeProvider theme={theme}>
    <Container maxWidth="md">
      <GradientBackground>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="left" style={{ color: '#cb8b59', fontSize: '16px' }}>
                Employment
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="job_title"
                value={userData.dpro_designation_offered}
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
                label="Department"
                name="department"
                value={userData.department}
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
                label="Work location"
                name="work_location"
                value={userData.work_location}
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
                label="Primary Skills"
                name="skills"
                value={userData.dpro_parent_skill}
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
                Job
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Client Name"
                name="client"
                value={userData.client}
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
                label="Project Name"
                name="project"
                value={userData.project}
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
                label="Manager Name"
                name="manager_name"
                value={userData.project_manager}
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
                label="Manager Email"
                name="manager_email"
                value={userData.project_manager_email}
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
                label="Manager Contact"
                name="manager_contact"
                value={userData.project_manager_mobile}
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

export default EmploymentTab;
