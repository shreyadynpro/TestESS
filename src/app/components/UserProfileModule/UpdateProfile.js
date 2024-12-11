import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Button,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { getAccessToken } from 'app/utils/utils';
import SnackbarUtils from 'SnackbarUtils';
import commonConfig from '../commonConfig';
import { useNavigate } from 'react-router-dom';
import commonRoutes from 'app/components/commonRoutes';

// Styled TextField component
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
  },
  '& .MuiInputLabel-root': {
    color: 'grey', // Default label color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'dodgerblue', // Label color when focused
  },
}));

// Styled Button component
const StyledButton = styled(Button)(({ theme, colorType }) => ({
  backgroundColor: colorType === 'cancel' ? 'grey' : '#00246b',
  color: 'white',
  '&:hover': {
    backgroundColor: colorType === 'cancel' ? 'darkgrey' : 'royalblue',
  },
}));

// Styled Radio to enhance visibility when checked
const StyledRadio = styled(Radio)(({ theme }) => ({
  color: 'grey',
  '&.Mui-checked': {
    color: 'dodgerblue', // Color when selected
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

const UpdateProfile = ({ open, onClose, userData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    midName: '',
    dob: '',
    gender: '',
  });
  const [fileError, setFileError] = useState(false);
  const [fileError1, setFileError1] = useState(false);
  const [fileError2, setFileError2] = useState(false);
  const [initialData, setInitialData] = useState({});

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    open: false,
    responseError: '',
    hasError: false,
  });

  useEffect(() => {
    if (userData) {
      const initialFormState = {
        fname: userData.first_name || '',
        lname: userData.last_name || '',
        pemail: userData.email1 || '',
        identity_no: userData.identity_no || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        middle_name: userData.mid_name || '',
        personal_email: userData.email1 || '',
        contact: userData.phone_mobile || '',
        dob: userData.date_of_birth || '',
        gender: userData.sex || '',
        marital_status: userData.marital_status || '',
        present_country: userData.primary_address_country || '',
        present_state: userData.primary_address_state || '',
        present_city: userData.primary_address_city || '',
        present_address: userData.primary_address_street || '',
        present_pincode: userData.primary_address_postalcode || '',
        permanant_state: userData.alt_address_state || '',
        permanant_city: userData.alt_address_city || '',
        permanant_address: userData.alt_address_street || '',
        permanant_pincode: userData.alt_address_postalcode || '',
        emergency_address: userData.emergency_contact_address || '',
        emergency_name: userData.emergency_contact_name || '',
        emergency_contact: userData.emergency_contact_no || '',
        emergency_relationship: userData.emergency_contact_relatio || '',
        bank_name: userData.bank_name || '',
        holder_name: userData.name_as_per_bank || '',
        account_no: userData.bank_account_number || '',
        branch_name: userData.branch || '',
        bank_ifsc: userData.bank_ifsc || '',
      };
      setFormData(initialFormState);
      setInitialData(initialFormState); // Store the initial data for comparison
    }
  }, [userData]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getChangedFields = () => {
    const changedFields = {};
    let hasChanges = false;
    let addressChanged = false;
    let paraddressChanged = false;
    let bankChanged = false;

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialData[key]) {
        changedFields[key] = formData[key];
        hasChanges = true; // Set flag if any field has changed
      }
    });

    if (
      formData.bank_name !== initialData.bank_name ||
      formData.holder_name !== initialData.holder_name ||
      formData.account_no !== initialData.account_no ||
      formData.branch_name !== initialData.branch_name ||
      formData.bank_ifsc !== initialData.bank_ifsc
    ) {
      bankChanged = true;
    }

    // Set fileError1 to true if address has changed
    setFileError(bankChanged);
    // Check if any primary address fields have changed
    if (
      formData.present_state !== initialData.present_state ||
      formData.present_city !== initialData.present_city ||
      formData.present_address !== initialData.present_address ||
      formData.present_pincode !== initialData.present_pincode
    ) {
      addressChanged = true;
    }
    // Set fileError1 to true if address has changed
    setFileError1(addressChanged);

    // Check if any primary address fields have changed
    if (
      formData.permanant_state !== initialData.permanant_state ||
      formData.permanant_city !== initialData.permanant_city ||
      formData.permanant_address !== initialData.permanant_address ||
      formData.permanant_pincode !== initialData.permanant_pincode
    ) {
      paraddressChanged = true;
    }
    setFileError2(paraddressChanged);
    // Always include fname, lname, pemail, and identity_no if there are any changes
    if (hasChanges) {
      changedFields.fname = initialData.first_name;
      changedFields.lname = initialData.last_name;
      changedFields.pemail = initialData.personal_email;
      changedFields.identity_no = initialData.identity_no;
    }

    return { changedFields, addressChanged, paraddressChanged, bankChanged };
  };
  async function handleSubmit() {
    const { changedFields, addressChanged, paraddressChanged, bankChanged } = getChangedFields(); // Get changed fields and address change status
    // Check if no changes were detected
    if (Object.keys(changedFields).length === 0) {
      SnackbarUtils.warning('No changes detected');
      return;
    }
    // Check if address proof is required but not provided
    if (bankChanged && !changedFields.attachment) {
      SnackbarUtils.error('Cheque Attachment is required');
      return; // Stop the form submission
    }
    if (addressChanged && !changedFields.present_address_proof) {
      SnackbarUtils.error('Attachment is required for present address proof');
      return; // Stop the form submission
    }
    if (paraddressChanged && !changedFields.pre_address_proof) {
      SnackbarUtils.error('Attachment is required for permanant address proof');
      return; // Stop the form submission
    }

    const formData = new FormData();
    // Append the form data fields
    for (const [key, value] of Object.entries(changedFields)) {
      formData.append(key, value);
    }

    // Only append the file if it exists
    if (setFormData.attachment) {
      formData.append('attachment', setFormData.attachment);
    }
    if (setFormData.present_address_proof) {
      formData.append('present_address_proof', setFormData.present_address_proof);
    }
    if (setFormData.pre_address_proof) {
      formData.append('pre_address_proof', setFormData.pre_address_proof);
    }

    const authToken = getAccessToken();
    try {
      dispatch({ type: 'LOADING', bool: true });

      // Post the formData
      const response = await axios.post(commonConfig.urls.updateEmpProfile, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
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
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      attachment: file, // Store the file in referralData
    }));
    if (file) {
      setFileError(false);
    }
  };
  const handleFileChange1 = (e) => {
    const file1 = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      present_address_proof: file1, // Store the file in referralData
    }));
    if (file1) {
      setFileError1(false);
    }
  };
  const handleFileChange2 = (e) => {
    const file2 = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      pre_address_proof: file2, // Store the file in referralData
    }));
    if (file2) {
      setFileError2(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Profile</DialogTitle>
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
      <DialogContent>
        <Box display="flex" flexDirection="row" gap={2}>
          <Typography variant="h6" align="left" style={{ color: '#cb8b59', fontSize: '16px' }}>
            Personal Info
          </Typography>
        </Box>

        <Box display="flex" flexDirection="row" gap={2}>
          <CustomTextField
            margin="dense"
            label="First Name"
            fullWidth
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            variant="outlined"
            disabled
          />
          <CustomTextField
            margin="dense"
            label="Middle Name"
            fullWidth
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
            variant="outlined"
            disabled
          />
          <CustomTextField
            margin="dense"
            label="Last Name"
            fullWidth
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            variant="outlined"
            disabled
          />
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <CustomTextField
            margin="dense"
            label="Personal Email"
            fullWidth
            name="personal_email"
            value={formData.personal_email}
            onChange={handleChange}
            variant="outlined"
            disabled
          />
          <CustomTextField
            margin="dense"
            label="Contact"
            fullWidth
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        {/* DOB and Gender on the same row */}
        <Box display="flex" flexDirection="row" gap={2}>
          <CustomTextField
            margin="dense"
            label="Date of Birth"
            fullWidth
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            variant="outlined"
            disabled
            sx={{ flex: 1 }} // Adjusts the flex size to control spacing
          />
          <Box sx={{ flex: 1 }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender} // Gender selected by default if available
              onChange={handleChange}
            >
              <FormControlLabel value="Male" control={<StyledRadio />} label="Male" disabled />
              <FormControlLabel value="Female" control={<StyledRadio />} label="Female" disabled />
            </RadioGroup>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <Box sx={{ flex: 1 }}>
            {' '}
            {/* Set flex to 1 to align with DOB */}
            <FormLabel component="legend">Marital Status</FormLabel>
            <RadioGroup
              row
              name="marital_status"
              value={formData.marital_status} // Gender selected by default if available
              onChange={handleChange}
            >
              <FormControlLabel value="Married" control={<StyledRadio />} label="Married" />
              <FormControlLabel value="Single" control={<StyledRadio />} label="Single" />
            </RadioGroup>
          </Box>
        </Box>

        <Box display="flex" flexDirection="row" gap={2}>
          <Typography variant="h6" align="left" style={{ color: '#cb8b59', fontSize: '16px' }}>
            Present Address
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          {/* <CustomTextField
            margin="dense"
            label="Country Name"
            fullWidth
            name="present_country"
            value={formData.present_country}
            onChange={handleChange}
            variant="outlined"
          /> */}
          <CustomTextField
            margin="dense"
            label="State"
            fullWidth
            name="present_state"
            value={formData.present_state}
            onChange={handleChange}
            variant="outlined"
          />
          <CustomTextField
            margin="dense"
            label="City"
            fullWidth
            name="present_city"
            value={formData.present_city}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <CustomTextField
            margin="dense"
            label="Address"
            fullWidth
            name="present_address"
            value={formData.present_address}
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '67%' }}
          />
          <CustomTextField
            margin="dense"
            label="Pincode"
            fullWidth
            name="present_pincode"
            value={formData.present_pincode}
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '32%' }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <label htmlFor="present_address_proof_upload">
            Upload Present Address Proof:(Max 512KB, allowed formats: jpg, jpeg, png)
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
              id="present_address_proof_upload"
              type="file"
              name="present_address_proof"
              onChange={handleFileChange1}
              style={{
                display: 'none', // Hide the default file input
              }}
            />
          </label>
          {fileError1 && (
            <Typography color="error" sx={{ mt: 1 }}>
              Attachment is required.
            </Typography>
          )}
          {formData.present_address_proof && (
            <Box sx={{ mt: 1, color: 'grey' }}>
              Selected file: {formData.present_address_proof.name}
            </Box>
          )}
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <Typography variant="h6" align="left" style={{ color: '#cb8b59', fontSize: '16px' }}>
            Permanant Address
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <CustomTextField
            margin="dense"
            label="Address"
            fullWidth
            name="permanant_address"
            value={formData.permanant_address}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <CustomTextField
            margin="dense"
            label="State"
            fullWidth
            name="permanant_state"
            value={formData.permanant_state}
            onChange={handleChange}
            variant="outlined"
          />
          <CustomTextField
            margin="dense"
            label="City"
            fullWidth
            name="permanant_city"
            value={formData.permanant_city}
            onChange={handleChange}
            variant="outlined"
          />
          <CustomTextField
            margin="dense"
            label="Pincode"
            fullWidth
            name="permanant_pincode"
            value={formData.permanant_pincode}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <label htmlFor="pre_address_proof_upload">
            Upload Permanant Address Proof:(Max 512KB, allowed formats: jpg, jpeg, png)
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
              id="pre_address_proof_upload"
              type="file"
              name="pre_address_proof"
              onChange={handleFileChange2}
              style={{
                display: 'none', // Hide the default file input
              }}
            />
          </label>
          {fileError2 && (
            <Typography color="error" sx={{ mt: 1 }}>
              Attachment is required.
            </Typography>
          )}
          {formData.pre_address_proof && (
            <Box sx={{ mt: 1, color: 'grey' }}>
              Selected file: {formData.pre_address_proof.name}
            </Box>
          )}
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <Typography variant="h6" align="left" style={{ color: '#cb8b59', fontSize: '16px' }}>
            Emergency Address/Contact
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <CustomTextField
            margin="dense"
            label="Address"
            fullWidth
            name="emergency_address"
            value={formData.emergency_address}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <CustomTextField
            margin="dense"
            label="Name"
            fullWidth
            name="emergency_name"
            value={formData.emergency_name}
            onChange={handleChange}
            variant="outlined"
          />
          <CustomTextField
            margin="dense"
            label="Contact"
            fullWidth
            name="emergency_contact"
            value={formData.emergency_contact}
            onChange={handleChange}
            variant="outlined"
          />
          <CustomTextField
            margin="dense"
            label="Relationship"
            fullWidth
            name="emergency_relationship"
            value={formData.emergency_relationship}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <Typography variant="h6" align="left" style={{ color: '#cb8b59', fontSize: '16px' }}>
            Bank Account
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <CustomTextField
            margin="dense"
            label="Bank Name"
            fullWidth
            name="bank_name"
            value={formData.bank_name}
            onChange={handleChange}
            variant="outlined"
          />

          <CustomTextField
            margin="dense"
            label="Name as per bank"
            fullWidth
            name="holder_name"
            value={formData.holder_name}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box display="flex" flexDirection="row" gap={2}>
          <CustomTextField
            margin="dense"
            label="Account No"
            fullWidth
            name="account_no"
            value={formData.account_no}
            onChange={handleChange}
            variant="outlined"
          />
          <CustomTextField
            margin="dense"
            label="Branch Name"
            fullWidth
            name="branch_name"
            value={formData.branch_name}
            onChange={handleChange}
            variant="outlined"
          />
          <CustomTextField
            margin="dense"
            label="IFSC Code"
            fullWidth
            name="bank_ifsc"
            value={formData.bank_ifsc}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        {/* File upload input */}
        <Box sx={{ mt: 2 }}>
          <label htmlFor="file-upload">
            Upload cheque Copy:(Max 512KB, allowed formats: jpg, jpeg, png)
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
          {formData.attachment && (
            <Box sx={{ mt: 1, color: 'grey' }}>Selected file: {formData.attachment.name}</Box>
          )}
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

export default UpdateProfile;
