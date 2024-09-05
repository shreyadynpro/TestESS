import {
  Badge,
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Typography,
  Tabs,
  Tab,
  IconButton,
  MenuItem,
  Select,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  InputLabel,
  FormControlLabel,
  Radio,
  Paper,
  Button,
  useTheme,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { FaUser, FaEnvelope, FaPhoneAlt, FaCalendar, FaBuilding, FaKey } from 'react-icons/fa';

import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import commonConfig from '../commonConfig';
import { getAccessToken } from 'app/utils/utils';
import PersonalTab from './PersonalTab';
import AddressTab from './AddressTab';
import AccountTab from './AccountTab';
import EmploymentTab from './EmploymentTab';

const StyledButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(1),
  color: active ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  fontWeight: 'bold',
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? '#cb8b59' // Dark theme active tab background color
      : '#cb8b59' // Light theme active tab background color
    : '#22cfe2', // Inactive tab background color
  borderRadius: '8px',
  transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  marginTop: 0,
}));

const StyledBadge = styled(Badge)(({ theme, width, height }) => ({
  '& .MuiBadge-badge': {
    width: width,
    height: height,
    borderRadius: '50%',
    backgroundColor: 'dodgerblue',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
  '& .MuiBadge-colorSuccess.MuiBadge-badge': {
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
  },
}));

const AvatarBadge = ({ children, width, height, ...props }) => {
  return (
    <StyledBadge
      width={width || 25}
      height={height || 25}
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      {...props}
    >
      {children}
    </StyledBadge>
  );
};

const FlexBox = styled(Box)({ display: 'flex' });

const ContentWrapper = styled(Box)(({ theme }) => ({
  zIndex: 1,
  marginTop: 155,
  position: 'relative',
  [theme.breakpoints.down('sm')]: { paddingLeft: 20, paddingRight: 20 },
}));

const CoverPicWrapper = styled(Box)(() => ({
  top: 0,
  left: 0,
  height: 250,
  width: '100%',
  overflow: 'hidden',
  position: 'absolute',
  backgroundColor: '#00246b',
}));

const CoverText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '2rem',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
  zIndex: 2,
  textAlign: 'center',
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: 160,
  height: 160,
  margin: 'auto',
  overflow: 'hidden',
  borderRadius: '50%',
  border: '3px solid',
  borderColor: '#22cfe2',
  backgroundColor: theme.palette.primary[200],
}));

// Styled Tabs component
const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginTop: theme.spacing(4),
  '& .MuiTabs-flexContainer': {
    display: 'flex',
    justifyContent: 'space-between',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: '4px',
    borderRadius: '4px',
  },
}));

// Styled Tab component
const StyledTab = styled((props) => <Tab {...props} />)(({ theme, active }) => ({
  flex: 1, // Make each tab take up equal space
  color: active ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  fontWeight: 'bold',
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? '#cb8b59' // Dark theme active tab background color
      : '#cb8b59' // Light theme active tab background color
    : '#22cfe2', // Inactive tab background color
  borderRadius: '8px',
  transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  margin: '0 4px',
}));

const StyledDiv = styled('div')({
  position: 'relative',
  '& h3': {
    position: 'relative',
    textTransform: 'capitalize',
    '&::before': {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '60px',
      height: '2px',
      content: '""',
      backgroundColor: '#c50000',
    },
  },
});

// Styled TabPanel component
const TabPanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  boxShadow: `0 0 10px ${theme.palette.grey[300]}`,
  borderRadius: '8px',
}));

const UserProfile = () => {
  const [userdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    personal: {},
    address: {},
    account: {},
    employment: {},
  });
  const authToken = getAccessToken();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getUserProfile, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response && response['data'] && response['data']['Response'])
        setData(response['data']['Response'][0]);
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!!');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const [maritalStatus, setMaritalStatus] = useState(''); // Default value

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  const handleFieldChange = (tab, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [tab]: {
        ...prevData[tab],
        [field]: value,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Optionally, you can add validation logic here and update errors state
  };

  const handleSubmit = () => {
    // Handle the submit action (e.g., sending the data to an API)
    console.log('Form Data Submitted:', formData);
    setOpenDialog(false);
  };

  return (
    <Fragment>
      <Card sx={{ padding: 3, position: 'relative' }}>
        <CoverPicWrapper>
          <img
            width="100%"
            height="100%"
            alt="Team Member"
            src="/assets/images/244.jpg"
            style={{ objectFit: 'cover' }}
          />
          <CoverText>
            <StyledDiv className="two alt-two">
              <h3>Hi, {userdata.first_name}</h3>
            </StyledDiv>
          </CoverText>
        </CoverPicWrapper>

        <ContentWrapper>
          <FlexBox justifyContent="center">
            <AvatarBadge>
              <ImageWrapper>
                <img
                  src={userdata?.profile_pic || '/assets/images/avatars/001-man.svg'}
                  alt="Team Member"
                />
              </ImageWrapper>
            </AvatarBadge>
          </FlexBox>
          <Box textAlign="right">
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
              startIcon={<Edit />}
            >
              Update Profile
            </StyledButton>
          </Box>

          <StyledTabs value={activeTab} onChange={handleTabChange} aria-label="user profile tabs">
            <StyledTab label="Personal" value="personal" active={activeTab === 'personal'} />
            <StyledTab label="Address" value="Address" active={activeTab === 'Address'} />
            <StyledTab label="Account" value="Account" active={activeTab === 'Account'} />
            <StyledTab
              label="Employment & Job"
              value="employment"
              active={activeTab === 'employment'}
            />
            <StyledTab label="Documents" value="Documents" active={activeTab === 'Documents'} />
          </StyledTabs>

          <Box sx={{ padding: 2 }}>
            {activeTab === 'personal' && (
              <TabPanel>
                <PersonalTab theme userData={userdata} />
              </TabPanel>
            )}
            {activeTab === 'Address' && (
              <TabPanel>
                <AddressTab theme userData={userdata} />
              </TabPanel>
            )}
            {activeTab === 'Account' && (
              <TabPanel>
                <AccountTab theme userData={userdata} />
              </TabPanel>
            )}
            {activeTab === 'employment' && (
              <TabPanel>
                <EmploymentTab theme userData={userdata} />
              </TabPanel>
            )}
          </Box>

          {/* Dialog box */}
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            maxWidth="lg" // Adjust this as needed
            fullWidth
            sx={{
              '& .MuiDialog-paper': {
                width: '80vw',
                height: '80vh',
              },
            }}
          >
            <DialogTitle>Update Profile</DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{
                  backgroundColor: '#e8f5e9', // Light green background for the note
                  border: '1px solid #4caf50', // Green border
                  borderRadius: 1,
                  padding: 2,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#388e3c', // Darker green text color
                  textAlign: 'left',
                  marginBottom: 2,
                }}
              >
                **THE PROFILE WILL BE UPDATED ONLY AFTER HR's APPROVAL**
              </DialogContentText>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    align="left"
                    style={{ color: '#00246b', fontSize: '16px' }}
                  >
                    Personal Information
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={userdata.first_name}
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
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="mid_name"
                    value={userdata.mid_name}
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
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={userdata.last_name}
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={userdata.email1}
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={userdata.phone_mobile}
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={userdata.date_of_birth}
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
                        value={userdata.sex}
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
                              color: userdata.sex === 'Male' ? '#cb8b59' : '#00246b',
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
                              color: userdata.sex === 'Female' ? '#cb8b59' : '#00246b',
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
                      value={userdata.marital_status}
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
                            color: userdata.marital_status === 'Married' ? '#cb8b59' : '#00246b',
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
                            color: userdata.marital_status === 'Single' ? '#cb8b59' : '#00246b',
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    align="left"
                    style={{ color: '#00246b', fontSize: '16px' }}
                  >
                    Present Address
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      name="country"
                      value={userdata.primary_address_country}
                      onChange={handleChange}
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
                      value={userdata.primary_address_state}
                      onChange={handleChange}
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
                      value={userdata.primary_address_city}
                      onChange={handleChange}
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
                    value={userdata.primary_address_street}
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
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={userdata.primary_address_postalcode}
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
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    align="left"
                    style={{ color: '#00246b', fontSize: '16px' }}
                  >
                    Permanent Address
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                      name="state"
                      value={userdata.permanent_address_state}
                      onChange={handleChange}
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
                      value={userdata.permanent_address_city}
                      onChange={handleChange}
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
                    value={userdata.permanent_address_street}
                    onChange={handleChange}
                    error={!!errors.permanent_address_street}
                    helperText={errors.permanent_address_street}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={userdata.permanent_address_postalcode}
                    onChange={handleChange}
                    error={!!errors.permanent_address_postalcode}
                    helperText={errors.permanent_address_postalcode}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    align="left"
                    style={{ color: '#00246b', fontSize: '16px' }}
                  >
                    Emergency Contact
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Emergency Address"
                    name="emergency_address"
                    value={userdata.emergency_address}
                    onChange={handleChange}
                    error={!!errors.emergency_address}
                    helperText={errors.emergency_address}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact Name"
                    name="emergency_contact_name"
                    value={userdata.emergency_contact_name}
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact Number"
                    name="emergency_contact_number"
                    value={userdata.emergency_contact_number}
                    onChange={handleChange}
                    error={!!errors.emergency_contact_number}
                    helperText={errors.emergency_contact_number}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaPhoneAlt />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Relationship"
                    name="emergency_contact_relationship"
                    value={userdata.emergency_contact_relationship}
                    onChange={handleChange}
                    error={!!errors.emergency_contact_relationship}
                    helperText={errors.emergency_contact_relationship}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    align="left"
                    style={{ color: '#00246b', fontSize: '16px' }}
                  >
                    Bank Account Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Bank Name"
                    name="bank_name"
                    value={userdata.bank_name}
                    onChange={handleChange}
                    error={!!errors.bank_name}
                    helperText={errors.bank_name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaBuilding />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Account Holder's Name"
                    name="account_holder_name"
                    value={userdata.account_holder_name}
                    onChange={handleChange}
                    error={!!errors.account_holder_name}
                    helperText={errors.account_holder_name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    name="account_number"
                    value={userdata.account_number}
                    onChange={handleChange}
                    error={!!errors.account_number}
                    helperText={errors.account_number}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaKey />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Branch Name"
                    name="branch_name"
                    value={userdata.branch_name}
                    onChange={handleChange}
                    error={!!errors.branch_name}
                    helperText={errors.branch_name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaBuilding />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="IFSC Code"
                    name="ifsc_code"
                    value={userdata.ifsc_code}
                    onChange={handleChange}
                    error={!!errors.ifsc_code}
                    helperText={errors.ifsc_code}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaKey />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="secondary">
                Cancel
              </Button>
              <StyledButton onClick={handleSubmit} variant="contained" color="primary">
                Send
              </StyledButton>
            </DialogActions>
          </Dialog>
        </ContentWrapper>
      </Card>
    </Fragment>
  );
};

export default UserProfile;
