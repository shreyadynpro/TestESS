import SnackbarUtils from 'SnackbarUtils';
import { MatxSuspense } from 'app/components';
import AuthContext from 'app/contexts/JWTAuthContext';
import useIdleTimeout from 'app/hooks/useIdleTimeout';
import useSettings from 'app/hooks/useSettings';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppAboutModule from '../AppAboutModule';
import AppInviteUserModule from '../AppInviteUserModule';
import AppTimer from '../AppTimer';
import AppSnackbar from '../ReusableComponents/AppSnackbar';
import { TermsPolicyModal, termsService } from '../TermsPolicyModal';
import UploadNDADialog from '../DocumentCenter/UploadNDADialog';
import { uploadSignedNDA, hasUserUploadedNDA } from 'app/api/uploadNDA';
import commonConfig from '../commonConfig';
import { MatxLayouts } from './index';

const MatxLayout = (props) => {
  const { settings } = useSettings();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showNDAModal, setShowNDAModal] = useState(false);
  const [ndaUploadLoading, setNdaUploadLoading] = useState(false);
  const dispatch = useDispatch();

  // Get user data from Redux store
  const user = useSelector((state) => state.userDetails?.user);
  const handlePrompt = () => setModalIsOpen(true);
  const { idleTimer, setIdle } = useIdleTimeout({
    onPrompt: handlePrompt,
    idleTime: 1,
  });

  // Check if terms acceptance is required based on API response
  useEffect(() => {
    const checkTermsAndNDARequirements = async () => {
      let termsRequired = false;

      // Check if terms modal was already shown in this session
      const sessionTermsShown = sessionStorage.getItem('termsModalShownInSession');
      
      // Check terms requirement
      if (user) {
        termsRequired = termsService.isTermsAcceptanceRequiredFromAPI(user);
      } else {
        // Fallback to localStorage method for backward compatibility
        termsRequired = termsService.isTermsAcceptanceRequired();
      }

      // Only show terms modal if required AND not already shown in this session
      if (termsRequired && !sessionTermsShown) {
        setShowTermsModal(true);
        // Mark that terms modal has been shown in this session
        sessionStorage.setItem('termsModalShownInSession', 'true');
      } else if (!termsRequired) {
        // If terms are already accepted, check NDA requirement for specific roles
        try {
          // Get user's role ID from localStorage or user object
          const roleId = user?.role_id || localStorage.getItem('roleId');

          // Only check NDA for specific roles (3, 7, 9, 10, 11)
          if ([3, 7, 9, 10, 11].includes(Number(roleId))) {
            const hasNDA = await hasUserUploadedNDA();
            if (!hasNDA) {
              setShowNDAModal(true);
            }
          }
        } catch (error) {
          console.error('Error checking NDA status on load:', error);
          // On error, don't show NDA modal to prevent blocking users
        }
      }
    };

    // Check immediately if user data is available, otherwise wait a bit
    if (user) {
      checkTermsAndNDARequirements();
    } else {
      const timer = setTimeout(checkTermsAndNDARequirements, 500);
      return () => clearTimeout(timer);
    }
  }, [user]); // Depend on user data from Redux

  const handleTermsComplete = async () => {
    setShowTermsModal(false);
    SnackbarUtils.success('Terms & Policy acceptance completed successfully!');

    // After terms completion, check if NDA upload is required
    try {
      const hasNDA = await hasUserUploadedNDA();
      if (!hasNDA) {
        // Show NDA upload modal if user hasn't uploaded NDA
        setShowNDAModal(true);
      }
    } catch (error) {
      console.error('Error checking NDA status:', error);
      // On error, assume NDA is required
      setShowNDAModal(true);
    }
  };

  // Handle NDA upload
  const handleNDAUpload = async (file) => {
    try {
      setNdaUploadLoading(true);
      const response = await uploadSignedNDA(file);

      if (response.error) {
        SnackbarUtils.error(response.error);
        return;
      }

      // Success - close modal and show success message
      setShowNDAModal(false);
      SnackbarUtils.success('Signed NDA uploaded successfully!');
    } catch (error) {
      console.error('Error uploading NDA:', error);
      SnackbarUtils.error('Failed to upload NDA. Please try again.');
    } finally {
      setNdaUploadLoading(false);
    }
  };

  // Handle NDA modal close - only allow if not mandatory
  const handleNDAClose = () => {
    // Don't allow closing if this is a mandatory upload (first-time user)
    // The modal will only close after successful upload
    if (!ndaUploadLoading) {
      // For now, we'll keep it mandatory - user must upload to proceed
      SnackbarUtils.warning('Please upload your signed NDA to continue using the application.');
    }
  };

  useEffect(() => {
    let timeoutId;
    let nextScheduledTime = localStorage.getItem('lastScheduledTime');
    const totalMins = 27;

    const scheduleNextExecution = () => {
      // Perform your desired action here
      if (idleTimer.isLastActiveTab()) handleRefreshToken();

      // Calculate and update the next scheduled time
      const currentTime = new Date().getTime();
      const twentySevenMinutesInMillis = 1000 * 60 * totalMins;
      nextScheduledTime = new Date(currentTime + twentySevenMinutesInMillis).toString();
      localStorage.setItem('lastScheduledTime', nextScheduledTime);

      // Schedule the next execution
      timeoutId = setTimeout(scheduleNextExecution, twentySevenMinutesInMillis);
    };

    if (nextScheduledTime) {
      const currentTime = new Date().getTime();
      const remainingTime = new Date(nextScheduledTime) - currentTime;
      timeoutId = setTimeout(scheduleNextExecution, remainingTime);
    } else {
      const now = new Date();
      nextScheduledTime = new Date(now.getTime() + totalMins * 60 * 1000).toString();
      localStorage.setItem('lastScheduledTime', nextScheduledTime);

      // Schedule the first execution
      const initialRemainingTime = totalMins * 60 * 1000;
      timeoutId = setTimeout(scheduleNextExecution, initialRemainingTime);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleRefreshToken = async () => {
    const authToken = getAccessToken();
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: commonConfig.urls.refreshToken,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const response = await axios(config);
      if (response.data?.Code === 200) {
        localStorage.setItem('accessToken', response.data.Response.access_token);
        const accessToken = response.data.Response.access_token;
        dispatch({ type: 'SET_TOKEN', accessToken });
      }
    } catch (error) {
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
      logout();
    }
  };
  const stayLoggedIn = async () => {
    setModalIsOpen(false);
    idleTimer.reset();
    const authToken = getAccessToken();
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: commonConfig.urls.refreshToken,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const response = await axios(config);
      if (response.data?.Code === 200) {
        localStorage.setItem('accessToken', response.data.Response.access_token);
        const accessToken = response.data.Response.access_token;
        dispatch({ type: 'SET_TOKEN', accessToken });
      }
    } catch (error) {
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
      logout();
    }
  };

  const { logout } = useContext(AuthContext);
  const handleIdle = () => {
    setIdle(true);
    dispatch({ type: 'SET_USER_TYPE', userIsA: 'viewer' });
    logout();
  };

  window.addEventListener('storage', (e) => {
    if (e.key === commonConfig.tokens.accessToken && e.oldValue && !e.newValue) {
      logout();
    }
  });

  const Layout = MatxLayouts[settings.activeLayout];
  return (
    <MatxSuspense>
      {idleTimer.isLastActiveTab() && (
        <AppTimer open={modalIsOpen} handleExtend={stayLoggedIn} handleLogout={handleIdle} />
      )}
      <AppAboutModule />
      <AppInviteUserModule />
      <AppSnackbar />

      {/* Terms & Policy Modal - Mandatory for first-time users */}
      <TermsPolicyModal open={showTermsModal} onComplete={handleTermsComplete} />

      {/* NDA Upload Modal - Mandatory after terms completion if NDA not uploaded */}
      <UploadNDADialog
        open={showNDAModal}
        onClose={handleNDAClose}
        onSubmit={handleNDAUpload}
        loading={ndaUploadLoading}
      />

      <Layout {...props} />
    </MatxSuspense>
  );
};

export default MatxLayout;