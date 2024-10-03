import { Badge, Box, Card, styled, Typography, Tabs, Tab, Paper, Button } from '@mui/material';
import { Edit } from '@mui/icons-material';

import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import commonConfig from '../commonConfig';
import { getAccessToken } from 'app/utils/utils';
import PersonalTab from './PersonalTab';
import AddressTab from './AddressTab';
import AccountTab from './AccountTab';
import EmploymentTab from './EmploymentTab';
import UpdateProfile from './UpdateProfile';
import DocumentCenter from './DocumentCenter';
import ReferralTab from './ReferralTab';
import ChangePassword from './ChangePassword';
import PersonalTabNormalUser from './PersonalTabNormalUser';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.info.main,
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
  marginTop: 125,
  position: 'relative',
  [theme.breakpoints.down('sm')]: { paddingLeft: 20, paddingRight: 20 },
}));

const CoverPicWrapper = styled(Box)(() => ({
  top: 0,
  left: 0,
  height: 200,
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
  width: 120,
  height: 120,
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
  color: '#00246b !important', // Keep the same font color for both active and inactive
  fontWeight: 'bold',
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? '#e3f2fd' // Dark theme active tab background color
      : '#e3f2fd' // Light theme active tab background color
    : '#ffebee', // Inactive tab background color
  borderRadius: '8px',
  transition: 'background-color 0.3s ease-in-out',
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
  const [referraldata, setReferralData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // use the useLocation hook
  const queryParams = new URLSearchParams(location.search); // Get search params from location
  const initialTab = queryParams.get('tab') || 'personal'; // Default to 'personal' if no query parameter is present
  const [activeTab, setActiveTab] = useState('personal');
  const authToken = getAccessToken();
  const [openDialog, setOpenDialog] = useState(false); // State for dialog
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const user = useSelector((state) => state.userDetails?.user);

  // Function to fetch user profile data
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
  const getReferral = async () => {
    if (!user?.dynmis_empid) return; // Prevent API call if dynmis_empid is empty

    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getReferralProfile, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response?.data?.Response) setReferralData(response.data.Response);
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!!');
    }
  };
  useEffect(() => {
    // Extract the 'tab' parameter from the URL
    const currentTab = queryParams.get('tab');
    if (currentTab && currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [location.search]); // Only rerun this effect when the search part of the URL changes

  // Function to handle tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    navigate(`/Profile?tab=${newValue}`); // Update the URL without reloading the page
  };

  useEffect(() => {
    if (user?.dynmis_empid) {
      fetchData();
      getReferral();
    }
  }, [user?.dynmis_empid]);

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
              <h3>Hi, {user?.first_name}</h3>
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

          <Box textAlign="right" display="flex" justifyContent="flex-end">
            {user?.dynmis_empid && (
              <StyledButton
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
                startIcon={<Edit />}
              >
                Update Profile
              </StyledButton>
            )}
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => setOpenPasswordDialog(true)}
              startIcon={<Edit />}
            >
              Change Password
            </StyledButton>
          </Box>

          {/* Conditionally render the tabs */}
          {!user?.dynmis_empid ? (
            <Box sx={{ padding: 2 }}>
              <TabPanel>
                <PersonalTabNormalUser theme />
              </TabPanel>
            </Box>
          ) : (
            <Fragment>
              <StyledTabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="user profile tabs"
              >
                <StyledTab label="Personal" value="personal" active={activeTab === 'personal'} />
                <StyledTab label="Address" value="Address" active={activeTab === 'Address'} />
                <StyledTab label="Account" value="Account" active={activeTab === 'Account'} />
                <StyledTab
                  label="Employment & Job"
                  value="employment"
                  active={activeTab === 'employment'}
                />
                {/* <StyledTab label="Documents" value="Documents" active={activeTab === 'Documents'} />
                <StyledTab label="Referral" value="Referral" active={activeTab === 'Referral'} /> */}
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
                {/* {activeTab === 'Documents' && (
                  <TabPanel>
                    <DocumentCenter theme userData={userdata} />
                  </TabPanel>
                )}
                {activeTab === 'Referral' && (
                  <TabPanel>
                    <ReferralTab theme ReferralData={referraldata} />
                  </TabPanel>
                )} */}
              </Box>
            </Fragment>
          )}

          <UpdateProfile
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            userData={userdata}
          />
          <ChangePassword open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} />
        </ContentWrapper>
      </Card>
    </Fragment>
  );
};

export default UserProfile;
