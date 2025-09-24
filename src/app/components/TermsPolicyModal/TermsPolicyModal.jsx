import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  LinearProgress,
  Paper,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { termsService } from './termsService';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: '90vw',
    maxHeight: '90vh',
    width: '1000px',
    height: '700px',
  },
}));

const PdfViewer = styled('iframe')({
  width: '100%',
  height: '500px',
  border: '1px solid #ddd',
  borderRadius: '4px',
});

const ProgressContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const DocumentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
}));

const TermsPolicyModal = ({ open, onComplete }) => {
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [acceptedDocs, setAcceptedDocs] = useState({});
  const [isAccepted, setIsAccepted] = useState(false);

  // PDF documents configuration
  const documents = [
    {
      filename: 'CRM2-HIPAA Security Awareness &Training.pdf',
      title: 'HIPAA Security Awareness & Training',
      description: 'Please review the HIPAA Security guidelines and training materials.',
      path: '/Acknowledgement/CRM2-HIPAA Security Awareness &Training.pdf'
    },
    {
      filename: 'CRM3-Code Ethics & Business Conduct-CEBC.1.pdf',
      title: 'Code of Ethics & Business Conduct',
      description: 'Please review our code of ethics and business conduct policies.',
      path: '/Acknowledgement/CRM3-Code Ethics & Business Conduct-CEBC.1.pdf'
    },
    {
      filename: 'CRM5-1.0-POSH-Awareness & Education.pdf',
      title: 'POSH Awareness & Education',
      description: 'Please review the Prevention of Sexual Harassment policies and guidelines.',
      path: '/Acknowledgement/CRM5-1.0-POSH-Awareness & Education.pdf'
    }
  ];

  const currentDoc = documents[currentDocIndex];
  const totalDocs = documents.length;
  const progressPercent = ((currentDocIndex + 1) / totalDocs) * 100;

  useEffect(() => {
    // Reset acceptance checkbox when document changes
    setIsAccepted(false);
  }, [currentDocIndex]);

  const logAcceptance = (document) => {
    const identityNo = localStorage.getItem('identityNo');
    const timestamp = new Date().toISOString();
    
    const logEntry = {
      identityNo,
      filename: document.filename,
      title: document.title,
      acceptedAt: timestamp,
      userAgent: navigator.userAgent,
      ipAddress: 'client-side', // Will be updated when API is implemented
    };

    // Use the service method that automatically saves to JSON file
    return termsService.addLogEntry(logEntry);
  };

  const handleAccept = () => {
    if (!isAccepted) return;

    // Log the acceptance
    logAcceptance(currentDoc);

    // Mark current document as accepted
    const newAcceptedDocs = {
      ...acceptedDocs,
      [currentDoc.filename]: true
    };
    setAcceptedDocs(newAcceptedDocs);

    // Move to next document or complete
    if (currentDocIndex < documents.length - 1) {
      setCurrentDocIndex(currentDocIndex + 1);
    } else {
      // All documents accepted, mark user as completed
      const identityNo = localStorage.getItem('identityNo');
      const completionData = {
        identityNo,
        completedAt: new Date().toISOString(),
        documentsAccepted: documents.map(doc => doc.filename),
        totalDocuments: documents.length
      };
      
      localStorage.setItem('termsAcceptanceCompleted', JSON.stringify(completionData));
      localStorage.setItem(`termsCompleted_${identityNo}`, 'true');
      
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentDocIndex > 0) {
      setCurrentDocIndex(currentDocIndex - 1);
    }
  };

  const getAcceptedCount = () => {
    return Object.keys(acceptedDocs).length;
  };

  return (
    <StyledDialog
      open={open}
      maxWidth={false}
      disableEscapeKeyDown
      // Prevent closing by clicking outside
      disableBackdropClick
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            Terms & Policy Acceptance
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Document {currentDocIndex + 1} of {totalDocs}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Progress Indicator */}
        <ProgressContainer>
          <Box width="100%" mr={1}>
            <LinearProgress 
              variant="determinate" 
              value={progressPercent} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">
              {Math.round(progressPercent)}%
            </Typography>
          </Box>
        </ProgressContainer>

        {/* Document Info */}
        <DocumentHeader>
          <PictureAsPdfIcon color="primary" sx={{ mr: 1 }} />
          <Box flex="1">
            <Typography variant="h6">{currentDoc.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {currentDoc.description}
            </Typography>
          </Box>
          {acceptedDocs[currentDoc.filename] && (
            <CheckCircleIcon color="success" />
          )}
        </DocumentHeader>

        {/* PDF Viewer */}
        <Box mb={2}>
          <PdfViewer
            src={currentDoc.path}
            title={currentDoc.title}
          />
        </Box>

        {/* Acceptance Checkbox */}
        <Paper elevation={1} sx={{ p: 2, backgroundColor: 'grey.50' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                sx={{
                  color: '#1976d2',
                  '&.Mui-checked': {
                    color: '#1976d2',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 24,
                  }
                }}
              />
            }
            label={
              <Typography variant="body1">
                I have read and understood the <strong>{currentDoc.title}</strong> document 
                and agree to comply with all the terms and policies mentioned therein.
              </Typography>
            }
          />
        </Paper>

        {/* Progress Summary */}
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary" align="center">
            Documents accepted: {getAcceptedCount()} / {totalDocs}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
        <Button
          onClick={handlePrevious}
          disabled={currentDocIndex === 0}
          variant="outlined"
        >
          Previous
        </Button>
        
        <Box>
          <Button
            onClick={handleAccept}
            disabled={!isAccepted}
            variant="contained"
            size="large"
            sx={{
              backgroundColor: isAccepted ? '#1976d2' : '#ccc',
              color: '#ffffff',
              fontWeight: 'bold',
              padding: '12px 32px',
              '&:hover': {
                backgroundColor: isAccepted ? '#1565c0' : '#ccc',
              },
              '&:disabled': {
                backgroundColor: '#e0e0e0',
                color: '#9e9e9e',
              }
            }}
          >
            {currentDocIndex === documents.length - 1 ? 'Complete & Continue' : 'Accept & Next'}
          </Button>
        </Box>
      </DialogActions>
    </StyledDialog>
  );
};

export default TermsPolicyModal;
