import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

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

const ReferralDialog = ({ open, onClose, referralData, onChange, onSubmit, onFileChange }) => {
  const [fileError, setFileError] = React.useState(false); // State to track file error

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if a file is selected
    if (!referralData.attachment) {
      setFileError(true); // Set file error if no file is selected
      return; // Exit if no file
    }

    // Call the onSubmit prop if all checks pass
    onSubmit(e);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: '#00246b', fontWeight: 'bold' }}>Add Referral</DialogTitle>
      <hr style={{ border: '1px solid #00246b', margin: '8px 0' }} />
      <p style={{ color: '#00246b', margin: '8px 0', textAlign: 'center' }}>
        Please enter candidate information below.
      </p>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <CustomTextField
            fullWidth
            label="Full Name"
            name="full_name"
            value={referralData.full_name}
            onChange={onChange}
            margin="normal"
            required
          />
          <CustomTextField
            fullWidth
            label="Email"
            name="email"
            value={referralData.email}
            onChange={onChange}
            margin="normal"
            required
          />
          <CustomTextField
            fullWidth
            label="Contact Number"
            name="contact_no"
            value={referralData.contact_no}
            onChange={onChange}
            margin="normal"
            required
          />
          <CustomTextField
            fullWidth
            label="Skill"
            name="skills"
            value={referralData.skills}
            onChange={onChange}
            margin="normal"
            required
          />
          <CustomTextField
            fullWidth
            label="Experience"
            name="experience"
            value={referralData.experience}
            onChange={onChange}
            margin="normal"
            type="number"
            inputProps={{ min: 0, step: 'any' }}
            required
          />
          <CustomTextField
            fullWidth
            label="PAN"
            name="pan"
            value={referralData.pan}
            onChange={onChange}
            margin="normal"
            required
          />
          <CustomTextField
            fullWidth
            label="Current Location"
            name="current_location"
            value={referralData.current_location}
            onChange={onChange}
            margin="normal"
            required
          />

          {/* File upload input */}
          <Box sx={{ mt: 2 }}>
            <label htmlFor="file-upload">
              Upload Attachment:
              <Button
                variant="contained"
                component="span"
                sx={{
                  display: 'block',
                  marginTop: '8px',
                  backgroundColor: '#e3f2fd', // Light blue shade
                  color: '#00246b', // Darker text color for contrast
                  '&:hover': {
                    backgroundColor: '#bbdefb', // Slightly darker on hover, still light
                  },
                }}
              >
                Choose File
              </Button>
              <input
                id="file-upload"
                type="file"
                name="attachment"
                onChange={onFileChange}
                style={{
                  display: 'none', // Hide the default file input
                }}
              />
            </label>
            {fileError && (
              <Typography color="error" sx={{ mt: 1 }}>
                Attachment is required.
              </Typography>
            )}
            {referralData.attachment && (
              <Box sx={{ mt: 1, color: 'grey' }}>Selected file: {referralData.attachment.name}</Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#00246b' }}>
              Submit
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralDialog;
