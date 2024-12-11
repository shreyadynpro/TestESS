import {
  Box,
  styled,
  Typography,
  InputAdornment,
  TextField,
  ThemeProvider,
  Container,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaCalendar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
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

const PersonalTabNormalUser = ({ handleSubmit, theme }) => {
  const [formData, setFormData] = useState({
    emp_id: '',
    firstName: '',
    mid_name: '',
    lastName: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.userDetails?.user);
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
                  style={{ color: '#00246b', fontSize: '16px' }}
                >
                  Personal
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={user.first_name}
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
                  value={user.mid_name}
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
                  value={user.last_name}
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
                  value={user.email}
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
            </Grid>
          </StyledForm>
        </GradientBackground>
      </Container>
    </ThemeProvider>
  );
};

export default PersonalTabNormalUser;
