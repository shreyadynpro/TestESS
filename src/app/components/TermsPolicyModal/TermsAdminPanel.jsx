import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadIcon from '@mui/icons-material/Upload';
import SaveIcon from '@mui/icons-material/Save';
import { termsService } from './termsService';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const TermsAdminPanel = () => {
  const [logs, setLogs] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [internalJsonData, setInternalJsonData] = useState({});
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetUserPan, setResetUserPan] = useState('');
  const [showLogsDialog, setShowLogsDialog] = useState(false);
  const [selectedUserLogs, setSelectedUserLogs] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  const loadData = () => {
    setLogs(termsService.getAllAcceptanceLogs());
    setStatistics(termsService.getAcceptanceStatistics());
    setInternalJsonData(termsService.getInternalJSONData());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExportLogs = () => {
    const jsonData = termsService.exportLogsAsJson();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `terms-acceptance-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetUser = () => {
    if (resetUserPan.trim()) {
      termsService.resetUserTerms(resetUserPan.trim());
      setShowResetDialog(false);
      setResetUserPan('');
      loadData();
      alert(`Terms reset for user: ${resetUserPan.trim()}`);
    }
  };

  const handleViewUserLogs = (identityNo) => {
    const userLogs = logs.filter(log => log.identityNo === identityNo);
    setSelectedUserLogs(userLogs);
    setShowLogsDialog(true);
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear ALL terms data? This action cannot be undone.')) {
      termsService.clearAllTermsData();
      loadData();
      alert('All terms data cleared successfully');
    }
  };

  const handleSaveToJSONFile = () => {
    termsService.saveLogsToJSONFile();
    setUploadStatus('JSON file saved successfully!');
    setTimeout(() => setUploadStatus(''), 3000);
  };

  const handleLoadFromJSONFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      termsService.loadLogsFromJSONFile(file).then(success => {
        if (success) {
          setUploadStatus('JSON file loaded successfully!');
          loadData();
        } else {
          setUploadStatus('Error loading JSON file. Please check the file format.');
        }
        setTimeout(() => setUploadStatus(''), 3000);
      });
    }
    // Reset file input
    event.target.value = '';
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Terms & Policy Administration
      </Typography>

      {/* Statistics */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Statistics
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {statistics.totalUsers || 0}
                </Typography>
                <Typography variant="body2">Total Users</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="secondary">
                  {statistics.totalAcceptances || 0}
                </Typography>
                <Typography variant="body2">Total Acceptances</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Document Acceptance Count
                </Typography>
                {Object.entries(statistics.documentsAccepted || {}).map(([filename, count]) => (
                  <Box key={filename} display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" noWrap>
                      {filename.replace('.pdf', '')}
                    </Typography>
                    <Chip label={count} size="small" />
                  </Box>
                ))}
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Internal JSON File Status
                </Typography>
                <Box mb={1}>
                  <Typography variant="body2">
                    <strong>Last Updated:</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {internalJsonData.lastUpdated 
                      ? new Date(internalJsonData.lastUpdated).toLocaleString() 
                      : 'Never'}
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography variant="body2">
                    <strong>Internal Entries:</strong> {internalJsonData.totalEntries || 0}
                  </Typography>
                </Box>
                <Chip 
                  label={internalJsonData.lastUpdated ? 'Active' : 'No Data'} 
                  color={internalJsonData.lastUpdated ? 'success' : 'default'}
                  size="small" 
                />
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      {/* Actions */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Actions
          </Typography>
          
          {uploadStatus && (
            <Alert severity="info" sx={{ mb: 2 }}>
              {uploadStatus}
            </Alert>
          )}
          
          <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={loadData}
            >
              Refresh Data
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleExportLogs}
            >
              Export Logs
            </Button>
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={handleSaveToJSONFile}
              color="primary"
            >
              Export for Download
            </Button>
          </Box>
          
          <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
            <input
              accept=".json"
              style={{ display: 'none' }}
              id="json-file-upload"
              type="file"
              onChange={handleLoadFromJSONFile}
            />
            <label htmlFor="json-file-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<UploadIcon />}
                color="secondary"
              >
                Load from JSON File
              </Button>
            </label>
            
            <Button
              variant="outlined"
              color="warning"
              onClick={() => setShowResetDialog(true)}
            >
              Reset User Terms
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleClearAllData}
            >
              Clear All Data
            </Button>
          </Box>
        </CardContent>
      </StyledCard>

      {/* User Completion Status */}
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Completion Status
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Identity No (PAN)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Documents Accepted</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(statistics.userCompletionStatus || {}).map(([identityNo, isCompleted]) => {
                  const userLogs = logs.filter(log => log.identityNo === identityNo);
                  return (
                    <TableRow key={identityNo}>
                      <TableCell>{identityNo}</TableCell>
                      <TableCell>
                        <Chip
                          label={isCompleted ? 'Completed' : 'Pending'}
                          color={isCompleted ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{userLogs.length}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleViewUserLogs(identityNo)}
                        >
                          View Logs
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </StyledCard>

      {/* Reset User Dialog */}
      <Dialog open={showResetDialog} onClose={() => setShowResetDialog(false)}>
        <DialogTitle>Reset User Terms</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            This will clear all terms acceptance data for the specified user.
          </Alert>
          <TextField
            fullWidth
            label="User Identity No (PAN)"
            value={resetUserPan}
            onChange={(e) => setResetUserPan(e.target.value)}
            placeholder="Enter user's PAN number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowResetDialog(false)}>Cancel</Button>
          <Button onClick={handleResetUser} color="warning" variant="contained">
            Reset User Terms
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Logs Dialog */}
      <Dialog open={showLogsDialog} onClose={() => setShowLogsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>User Acceptance Logs</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document</TableCell>
                  <TableCell>Accepted At</TableCell>
                  <TableCell>User Agent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedUserLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.filename}</TableCell>
                    <TableCell>
                      {new Date(log.acceptedAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap>
                        {log.userAgent.substring(0, 50)}...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TermsAdminPanel;
