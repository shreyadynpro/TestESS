import * as React from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  StepLabel,
  Step,
  Stepper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/system';

const steps = ['Personal Info', 'Work Location', 'Project Info'];

// Custom TextField with consistent styles
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey', // Default border color
    },
    '&:hover fieldset': {
      borderColor: 'dodgerblue', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'dodgerblue', // Border color when focused
    },
    '& input': {
      color: 'black', // Text color when inputting text
    },
    '& input::placeholder': {
      color: 'lightgrey', // Placeholder text color
    },
  },
  '& .MuiInputLabel-root': {
    color: 'grey', // Default label color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'dodgerblue', // Label color when focused
  },
}));
const CustomFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: 'grey', // Default label color
    '&.Mui-focused': {
      color: 'dodgerblue', // Label color when focused
    },
  },
  '& .MuiSelect-root': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'grey', // Default border color
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'dodgerblue !important', // Border color on hover
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'dodgerblue !important', // Border color when focused
    },
  },
}));

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  // State for form data
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    officeLocation: '',
    department: '',
    projectName: '',
    role: '',
    pan: '',
    email: '',
    city: '',
    address: '',
    pin: '',
    wcity: '',
    establishment: '',
    notInAddressList1: false,
    notInAddressList2: false,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    // Reset form data
    setFormData({
      firstName: '',
      lastName: '',
      officeLocation: '',
      department: '',
      projectName: '',
      role: '',
      pan: '',
      email: '',
      city: '',
      address: '',
      pin: '',
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };
  const renderStepContent = (step) => {
    return (
      <Box component="form" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {step === 0 && (
            <>
              <Grid item xs={4}>
                <CustomTextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  margin="normal"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="PAN Number"
                  name="pan"
                  fullWidth
                  margin="normal"
                  value={formData.pan}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Personal Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Box display="flex" flexDirection="row" ml={2} mt={2} mb={0} gap={2}>
                <Typography
                  variant="h6"
                  align="left"
                  style={{ color: '#cb8b59', fontSize: '16px' }}
                >
                  Permanent Address
                </Typography>
              </Box>
              <Grid item xs={12}>
                <CustomTextField
                  label="Address"
                  name="address"
                  fullWidth
                  margin="normal"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={4} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    label="City" // Add label prop for proper accessibility
                  >
                    <MenuItem value="">Select a city</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                    <MenuItem value="Nashik">Nashik</MenuItem>
                    <MenuItem value="Nagpur">Nagpur</MenuItem>
                  </Select>
                </CustomFormControl>
              </Grid>
              <Grid item xs={4} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    label="State" // Add label prop for proper accessibility
                  >
                    <MenuItem value="">Select a state</MenuItem>
                    <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                    <MenuItem value="Gujrat">Gujrat</MenuItem>
                    <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                    <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                  </Select>
                </CustomFormControl>
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Pincode"
                  name="pin"
                  fullWidth
                  margin="normal"
                  value={formData.pin}
                  onChange={handleInputChange}
                />
              </Grid>
              <Box display="flex" flexDirection="row" ml={2} mt={2} mb={0} gap={2}>
                <Typography
                  variant="h6"
                  align="left"
                  style={{ color: '#cb8b59', fontSize: '16px' }}
                >
                  Present Address
                </Typography>
              </Box>
              <Grid item xs={12}>
                <CustomTextField
                  label="Address"
                  name="address"
                  fullWidth
                  margin="normal"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={4} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    label="City" // Add label prop for proper accessibility
                  >
                    <MenuItem value="">Select a city</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                    <MenuItem value="Nashik">Nashik</MenuItem>
                    <MenuItem value="Nagpur">Nagpur</MenuItem>
                  </Select>
                </CustomFormControl>
              </Grid>
              <Grid item xs={4} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    label="State" // Add label prop for proper accessibility
                  >
                    <MenuItem value="">Select a state</MenuItem>
                    <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                    <MenuItem value="Gujrat">Gujrat</MenuItem>
                    <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                    <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                  </Select>
                </CustomFormControl>
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Pincode"
                  name="pin"
                  fullWidth
                  margin="normal"
                  value={formData.pin}
                  onChange={handleInputChange}
                />
              </Grid>
            </>
          )}
          {step === 1 && (
            <>
              <Grid item xs={6}>
                <CustomTextField
                  label="Name & Address of End Client"
                  name="end_client"
                  fullWidth
                  margin="normal"
                  value={formData.end_client}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  label="Floor No"
                  name="floor"
                  fullWidth
                  margin="normal"
                  value={formData.floor}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  label="Block Name/Building Name"
                  name="block"
                  fullWidth
                  margin="normal"
                  value={formData.block}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    label="City" // Add label prop for proper accessibility
                  >
                    <MenuItem value="">Select a city</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                    <MenuItem value="Pune">Pune</MenuItem>
                    <MenuItem value="Nashik">Nashik</MenuItem>
                    <MenuItem value="Nagpur">Nagpur</MenuItem>
                  </Select>
                </CustomFormControl>
              </Grid>
              <Grid item xs={6} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>Tech Park</InputLabel>
                  {!formData.notInAddressList1 ? (
                    <Select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      label="City"
                    >
                      <MenuItem value="">Select a city</MenuItem>
                      <MenuItem value="Mumbai">Mumbai</MenuItem>
                      <MenuItem value="Pune">Pune</MenuItem>
                      <MenuItem value="Nashik">Nashik</MenuItem>
                      <MenuItem value="Nagpur">Nagpur</MenuItem>
                    </Select>
                  ) : (
                    <TextField
                      fullWidth
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      label="Tech Park"
                    />
                  )}
                </CustomFormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.notInAddressList1}
                      onChange={handleCheckboxChange}
                      name="notInAddressList1"
                      sx={{
                        color: formData.notInAddressList1 ? '#22cfe2' : 'primary',
                        '&.Mui-checked': {
                          color: formData.notInAddressList1 ? '#22cfe2' : 'primary',
                        },
                      }}
                    />
                  }
                  label="Not in the Address List"
                />
              </Grid>
              <Grid item xs={6} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>Name & Address of Establishment</InputLabel>
                  {!formData.notInAddressList2 ? (
                    <Select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      label="City" // Add label prop for proper accessibility
                    >
                      <MenuItem value="">Select a city</MenuItem>
                      <MenuItem value="Mumbai">Mumbai</MenuItem>
                      <MenuItem value="Pune">Pune</MenuItem>
                      <MenuItem value="Nashik">Nashik</MenuItem>
                      <MenuItem value="Nagpur">Nagpur</MenuItem>
                    </Select>
                  ) : (
                    <TextField
                      fullWidth
                      name="establishment"
                      value={formData.establishment}
                      onChange={handleInputChange}
                      label="Name & Address of Establishment"
                    />
                  )}
                </CustomFormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.notInAddressList2}
                      onChange={handleCheckboxChange}
                      name="notInAddressList2"
                      sx={{
                        color: formData.notInAddressList2 ? '#22cfe2' : 'primary',
                        '&.Mui-checked': {
                          color: formData.notInAddressList2 ? '#22cfe2' : 'primary',
                        },
                      }}
                    />
                  }
                  label="Not in the Address List"
                />
              </Grid>
            </>
          )}
          {step === 2 && (
            <>
              <Grid item xs={4}>
                <CustomTextField
                  label="AV Series No./Client Employee id"
                  name="end_client"
                  fullWidth
                  margin="normal"
                  value={formData.end_client}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Mobile"
                  name="floor"
                  fullWidth
                  margin="normal"
                  value={formData.floor}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Official Email Id"
                  name="block"
                  fullWidth
                  margin="normal"
                  value={formData.block}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Project Name/Account Client Name"
                  name="block"
                  fullWidth
                  margin="normal"
                  value={formData.block}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Project Manager Name"
                  name="block"
                  fullWidth
                  margin="normal"
                  value={formData.block}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Project Manager Email"
                  name="block"
                  fullWidth
                  margin="normal"
                  value={formData.block}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Project Manager Mobile No"
                  name="block"
                  fullWidth
                  margin="normal"
                  value={formData.block}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>Shift Timings (if any)</InputLabel>
                  <Select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    label="City" // Add label prop for proper accessibility
                  >
                    <MenuItem value="Regular">Regular</MenuItem>
                    <MenuItem value="1st Shift">1st Shift</MenuItem>
                    <MenuItem value="2nd Shift">2nd Shift</MenuItem>
                    <MenuItem value="3rd Shift">3rd Shift</MenuItem>
                  </Select>
                </CustomFormControl>
              </Grid>
              <Grid item xs={4} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>Specify whether Rotational </InputLabel>
                  <Select
                    name="Specify whether Rotational"
                    value={formData.city}
                    onChange={handleInputChange}
                    label="Specify whether Rotational" // Add label prop for proper accessibility
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </CustomFormControl>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ padding: 4, position: 'relative' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  color: activeStep === index ? '#00246b' : 'inherit',
                },
                '& .MuiStepLabel-iconContainer': {
                  '& .MuiSvgIcon-root': {
                    color: activeStep === index ? '#00246b' : 'inherit',
                  },
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, color: '#00246b' }}>
            All steps completed - you're finished.
          </Typography>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Review your data: <pre>{JSON.stringify(formData, null, 2)}</pre>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Render form based on the current step */}
          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                backgroundColor: activeStep === 0 ? 'transparent' : '#00246b',
                color: activeStep === 0 ? 'inherit' : '#fff',
              }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                backgroundColor: '#00246b',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'dodgerblue',
                },
              }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
