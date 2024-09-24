import {
  Box,
  Button,
  styled,
  Typography,
  InputAdornment,
  TextField,
  ThemeProvider,
  Container,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaCalendar } from 'react-icons/fa';
import axios from 'axios'; // You can use axios or fetch for API calls
import commonConfig from 'app/components/commonConfig';
import { getAccessToken } from 'app/utils/utils';
import SnackbarUtils from 'SnackbarUtils';
const authToken = getAccessToken();
const StyledForm = styled('form')(({ theme }) => ({
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#22cfe2',
  },
  '& .MuiInputLabel-root:hover': {
    color: '#22cfe2',
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

const PersonalTab = ({ handleSubmit, theme, userData }) => {
  const [formData, setFormData] = useState({
    emp_id: '',
    firstName: '',
    mid_name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    dob: '',
    marital_status: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Optionally, you can add validation logic here and update errors state
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <GradientBackground>
          <StyledForm onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  align="left"
                  style={{ color: '#cb8b59', fontSize: '16px' }}
                >
                  Personal
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Employee ID"
                  name="emp_id"
                  value={userData.emp_id}
                  onChange={handleChange}
                  error={!!errors.emp_id}
                  helperText={errors.emp_id}
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
                  label="First Name"
                  name="firstName"
                  value={userData.first_name}
                  onChange={handleChange}
                  error={!!errors.first_name}
                  helperText={errors.first_name}
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
                  label="Middle Name"
                  name="mid_name"
                  value={userData.mid_name}
                  onChange={handleChange}
                  error={!!errors.mid_name}
                  helperText={errors.mid_name}
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
                  label="Last Name"
                  name="lastName"
                  value={userData.last_name}
                  onChange={handleChange}
                  error={!!errors.last_name}
                  helperText={errors.last_name}
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
                  label="Email"
                  name="email"
                  type="email"
                  value={userData.email1}
                  onChange={handleChange}
                  error={!!errors.email1}
                  helperText={errors.email1}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaEnvelope />
                      </InputAdornment>
                    ),
                  }}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={userData.phone_mobile}
                  onChange={handleChange}
                  error={!!errors.phone_mobile}
                  helperText={errors.phone_mobile}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaPhoneAlt />
                      </InputAdornment>
                    ),
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={userData.date_of_birth}
                  onChange={handleChange}
                  error={!!errors.date_of_birth}
                  helperText={errors.date_of_birth}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaCalendar />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-label="Gender"
                      name="Gender"
                      value={userData.sex}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Male"
                        control={
                          <Radio
                            sx={{
                              color: '#22cfe2',
                              '&.Mui-checked': {
                                color: '#cb8b59',
                              },
                            }}
                          />
                        }
                        label="Male"
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            color: userData.sex === 'Male' ? '#cb8b59' : '#00246b',
                          },
                        }}
                      />
                      <FormControlLabel
                        value="Female"
                        control={
                          <Radio
                            sx={{
                              color: '#22cfe2',
                              '&.Mui-checked': {
                                color: '#cb8b59',
                              },
                            }}
                          />
                        }
                        label="Female"
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            color: userData.sex === 'Female' ? '#cb8b59' : '#00246b',
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Marital Status</FormLabel>
                  <RadioGroup
                    row
                    aria-label="Marital Status"
                    name="marital_status"
                    value={userData.marital_status}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Married"
                      control={
                        <Radio
                          sx={{
                            color: '#22cfe2',
                            '&.Mui-checked': {
                              color: '#cb8b59',
                            },
                          }}
                        />
                      }
                      label="Married"
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          color: userData.marital_status === 'Married' ? '#cb8b59' : '#00246b',
                        },
                      }}
                    />
                    <FormControlLabel
                      value="Single"
                      control={
                        <Radio
                          sx={{
                            color: '#22cfe2',
                            '&.Mui-checked': {
                              color: '#cb8b59',
                            },
                          }}
                        />
                      }
                      label="Single"
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          color: userData.marital_status === 'Single' ? '#cb8b59' : '#00246b',
                        },
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    backgroundColor: '#22cfe2',
                    '&:hover': { backgroundColor: '#cb8b59' },
                  }}
                >
                  Submit
                </Button>
              </Grid> */}
            </Grid>
          </StyledForm>
        </GradientBackground>
      </Container>
    </ThemeProvider>
  );
};

export default PersonalTab;
