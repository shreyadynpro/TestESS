import React, { useState } from 'react';
import { Button, Box, Typography, Card, CardContent, Alert } from '@mui/material';
import { TermsPolicyModal, termsService } from './index';

/**
 * Test component for Terms & Policy Modal
 * This can be used for development/testing purposes
 */
const TermsTestComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('');

  const checkStatus = () => {
    const identityNo = localStorage.getItem('identityNo');
    const isRequired = termsService.isTermsAcceptanceRequired();
    const hasCompleted = termsService.hasUserCompletedTerms(identityNo);
    const logs = termsService.getUserAcceptanceLogs();
    
    setStatus(`
      Identity No: ${identityNo || 'Not found'}
      Terms Required: ${isRequired ? 'Yes' : 'No'}
      Has Completed: ${hasCompleted ? 'Yes' : 'No'}
      Acceptance Logs: ${logs.length} entries
    `);
  };

  const resetCurrentUser = () => {
    const identityNo = localStorage.getItem('identityNo');
    if (identityNo) {
      termsService.resetUserTerms(identityNo);
      alert('Current user terms reset successfully');
      checkStatus();
    } else {
      alert('No identity number found');
    }
  };

  const simulateUser = (panNumber) => {
    localStorage.setItem('identityNo', panNumber);
    alert(`Simulating user with PAN: ${panNumber}`);
    checkStatus();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Terms & Policy Test Component
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        This component is for development/testing purposes only.
      </Alert>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Actions
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
            <Button variant="contained" onClick={() => setShowModal(true)}>
              Show Terms Modal
            </Button>
            <Button variant="outlined" onClick={checkStatus}>
              Check Status
            </Button>
            <Button variant="outlined" color="warning" onClick={resetCurrentUser}>
              Reset Current User
            </Button>
            <Button variant="outlined" color="primary" onClick={() => termsService.saveLogsToJSONFile()}>
              Save Logs to JSON
            </Button>
          </Box>

          <Typography variant="h6" gutterBottom>
            Simulate Different Users
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
            <Button variant="outlined" onClick={() => simulateUser('ABCDE1234F')}>
              User 1 (ABCDE1234F)
            </Button>
            <Button variant="outlined" onClick={() => simulateUser('FGHIJ5678K')}>
              User 2 (FGHIJ5678K)
            </Button>
            <Button variant="outlined" onClick={() => simulateUser('LMNOP9012Q')}>
              User 3 (LMNOP9012Q)
            </Button>
          </Box>

          {status && (
            <Box mt={2}>
              <Typography variant="subtitle1">Status:</Typography>
              <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
                {status}
              </pre>
            </Box>
          )}
        </CardContent>
      </Card>

      <TermsPolicyModal
        open={showModal}
        onComplete={() => {
          setShowModal(false);
          alert('Terms completed!');
          checkStatus();
        }}
      />
    </Box>
  );
};

export default TermsTestComponent;
