import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadNDADialog = ({ open, onClose, onSubmit, loading, userRole }) => {
  // Check if user has permission to access NDA functionality
  const hasNDAPermission = [3, 7, 9, 10, 11].includes(Number(userRole));
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setError('');

    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file only.');
      setSelectedFile(null);
      event.target.value = '';
      return;
    }

    // Validate file size (15MB limit)
    const maxSize = 15 * 1024 * 1024; // 15MB in bytes
    if (file.size > maxSize) {
      setError('File size must be less than 15MB.');
      setSelectedFile(null);
      event.target.value = '';
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setError('Please select a PDF file to upload.');
      return;
    }

    onSubmit(selectedFile);
  };

  const handleClose = () => {
    if (!loading) {
      setSelectedFile(null);
      setError('');
      onClose();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle NDA template view
  const handleViewNDATemplate = () => {
    const ndaPath = '/Acknowledgement/CRM4-NDA.pdf';
    window.open(ndaPath, '_blank');
  };

  // Handle NDA template download
  const handleDownloadNDATemplate = () => {
    const ndaPath = '/Acknowledgement/CRM4-NDA.pdf';
    const link = document.createElement('a');
    link.href = ndaPath;
    link.download = 'CRM4-NDA.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!hasNDAPermission) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ color: '#00246b', fontWeight: 'bold' }}>
            Access Denied
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body1">
              You don't have permission to access the NDA functionality.
            </Typography>
          </Box>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div" sx={{ color: '#00246b', fontWeight: 'bold' }}>
          Upload Signed NDA
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* NDA Template Section */}
          <Box
            sx={{
              mb: 4,
              p: 2,
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              backgroundColor: '#f8f9fa',
            }}
          >
            <Typography variant="h6" sx={{ color: '#00246b', fontWeight: 'bold', mb: 2 }}>
              Step 1: Download NDA Template
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              First, download the NDA template, sign it, and then upload the signed document.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={handleViewNDATemplate}
                sx={{
                  borderColor: '#00246b',
                  color: '#00246b',
                  '&:hover': {
                    borderColor: '#001a4d',
                    backgroundColor: 'rgba(0, 36, 107, 0.04)',
                  },
                }}
              >
                View NDA
              </Button>
              <Button
                variant="contained"
                startIcon={<GetAppIcon />}
                onClick={handleDownloadNDATemplate}
                sx={{
                  backgroundColor: '#00246b',
                  '&:hover': {
                    backgroundColor: '#001a4d',
                  },
                }}
              >
                Download NDA
              </Button>
            </Box>
          </Box>

          {/* Upload Section */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#00246b', fontWeight: 'bold', mb: 2 }}>
              Step 2: Upload Signed NDA
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Please select a PDF file to upload your signed NDA document.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{
                height: 56,
                borderStyle: 'dashed',
                borderWidth: 2,
                borderColor: selectedFile ? '#4caf50' : '#ccc',
                color: selectedFile ? '#4caf50' : '#666',
                '&:hover': {
                  borderColor: '#00246b',
                  backgroundColor: 'rgba(0, 36, 107, 0.04)',
                },
              }}
              disabled={loading}
            >
              {selectedFile ? 'Change PDF File' : 'Select PDF File'}
              <VisuallyHiddenInput
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
              />
            </Button>

            {selectedFile && (
              <Box
                sx={{
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  backgroundColor: '#f9f9f9',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
                  Selected File:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Name:</strong> {selectedFile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Size:</strong> {formatFileSize(selectedFile.size)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Type:</strong> {selectedFile.type}
                </Typography>
              </Box>
            )}

            {loading && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Uploading NDA document...
                </Typography>
                <LinearProgress />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleClose} disabled={loading} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!selectedFile || loading}
          sx={{
            backgroundColor: '#00246b',
            '&:hover': {
              backgroundColor: '#001a4d',
            },
          }}
        >
          {loading ? 'Uploading...' : 'Upload NDA'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadNDADialog;
