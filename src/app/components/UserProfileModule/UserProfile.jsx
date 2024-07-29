import { Edit, Email, Group, Work } from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  Card,
  Modal,
  styled,
  Typography,
  useTheme,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { H4, Small } from 'app/components/Typography';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import commonConfig from '../commonConfig';
import EditUserProfile from './EditUserProfile';
import ResetPassword from './ResetPassword';
import SnackbarUtils from 'SnackbarUtils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

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

const FlexBetween = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const FlexCenter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// styled components
const ContentWrapper = styled(Box)(({ theme }) => ({
  zIndex: 1,
  marginTop: 55,
  position: 'relative',
  [theme.breakpoints.down('sm')]: { paddingLeft: 20, paddingRight: 20 },
}));

const CoverPicWrapper = styled(Box)(() => ({
  top: 0,
  left: 0,
  height: 125,
  width: '100%',
  overflow: 'hidden',
  position: 'absolute',
  backgroundColor: '#C6D3ED',
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: 100,
  height: 100,
  margin: 'auto',
  overflow: 'hidden',
  borderRadius: '50%',
  border: '2px solid',
  borderColor: 'white',
  backgroundColor: theme.palette.primary[200],
}));

const CenteredBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '20px',
});

const DetailBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  borderRadius: '10px',
  padding: '20px',
  margin: '10px 0',
  boxShadow: `0 0 10px ${theme.palette.grey[300]}`,
}));

const UserProfile = () => {
  const [userObj, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal'); // State to manage the active tab
  const [openModal, setOpenModal] = useState(false);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
  const authToken = getAccessToken();
  const theme = useTheme();

  const FetchOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(commonConfig.urls.forget_password, {
        email: userObj?.email,
        entity_id: process.env.REACT_APP_env_entity_id,
      });
      setLoading(false);
      if (response.data && response.data.Status === 'Success') {
        SnackbarUtils.success(response.data.Message);
        setLoading(false);
      } else {
        SnackbarUtils.error('Email Not Available...!!!');
      }
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
    }
  };

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
        setData(response['data']['Response']);
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Fragment>
      <Card sx={{ padding: 3, position: 'relative' }}>
        <CoverPicWrapper>
          <img
            width="100%"
            height="100%"
            alt="Team Member"
            src="/assets/images/study-2.jpg"
            style={{ objectFit: 'cover' }}
          />
        </CoverPicWrapper>

        <ContentWrapper>
          <FlexBox justifyContent="center">
            <AvatarBadge
              badgeContent={
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  onClick={() => setOpenModal(true)}
                >
                  <Edit sx={{ fontSize: 16, color: 'white' }} />
                </IconButton>
              }
            >
              <ImageWrapper>
                <img
                  src={userObj?.profile_pic || '/assets/images/avatars/001-man.svg'}
                  alt="Team Member"
                />
              </ImageWrapper>
            </AvatarBadge>
          </FlexBox>

          <Box mt={2}>
            <H4 fontWeight={600} textAlign="center">
              {userObj?.first_name} {userObj?.last_name}
            </H4>

            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Personal Information" value="personal" />
              <Tab label="Professional Information" value="professional" />
              <Tab label="Documentation" value="documentation" />
            </Tabs>

            <CenteredBox mt={2}>
              {activeTab === 'personal' && (
                <DetailBox>
                  <FlexBetween>
                    <Typography variant="h6" gutterBottom>
                      Personal Information
                    </Typography>
                    <IconButton
                      aria-label="edit personal information"
                      component="span"
                      onClick={() => setOpenModal(true)}
                    >
                      <Edit sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                    </IconButton>
                  </FlexBetween>
                  <Typography variant="body2" color="text.secondary">
                    Email: {userObj.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {userObj.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {userObj.address}
                  </Typography>
                </DetailBox>
              )}

              {activeTab === 'professional' && (
                <DetailBox>
                  <FlexBetween>
                    <Typography variant="h6" gutterBottom>
                      Professional Information
                    </Typography>
                    <IconButton
                      aria-label="edit professional information"
                      component="span"
                      onClick={() => setOpenModal(true)}
                    >
                      <Edit sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                    </IconButton>
                  </FlexBetween>
                  <Typography variant="body2" color="text.secondary">
                    Group: {userObj.group}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Role: {userObj.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Department: {userObj.department}
                  </Typography>
                </DetailBox>
              )}

              {activeTab === 'documentation' && (
                <DetailBox>
                  <FlexBetween>
                    <Typography variant="h6" gutterBottom>
                      Documentation
                    </Typography>
                    <IconButton
                      aria-label="edit documentation"
                      component="span"
                      onClick={() => setOpenModal(true)}
                    >
                      <Edit sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                    </IconButton>
                  </FlexBetween>
                  <Typography variant="body2" color="text.secondary">
                    Documents: {userObj.documents}
                  </Typography>
                </DetailBox>
              )}
            </CenteredBox>

            <Box mt={2} display="flex" justifyContent="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenResetPasswordModal(true)}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </ContentWrapper>
      </Card>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="edit-user-profile"
        aria-describedby="edit-user-profile-description"
      >
        <Box sx={style}>
          <EditUserProfile tab={activeTab} user={userObj} onclose={() => setOpenModal(false)} />
        </Box>
      </Modal>

      <Modal
        open={openResetPasswordModal}
        onClose={() => setOpenResetPasswordModal(false)}
        aria-labelledby="reset-password"
        aria-describedby="reset-password-description"
      >
        <Box sx={style}>
          <ResetPassword onclose={() => setOpenResetPasswordModal(false)} />
        </Box>
      </Modal>
    </Fragment>
  );
};

export default UserProfile;
