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
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const UploadITProofDialog = ({ open, onClose, itrData, onChange, onSubmit, onFileChange }) => {
  const [fileError, setFileError] = React.useState(false); // State to track file error
  const [fileSizeError, setFileSizeError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if a file is selected
    if (!itrData.attachment) {
      setFileError(true); // Set file error if no file is selected
      return; // Exit if no file
    }

    // Call the onSubmit prop if all checks pass
    setIsSubmitting(true); // Disable the button immediately after submission

    try {
      onSubmit(e); // Call the onSubmit prop
    } catch (error) {
      console.error('Error submitting the form:', error);
      setIsSubmitting(false); // Re-enable the button if there's an error
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(true); // File is too large
        setFileError(false); // Reset the file error
        itrData.attachment = null; // Clear the attachment
      } else {
        setFileSizeError(false); // File size is within the limit
        setFileError(false); // Reset the file error
        onFileChange(e); // Call the parent handler
      }
    }
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Update checkbox state
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle style={{ marginBottom: '0px' }}>Upload IT Proof for FY 2024-25</DialogTitle>

      <form onSubmit={handleSubmit}>
        <hr />
        <DialogContent style={{ marginTop: '0px' }}>
          <p>
            <b>Note:</b>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IT proof submission form
            12BB duly signed to be submitted on or before due date. Form 12BB is statutory
            requirement and any investment proofs without duly signed 12BB forms will be disallowed.
          </p>
          <b>
            Time lines:- You are requested to submit the Hard copy or the Soft Copy of investment
            proofs as per the below due date.
          </b>
          <table
            border={1}
            style={{ borderCollapse: 'collapse', width: '50%', textAlign: 'center' }} // Ensures the borders collapse properly
          >
            <thead>
              <tr style={{ backgroundColor: 'rgb(183 183 183)' }}>
                <th style={{ border: '1px solid black', padding: '8px' }}>Sl. No.</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Proof Type</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Particulars</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Due Dates</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#ffcc99' }}>
                <td style={{ border: '1px solid black', padding: '8px' }}>1</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>IT Proofs</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  Last date for Submission
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>20-Dec-24</td>
              </tr>
            </tbody>
          </table>
          <br />
          <b>Procedure:</b>
          <br />
          <p>
            a. The investment claim forms have to be duly filled and signed by employee. The proofs
            have to be attached to the relevant forms and submitted on or before due date. Please
            ensure that the forms are signed before turning them in. <br />
            <br />
            b. Also ensure to cross check with the checklist provided to make sure that all the
            necessary documents are submitted in one go. No additional documents will be accepted
            after due date and if any documents are missing the same will be disallowed and not be
            considered for tax benefit.
            <br />
            <br />
            c. The submitted investment proofs will be verified by the payroll team for completeness
            and authenticity. On verification, if any of the investment proofs are not qualifying,
            the same will be communicated to the employee through email. Employee may revert back on
            any rejected documents.
            <br />
            <br />
            d. The investment proofs submitted by the employees will be considered for tax
            computation. Employees proceeding on leave / tour may like to submit the bills well in
            advance to avoid claiming tax refunds directly from IT department.
          </p>
          <b>FAQ’S:</b>
          <br />
          <p>
            1. What if my premium is due after <b>last date of IT proofs submission?</b>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If any premiums are due
            after the cutoff date, please submit a declaration in the enclosed format regarding the
            same (Annexure III) along with a copy of the payment made
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last year. The same will be
            considered for tax exemption.
          </p>
          <p>
            2. What will happen to the documents that were submitted by me and were rejected by the
            payroll departments as not qualifying?
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If any of the documents do
            not qualify for tax deduction, the same will be intimated to you via email. If you have
            observations on the same, you are welcome to write to the
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;payroll department for
            clarification and resubmit the documents. The same will be considered in the next month
            payroll..
          </p>
          <p>
            Please note that, under the current IT regulations, it will not be possible for us to
            adjust the taxes already paid into your credit. Hence, please do check on your tax
            calculations, deductions and revert at the earliest for any clarifications.
          </p>
          <p style={{ backgroundColor: 'rgb(255 247 0)' }}>
            We request you to please adhere to the timelines and submit the proofs well in time for
            the payroll team to consider the same and rework on your taxes.{' '}
          </p>
          <p>
            For any clarifications or queries, please write to{' '}
            <a
              href="mailto:taxhelp@dynproindia.com"
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              taxhelp@dynproindia.com
            </a>
            .
          </p>

          <Box sx={{ mt: 2 }}>
            <label htmlFor="file-upload">
              "Upload ZIP file only: (*Please combine all IT proof documents into a single ZIP file
              before uploading.)"
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
                Attachment is required.
              </Typography>
            )}
            {fileSizeError && (
              <Typography color="error" sx={{ mt: 1 }}>
                File size exceeds 10MB. Please upload a smaller file.
              </Typography>
            )}
            {itrData.attachment && !fileSizeError && (
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
            disabled={!isChecked || isSubmitting}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UploadITProofDialog;
