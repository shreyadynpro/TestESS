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
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const UploadITRDialog = ({ open, onClose, itrData, onChange, onSubmit, onFileChange }) => {
  const [fileError, setFileError] = useState(null); // State to track file error
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_FILE_SIZE_MB = 5;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file size exceeds 5 MB
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileError(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }

      // Clear any previous errors and call the parent `onFileChange` handler
      setFileError(null);
      onFileChange(event);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if a file is selected
    if (!itrData.attachment) {
      setFileError('Attachment is required.');
      return;
    }

    setIsSubmitting(true); // Disable the button immediately after submission

    try {
      onSubmit(e); // Call the onSubmit prop
    } catch (error) {
      console.error('Error submitting the form:', error);
      setIsSubmitting(false); // Re-enable the button if there's an error
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Update checkbox state
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload IT Declaration</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please upload your IT declaration for FY 2024-25.
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
                onChange={handleFileChange}
                style={{
                  display: 'none', // Hide the default file input
                }}
              />
            </label>
            {fileError && (
              <Typography color="error" sx={{ mt: 1 }}>
                {fileError}
              </Typography>
            )}
            {itrData.attachment && !fileError && (
              <Box sx={{ mt: 1, color: 'grey' }}>Selected file: {itrData.attachment.name}</Box>
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  color="primary"
                  sx={{
                    '&.Mui-checked': {
                      color: '#00246b', // Set the color when checked (e.g., dark blue)
                    },
                  }}
                />
              }
              label="Once you submit the IT declaration, no further changes can be made"
            />
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
            disabled={!isChecked || isSubmitting || fileError}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UploadITRDialog;
