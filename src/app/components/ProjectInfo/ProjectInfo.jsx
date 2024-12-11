import React, { Fragment, useEffect, useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
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
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import commonConfig from '../commonConfig';
import { getAccessToken } from 'app/utils/utils';
import SnackbarUtils from 'SnackbarUtils';
import commonRoutes from 'app/components/commonRoutes';

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
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: action.bool };
    default:
      return state;
  }
};
export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const user = useSelector((state) => state.userDetails?.user);
  const [statesdata, setStates] = useState([]);
  const [techparks, setTechPark] = useState([]);
  const [estAddress, setEstAddress] = useState([]);
  const [workLocation, setWorkLocation] = useState([]);
  const [userData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authToken = getAccessToken();
  const [formData, setFormData] = React.useState({
    emp_name: user?.first_name + ' ' + user?.last_name,
    pan: user?.identity_no,
    email: user?.email,
    avserires_no: '',
    name_of_city: '',
    work_location: '',
    name_of_building: '',
    floor_no: '',
    mobile_no: '',
    official_email: '',
    present_address: '',
    present_city: '',
    present_state: '',
    present_zip: '',
    permanent_address: '',
    permanant_city: '',
    permanant_state: '',
    permanant_zip: '',
    project_name: '',
    pm_name: '',
    pm_email: '',
    pm_mobile: '',
    shift_timing: '',
    rotational_timing: '',
    end_client_name: '',
    establishment_address: '',
    end_client_address: '',
    notInAddressList1: false,
    notInAddressList2: false,
  });
  const [errors, setErrors] = React.useState({
    name_of_city: false,
    other_tech_park: false,
    establishment_address: false,
    other_address: false,
  });
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    open: false,
    responseError: '',
    hasError: false,
  });

  React.useEffect(() => {
    validateFields();
  }, []);

  const validateFields = () => {
    const newErrors = {};

    // Validation for Work Location (Step 1)
    if (formData.notInAddressList1) {
      // If "Not in Address List" is checked, validate the text field
      if (!formData.other_tech_park) {
        newErrors.other_tech_park = true; // Mark error for text field
      }
    } else {
      // If "Not in Address List" is unchecked, validate the dropdown
      if (!formData.name_of_city) {
        newErrors.name_of_city = true; // Mark error for dropdown
      }
    }

    // Validation for Establishment Address (Step 2)
    if (formData.notInAddressList2) {
      // If "Not in Address List" is checked, validate the text field
      if (!formData.other_address) {
        newErrors.other_address = true; // Mark error for text field
      }
    } else {
      // If "Not in Address List" is unchecked, validate the dropdown
      if (!formData.establishment_address) {
        newErrors.establishment_address = true; // Mark error for dropdown
      }
    }

    setErrors(newErrors); // Update error state

    return newErrors;
  };

  const handleNext = () => {
    const newErrors = {};

    const requiredForCurrentStep = requiredFields[activeStep];

    const isValid = requiredForCurrentStep.every((field) => {
      // Skip validation for 'work_location' if the checkbox 'notInAddressList1' is checked
      if (field === 'name_of_city' && formData.notInAddressList1) {
        // Enforce validation for 'other_tech_park' when 'notInAddressList1' is checked
        if (!formData.other_tech_park) {
          newErrors.other_tech_park = true;
          return false;
        }
        return true; // Skip validation, but require 'other_tech_park'
      }

      // Skip validation for 'establishment_address' if 'notInAddressList2' is checked
      if (field === 'establishment_address' && formData.notInAddressList2) {
        // Enforce validation for 'other_address' when 'notInAddressList2' is checked
        if (!formData.other_address) {
          newErrors.other_address = true;
          return false;
        }
        return true; // Skip validation, but require 'other_address'
      }

      if (!formData[field]) {
        newErrors[field] = true; // Mark the field as error if empty
        return false;
      }
      return true;
    });

    setErrors(newErrors);

    if (!isValid) {
      return; // Don't proceed if there are validation errors
    }

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
  const fetchData = async () => {
    if (!user?.dynmis_empid) return; // Prevent API call if dynmis_empid is empty

    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getUserProfile, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response?.data?.Response) setData(response.data.Response[0]);
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!!');
    }
  };
  const fetchState = async () => {
    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getstates, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response?.data?.Response) {
        setStates(response.data.Response); // Set the fetched states into local state
      }
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!!');
    }
  };
  const fetchTechPark = async () => {
    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.gettechpark, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response?.data?.Response) {
        setTechPark(response.data.Response); // Set the fetched states into local state
      }
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!!');
    }
  };
  const fetchEstAddress = async () => {
    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getestablishmentaddress, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response?.data?.Response) {
        setEstAddress(response.data.Response); // Set the fetched states into local state
      }
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!!');
    }
  };
  const fetchWorkLocation = async () => {
    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getworklocation, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response?.data?.Response) {
        setWorkLocation(response.data.Response); // Set the fetched states into local state
      }
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!!');
    }
  };
  const fetchProjectInfo = async () => {
    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getprojinfo, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response?.data?.Response) {
        const fetchtechpark = response.data.Response[0].client_location || '';
        const estadd = response.data.Response[0].establishment_address || '';
        setFormData((prevFormData) => ({
          ...prevFormData,

          pan: user?.identity_no || '',
          email: user?.email || '',
          avserires_no: response.data.Response[0].client_emp_id || '',
          name_of_city: response.data.Response[0].client_location || '',
          work_location: response.data.Response[0].work_location || '',
          name_of_building: response.data.Response[0].name_of_building || '',
          floor_no: response.data.Response[0].floor_no || '',
          mobile_no: response.data.Response[0].phone_mobile || '',
          official_email: response.data.Response[0].candidate_email_id || '',
          present_address: response.data.Response[0].alt_address_street || '',
          present_city: response.data.Response[0].alt_address_city || '',
          present_state: response.data.Response[0].alt_address_state || '',
          present_zip: response.data.Response[0].alt_address_postalcode || '',
          permanent_address: response.data.Response[0].primary_address_street || '',
          permanant_city: response.data.Response[0].primary_address_city || '',
          permanant_state: response.data.Response[0].primary_address_state || '',
          permanant_zip: response.data.Response[0].primary_address_postalcode || '',
          project_name: response.data.Response[0].project || '',
          pm_name: response.data.Response[0].project_manager || '',
          pm_email: response.data.Response[0].project_manager_email || '',
          pm_mobile: response.data.Response[0].project_manager_mobile || '',
          shift_timing: response.data.Response[0].shift_timing || '',
          rotational_timing: response.data.Response[0].rotational_shift || '',
          end_client_name: response.data.Response[0].end_client_name || '',
          establishment_address: response.data.Response[0].establishment_address || '',
          end_client_address: response.data.Response[0].end_client_address || '',
        }));
        if (
          fetchtechpark &&
          !techparks.some((techpark) => techpark.fetchtechpark === fetchtechpark)
        ) {
          const newTechPark = {
            id: techparks.length + 101, // Generate a unique id (or get from backend if available)
            city: response.data.Response[0].work_location,
            techpark_name: fetchtechpark, // Set the techpark_name as per your logic
          };

          setTechPark((prevTechParks) => [...prevTechParks, newTechPark]);
        }

        if (estadd && !estAddress.some((estAddress) => estAddress.estadd === estadd)) {
          const newestAddress = {
            id: techparks.length + 101, // Generate a unique id (or get from backend if available)
            city: response.data.Response[0].work_location,
            establishment_address: response.data.Response[0].establishment_address, // Set the techpark_name as per your logic
          };

          setEstAddress((prevEstAddr) => [...prevEstAddr, newestAddress]);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!!');
    }
  };
  useEffect(() => {
    fetchData();
    fetchState(); // Fetch states on component mount
    fetchTechPark();
    fetchEstAddress();
    fetchWorkLocation();
    fetchProjectInfo();
  }, []); // Empty dependency array ensures it runs only once

  // useEffect(() => {
  //   if (userData) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       emp_name: `${user?.first_name || ''} ${user?.last_name || ''}`,
  //       pan: user?.identity_no || '',
  //       email: user?.email || '',
  //       present_address: userData?.primary_address_street || '',
  //       present_city: userData?.primary_address_city || '',
  //       present_state: userData?.primary_address_state || '',
  //       present_zip: userData?.primary_address_postalcode || '',
  //       permanent_address: userData?.alt_address_street || '',
  //       permanant_city: userData?.alt_address_city || '',
  //       permanant_state: userData?.alt_address_state || '',
  //       permanant_zip: userData?.alt_address_postalcode || '',
  //     }));
  //   }
  // }, [userData, user]);
  const requiredFields = [
    [
      'emp_name',
      'pan',
      'email',
      'permanent_address',
      'permanant_city',
      'permanant_state',
      'permanant_zip',
      'present_address',
      'present_city',
      'present_state',
      'present_zip',
    ], // Step 1 required fields
    ['name_of_city', 'work_location', 'establishment_address'], // Step 2 required fields
    ['avserires_no', 'official_email', 'pm_email', 'pm_mobile', 'rotational_timing'], // Step 3 required fields
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Clear the error when the user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
  };
  // handleCheckboxChange function
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setFormData({
      ...formData,
      [name]: checked, // Update formData with the new checkbox state
    });

    if (name === 'notInAddressList1') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name_of_city: checked ? false : prevErrors.name_of_city, // Clear or retain the error based on checkbox
        other_tech_park: !checked ? false : prevErrors.other_tech_park,
      }));
    } else if (name === 'notInAddressList2') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        establishment_address: checked ? false : prevErrors.establishment_address,
        other_address: !checked ? false : prevErrors.other_address,
      }));
    }
  };
  async function handleSubmit() {
    // Perform form data submission, like sending to an API or saving locally
    const authToken = getAccessToken();
    try {
      dispatch({ type: 'LOADING', bool: true });
      const response = await axios.post(commonConfig.urls.projinfo, formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      dispatch({ type: 'LOADING', bool: false });
      if (response && response.data.Status === 'Failed') {
        SnackbarUtils.error(
          Object.values(response.data.Errors)
            .map((item) => item.toString())
            .toString()
        );
      }
      if (response && response.data.Status === 'Success') {
        SnackbarUtils.success('Profile Information Submitted Successfully');
        navigate(commonRoutes.home);
      }
    } catch (error) {
      dispatch({ type: 'LOADING', bool: false });
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
    }
  }

  const renderStepContent = (step) => {
    return (
      <Box component="form" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {step === 0 && (
            <>
              <Grid item xs={4}>
                <CustomTextField
                  label="Name"
                  name="emp_name"
                  fullWidth
                  margin="normal"
                  value={formData.emp_name}
                  onChange={handleInputChange}
                  required
                  error={!!errors.emp_name && activeStep === 0}
                  helperText={!!errors.emp_name && activeStep === 0 ? 'This field is required' : ''}
                  disabled
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
                  required
                  error={!!errors.pan && activeStep === 0}
                  helperText={!!errors.pan && activeStep === 0 ? 'This field is required' : ''}
                  disabled
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
                  required
                  error={!!errors.email && activeStep === 0}
                  helperText={!!errors.email && activeStep === 0 ? 'This field is required' : ''}
                  disabled
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
                  name="permanent_address"
                  fullWidth
                  margin="normal"
                  value={formData.permanent_address}
                  onChange={handleInputChange}
                  required
                  error={!!errors.permanent_address && activeStep === 0}
                  helperText={
                    !!errors.permanent_address && activeStep === 0 ? 'This field is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="City"
                  name="permanant_city"
                  fullWidth
                  margin="normal"
                  value={formData.permanant_city}
                  onChange={handleInputChange}
                  required
                  error={!!errors.permanant_city && activeStep === 0}
                  helperText={
                    !!errors.permanant_city && activeStep === 0 ? 'This field is required' : ''
                  }
                />
              </Grid>

              <Grid item xs={4} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>State*</InputLabel>
                  <Select
                    name="permanant_state"
                    value={formData.permanant_state}
                    onChange={handleInputChange}
                    label="State*" // Add label prop for proper accessibility
                    required
                    error={!!errors.permanant_state}
                  >
                    <MenuItem value="">Select a state</MenuItem>
                    {statesdata.map((state) => (
                      <MenuItem key={state.states} value={state.states}>
                        {state.states}
                      </MenuItem>
                    ))}
                  </Select>
                </CustomFormControl>
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Pincode"
                  name="permanant_zip"
                  fullWidth
                  margin="normal"
                  value={formData.permanant_zip}
                  onChange={handleInputChange}
                  required
                  error={!!errors.permanant_zip && activeStep === 0}
                  helperText={
                    !!errors.permanant_zip && activeStep === 0 ? 'This field is required' : ''
                  }
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
                  name="present_address"
                  fullWidth
                  margin="normal"
                  value={formData.present_address}
                  onChange={handleInputChange}
                  required
                  error={!!errors.present_address && activeStep === 0}
                  helperText={
                    !!errors.present_address && activeStep === 0 ? 'This field is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="City"
                  name="present_city"
                  fullWidth
                  margin="normal"
                  value={formData.present_city}
                  onChange={handleInputChange}
                  required
                  error={!!errors.present_city && activeStep === 0}
                  helperText={
                    !!errors.present_city && activeStep === 0 ? 'This field is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={4} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>State*</InputLabel>
                  <Select
                    name="present_state"
                    value={formData.present_state}
                    onChange={handleInputChange}
                    label="State*" // Add label prop for proper accessibility
                    required
                    error={!!errors.present_state}
                  >
                    <MenuItem value="">Select a state</MenuItem>
                    {statesdata.map((state) => (
                      <MenuItem key={state.states} value={state.states}>
                        {state.states}
                      </MenuItem>
                    ))}
                  </Select>
                </CustomFormControl>
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Pincode"
                  name="present_zip"
                  fullWidth
                  margin="normal"
                  value={formData.present_zip}
                  onChange={handleInputChange}
                  required
                  error={!!errors.present_zip && activeStep === 0}
                  helperText={
                    !!errors.present_zip && activeStep === 0 ? 'This field is required' : ''
                  }
                />
              </Grid>
            </>
          )}
          {step === 1 && (
            <>
              <Grid item xs={6}>
                <CustomTextField
                  label="Name & Address of End Client"
                  name="end_client_name"
                  fullWidth
                  margin="normal"
                  value={formData.end_client_name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  label="Floor No"
                  name="floor_no"
                  fullWidth
                  margin="normal"
                  value={formData.floor_no}
                  onChange={handleInputChange}
                  type="number" // Added type attribute
                />
              </Grid>

              <Grid item xs={6}>
                <CustomTextField
                  label="Block Name/Building Name"
                  name="name_of_building"
                  fullWidth
                  margin="normal"
                  value={formData.name_of_building}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>Work Location*</InputLabel>
                  <Select
                    name="work_location"
                    value={formData.work_location}
                    onChange={handleInputChange}
                    label="City*" // Add label prop for proper accessibility
                    required
                    error={!!errors.work_location}
                  >
                    <MenuItem value="">Select a city</MenuItem>
                    {workLocation.map((locations) => (
                      <MenuItem key={locations.location} value={locations.location}>
                        {locations.location}
                      </MenuItem>
                    ))}
                  </Select>
                </CustomFormControl>
              </Grid>
              <Grid item xs={6} mt={2}>
                <CustomFormControl
                  fullWidth
                  error={
                    formData.notInAddressList1 ? !!errors.other_tech_park : !!errors.name_of_city
                  }
                >
                  {formData.notInAddressList1 ? (
                    <CustomTextField
                      name="other_tech_park"
                      value={formData.other_tech_park}
                      onChange={handleInputChange}
                      label="Tech Park"
                      required={formData.notInAddressList1}
                      error={!!errors.other_tech_park}
                      helperText={errors.other_tech_park ? 'This field is required' : ''}
                    />
                  ) : (
                    <React.Fragment>
                      <InputLabel>Tech Park*</InputLabel>
                      <Select
                        name="name_of_city"
                        value={formData.name_of_city}
                        onChange={handleInputChange}
                        label="Tech Park*"
                        required={!formData.notInAddressList1}
                        error={!!errors.name_of_city}
                      >
                        <MenuItem value="">Select a Tech Park</MenuItem>
                        {techparks.map((park) => (
                          <MenuItem key={park.techpark_name} value={park.techpark_name}>
                            {park.techpark_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </React.Fragment>
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
                <CustomFormControl
                  fullWidth
                  error={
                    formData.notInAddressList2
                      ? !!errors.other_address
                      : !!errors.establishment_address
                  }
                >
                  {!formData.notInAddressList2 ? (
                    <React.Fragment>
                      <InputLabel>Establishment Address*</InputLabel>
                      <Select
                        name="establishment_address"
                        value={formData.establishment_address}
                        onChange={handleInputChange}
                        label="Establishment Address*"
                        required={!formData.notInAddressList2}
                        error={!!errors.establishment_address}
                      >
                        <MenuItem value="">Select an establishment</MenuItem>
                        {estAddress.map((addr) => (
                          <MenuItem
                            key={addr.establishment_address}
                            value={addr.establishment_address}
                          >
                            {addr.establishment_address}
                          </MenuItem>
                        ))}
                      </Select>
                    </React.Fragment>
                  ) : (
                    <TextField
                      fullWidth
                      name="other_address"
                      value={formData.other_address}
                      onChange={handleInputChange}
                      label="Other Address"
                      required={formData.notInAddressList2}
                      error={!!errors.other_address}
                      helperText={errors.other_address ? 'This field is required' : ''}
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
                  name="avserires_no"
                  fullWidth
                  margin="normal"
                  value={formData.avserires_no}
                  onChange={handleInputChange}
                  required
                  error={!!errors.avserires_no && activeStep === 2}
                  helperText={
                    !!errors.avserires_no && activeStep === 2 ? 'This field is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Mobile"
                  name="mobile_no"
                  fullWidth
                  margin="normal"
                  value={formData.mobile_no}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Official Email Id"
                  name="official_email"
                  fullWidth
                  margin="normal"
                  value={formData.official_email}
                  onChange={handleInputChange}
                  required
                  error={!!errors.official_email && activeStep === 2}
                  helperText={
                    !!errors.official_email && activeStep === 2 ? 'This field is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Project Name/Account Client Name"
                  name="project_name"
                  fullWidth
                  margin="normal"
                  value={formData.project_name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Project Manager Name"
                  name="pm_name"
                  fullWidth
                  margin="normal"
                  value={formData.pm_name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Project Manager Email"
                  name="pm_email"
                  fullWidth
                  margin="normal"
                  value={formData.pm_email}
                  onChange={handleInputChange}
                  required
                  error={!!errors.pm_email && activeStep === 2}
                  helperText={!!errors.pm_email && activeStep === 2 ? 'This field is required' : ''}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextField
                  label="Project Manager Mobile No"
                  name="pm_mobile"
                  fullWidth
                  margin="normal"
                  value={formData.pm_mobile}
                  onChange={handleInputChange}
                  required
                  error={!!errors.pm_mobile && activeStep === 2}
                  helperText={
                    !!errors.pm_mobile && activeStep === 2 ? 'This field is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={4} mt={2}>
                <CustomFormControl fullWidth>
                  <InputLabel>Shift Timings (if any)</InputLabel>
                  <Select
                    name="shift_timing"
                    value={formData.shift_timing}
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
                  <InputLabel>Specify whether Rotational* </InputLabel>
                  <Select
                    name="rotational_timing"
                    value={formData.rotational_timing}
                    onChange={handleInputChange}
                    label="Specify whether Rotational" // Add label prop for proper accessibility
                    required
                    error={!!errors.rotational_timing}
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

      {activeStep === steps.length - 1 ? ( // Assuming step index starts from 0, adjust according to your logic
        <React.Fragment>
          {/* Render form fields for the last step */}
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
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#00246b',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'dodgerblue',
                },
              }}
            >
              Submit
            </Button>
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
              Next
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
