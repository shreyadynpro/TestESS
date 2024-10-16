import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';

const UploadITRDialog = ({ open, onClose, itrData, onChange, onSubmit, onFileChange }) => {
  const [fileError, setFileError] = React.useState(false); // State to track file error

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if a file is selected
    if (!itrData.attachment) {
      setFileError(true); // Set file error if no file is selected
      return; // Exit if no file
    }

    // Call the onSubmit prop if all checks pass
    onSubmit(e);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload ITR Declaration</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please upload your ITR declaration for FY 2024-25.
          </Typography>
          <hr />
          <TextField
            fullWidth
            label="Financial Year"
            name="fy"
            value="2024-2025"
            onChange={onChange}
            margin="normal"
            required
            disabled
          />
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
            {itrData.attachment && (
              <Box sx={{ mt: 1, color: 'grey' }}>Selected file: {itrData.attachment.name}</Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            sx={{
              mr: 1,
              backgroundColor: 'gray',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'darkgray', // Optional: Change background on hover
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: '#00246b', color: 'white' }}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UploadITRDialog;
