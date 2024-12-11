import React, { useState } from 'react';
import {
  ThemeProvider,
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Box,
  Button,
} from '@mui/material';
import { useReducer } from 'react';
import axios from 'axios';
import commonConfig from '../commonConfig';
import { getAccessToken } from 'app/utils/utils';
import { useNavigate } from 'react-router-dom';
import ReferralDialog from './ReferralDialog'; // Import the ReferralDialog component
import SnackbarUtils from 'SnackbarUtils';
import commonRoutes from 'app/components/commonRoutes';

const GradientBackground = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  color: 'blue',
}));
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.info.main,
  marginTop: 0,
}));
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));
// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: action.bool };
    default:
      return state;
  }
};

const ReferralTab = ({ theme, ReferralData }) => {
  // State to manage dialog open/close
  const [referralOpen, setReferralOpen] = useState(false);
  const [referralData, setReferralData] = useState({
    full_name: '',
    email: '',
    contact_no: '',
    skills: '',
    experience: '',
    pan: '',
    current_location: '',
  });
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    open: false,
    responseError: '',
    hasError: false,
  });
  const navigate = useNavigate();
  const handleOpenReferralDialog = () => {
    setReferralOpen(true); // Open dialog
  };

  const handleCloseReferralDialog = () => {
    setReferralOpen(false); // Close dialog
  };

  const handleReferralChange = (e) => {
    const { name, value } = e.target;
    setReferralData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitReferral = async (e) => {
    e.preventDefault();
    // Add your API call here to submit the referralData
    // After submitting, close the dialog
    const authToken = getAccessToken();
    try {
      dispatch({ type: 'LOADING', bool: true });
      const response = await axios.post(commonConfig.urls.getReferralProfile, referralData, {
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
        SnackbarUtils.success('Profile Updated Successfully');
        navigate(commonRoutes.home);
      }
    } catch (error) {
      dispatch({ type: 'LOADING', bool: false });
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <GradientBackground>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  marginBottom: '16px',
                  color: '#cb8b59',
                }}
              >
                Referral List
              </span>
            </Grid>
          </Grid>

          {/* Button to open Add Referral Dialog */}
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <StyledButton variant="contained" color="primary" onClick={handleOpenReferralDialog}>
              Add Referral
            </StyledButton>
          </Box>

          {/* Table to display Referral Data */}
          <TableContainer
            component={Paper}
            sx={{ marginTop: 2, width: '100%' }}
            style={{ padding: '10px', textAlign: 'left' }}
          >
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact No</TableCell>
                  <TableCell>Skill</TableCell>
                  <TableCell>Exp (Years)</TableCell>
                  <TableCell>PAN</TableCell>
                  <TableCell>Current Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ReferralData && ReferralData.length > 0 ? (
                  ReferralData.map((referral, index) => (
                    <TableRow key={index}>
                      <TableCell>{referral.fullName || referral.full_name}</TableCell>
                      <TableCell>{referral.email}</TableCell>
                      <TableCell>{referral.contactNo || referral.contact_no}</TableCell>
                      <TableCell>{referral.skills}</TableCell>
                      <TableCell>{referral.experience}</TableCell>
                      <TableCell>{referral.pan}</TableCell>
                      <TableCell>{referral.currentLocation || referral.current_location}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No referrals found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </StyledTable>
          </TableContainer>

          {/* Referral Dialog */}
          <ReferralDialog
            open={referralOpen}
            onClose={handleCloseReferralDialog}
            referralData={referralData}
            onChange={handleReferralChange}
            onSubmit={handleSubmitReferral}
          />
        </GradientBackground>
      </Container>
    </ThemeProvider>
  );
};

export default ReferralTab;
