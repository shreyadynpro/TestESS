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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
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
const AddressTab = ({ handleSubmit, theme, userData }) => {
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
                  Present Address
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    name="country"
                    value={userData.primary_address_country}
                    onChange={handleChange}
                    disabled
                  >
                    <MenuItem value="">Select a country</MenuItem>
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="US">United States</MenuItem>
                    <MenuItem value="UK">United Kingdom</MenuItem>
                    <MenuItem value="CA">Canada</MenuItem>
                    <MenuItem value="AU">Australia</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={userData.primary_address_state}
                    onChange={handleChange}
                    disabled
                  >
                    <MenuItem value="">Select a state</MenuItem>
                    <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                    <MenuItem value="Gujrat">Gujrat</MenuItem>
                    <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                    <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="city"
                    value={userData.primary_address_city}
                    onChange={handleChange}
                    disabled
                  >
                    <MenuItem value="">Select a city</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                    <MenuItem value="Nashik">Nashik</MenuItem>
                    <MenuItem value="Nagpur">Nagpur</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={userData.primary_address_street}
                  onChange={handleChange}
                  error={!!errors.primary_address_street}
                  helperText={errors.primary_address_street}
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
                  label="Pincode"
                  name="pincode"
                  value={userData.primary_address_postalcode}
                  onChange={handleChange}
                  error={!!errors.primary_address_postalcode}
                  helperText={errors.primary_address_postalcode}
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
                <Typography
                  variant="h6"
                  align="left"
                  style={{ color: '#cb8b59', fontSize: '16px' }}
                >
                  Permanant Address
                </Typography>
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select name="country" value={userData.country} onChange={handleChange}>
                    <MenuItem value="">Select a country</MenuItem>
                    <MenuItem value="US">United States</MenuItem>
                    <MenuItem value="UK">United Kingdom</MenuItem>
                    <MenuItem value="CA">Canada</MenuItem>
                    <MenuItem value="AU">Australia</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={userData.alt_address_state}
                    onChange={handleChange}
                    disabled
                  >
                    <MenuItem value="">Select a state</MenuItem>
                    <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                    <MenuItem value="Gujrat">Gujrat</MenuItem>
                    <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                    <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select name="city" value={userData.alt_address_city} onChange={handleChange}>
                    <MenuItem value="">Select a city</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                    <MenuItem value="Nashik">Nashik</MenuItem>
                    <MenuItem value="Nagpur">Nagpur</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={userData.alt_address_street}
                  onChange={handleChange}
                  error={!!errors.alt_address_street}
                  helperText={errors.alt_address_street}
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
                  label="Pincode"
                  name="pincode"
                  value={userData.alt_address_postalcode}
                  onChange={handleChange}
                  error={!!errors.alt_address_postalcode}
                  helperText={errors.alt_address_postalcode}
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
                <Typography
                  variant="h6"
                  align="left"
                  style={{ color: '#cb8b59', fontSize: '16px' }}
                >
                  Emergency Address/Contact
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={userData.emergency_contact_address}
                  onChange={handleChange}
                  error={!!errors.emergency_contact_address}
                  helperText={errors.emergency_contact_address}
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
                  label="Name"
                  name="name"
                  value={userData.emergency_contact_name}
                  onChange={handleChange}
                  error={!!errors.emergency_contact_name}
                  helperText={errors.emergency_contact_name}
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
                  label="Contact"
                  name="contact"
                  value={userData.emergency_contact_no}
                  onChange={handleChange}
                  error={!!errors.emergency_contact_no}
                  helperText={errors.emergency_contact_no}
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
                  label="Relationship"
                  name="relationship"
                  value={userData.emergency_contact_relatio}
                  onChange={handleChange}
                  error={!!errors.emergency_contact_relatio}
                  helperText={errors.emergency_contact_relatio}
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

export default AddressTab;
