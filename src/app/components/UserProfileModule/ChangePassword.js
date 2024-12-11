import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from 'app/utils/utils';
import SnackbarUtils from 'SnackbarUtils';
import commonConfig from '../commonConfig';

// Styled TextField component
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey',
    },
    '&:hover fieldset': {
      borderColor: 'dodgerblue',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'dodgerblue',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'grey',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'dodgerblue',
  },
}));

// Styled Button component
const StyledButton = styled(Button)(({ colorType }) => ({
  backgroundColor: colorType === 'cancel' ? 'grey' : '#00246b',
  color: 'white',
  '&:hover': {
    backgroundColor: colorType === 'cancel' ? 'darkgrey' : 'royalblue',
  },
}));

const ChangePassword = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // State to capture error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit() {
    const authToken = getAccessToken();
    try {
      const response = await axios.post(commonConfig.urls.changepassword, formData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response?.data?.Status === 401) {
        setErrorMessage(response?.data?.Message || 'Something went wrong.');
      } else if (response?.data?.Status === 200) {
        SnackbarUtils.success('Password updated successfully');
        setErrorMessage(''); // Clear error message on success
        onClose();
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.Message || 'Something went wrong!');
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Change Password</DialogTitle>

      <DialogContent>
        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Box>
          <CustomTextField
            margin="dense"
            label="Current Password"
            fullWidth
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            variant="outlined"
            type="password"
          />
          <CustomTextField
            margin="dense"
            label="New Password"
            fullWidth
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            variant="outlined"
            type="password"
          />
          <CustomTextField
            margin="dense"
            label="Confirm New Password"
            fullWidth
            name="new_password_confirmation"
            value={formData.new_password_confirmation}
            onChange={handleChange}
            variant="outlined"
            type="password"
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <StyledButton colorType="cancel" onClick={onClose}>
          Cancel
        </StyledButton>
        <StyledButton onClick={handleSubmit}>Update</StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePassword;
