import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';
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

const ReferralDialog = ({ open, onClose, referralData, onChange, onSubmit }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle sx={{ color: '#00246b', fontWeight: 'bold' }}>Add Referral</DialogTitle>
    <hr style={{ border: '1px solid #00246b', margin: '8px 0' }} />
    <DialogContent>
      <form onSubmit={onSubmit}>
        {/* Manually create each TextField with its corresponding name and label */}
        <CustomTextField
          fullWidth
          label="Full Name"
          name="full_name"
          value={referralData.fullName} // Access fullName from referralData
          onChange={onChange}
          margin="normal"
          required
        />
        <CustomTextField
          fullWidth
          label="Email"
          name="email"
          value={referralData.email} // Access email from referralData
          onChange={onChange}
          margin="normal"
          required
        />
        <CustomTextField
          fullWidth
          label="Contact Number"
          name="contact_no"
          value={referralData.contactNo} // Access contactNo from referralData
          onChange={onChange}
          margin="normal"
          required
        />
        <CustomTextField
          fullWidth
          label="Skill"
          name="skills"
          value={referralData.skills} // Access skills from referralData
          onChange={onChange}
          margin="normal"
          required
        />
        <CustomTextField
          fullWidth
          label="Experience"
          name="experience"
          value={referralData.experience} // Access experience from referralData
          onChange={onChange}
          margin="normal"
          required
        />
        <CustomTextField
          fullWidth
          label="PAN"
          name="pan"
          value={referralData.pan} // Access PAN from referralData
          onChange={onChange}
          margin="normal"
          required
        />
        <CustomTextField
          fullWidth
          label="Current Location"
          name="current_location"
          value={referralData.currentLocation} // Access currentLocation from referralData
          onChange={onChange}
          margin="normal"
          required
        />

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

export default ReferralDialog;
