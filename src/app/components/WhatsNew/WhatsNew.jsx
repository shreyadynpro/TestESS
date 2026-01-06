// src/app/components/WhatsNew/WhatsNew.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const updates = [
  "Added daily changing 'Thought of the Day' feature",
  'Improved navigation with back buttons',
  'Enhanced user experience with better form layouts',
  // Add more updates here as needed
];

const WhatsNew = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '12px',
          padding: '16px',
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            What's New
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <List>
          {updates.map((update, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <span style={{ marginRight: '8px' }}>✨</span>
                    {update}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" fullWidth>
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WhatsNew;