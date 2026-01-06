import React, { useState, useEffect, useReducer } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CardActions,
  Button,
} from '@mui/material';

import GetAppIcon from '@mui/icons-material/GetApp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import commonConfig from '../commonConfig';
import { getAccessToken } from 'app/utils/utils';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadIcon from '@mui/icons-material/Upload';
import UploadITRDialog from '../DocumentCenter/UploadITRDialog';
import UploadITProofDialog from '../DocumentCenter/UploadITProofDialog';
import UploadNDADialog from '../DocumentCenter/UploadNDADialog';
import SnackbarUtils from 'SnackbarUtils';
import commonRoutes from '../commonRoutes';
import { uploadSignedNDA, getSignedNDA } from 'app/api/uploadNDA';

const DocumentCenter = () => {
  const [documents, setDocuments] = useState([]);
  const authToken = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const navigate = useNavigate();
  const roleId = localStorage.getItem('roleId');

  // Appointment letter state
  const [appointmentLetter, setAppointmentLetter] = useState(null);
  const [appointmentLetterLoading, setAppointmentLetterLoading] = useState(false);
  const [hasAppointmentLetter, setHasAppointmentLetter] = useState(false);

  // NDA upload state - only initialize for users with permission
  const hasNDAPermission = [3, 7, 9, 10, 11].includes(Number(roleId));
  const [openNDADialog, setOpenNDADialog] = useState(false);
  const [ndaUploading, setNdaUploading] = useState(false);
  const [signedNDADocuments, setSignedNDADocuments] = useState([]);
  const [signedNDALoading, setSignedNDALoading] = useState(false);

  const initialITRData = {
    fy: '2024-2025',
    attachment: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SEARCHED':
        return { ...state, searched: action.newVal };
      case 'PAGE_CHANGED':
        return { ...state, page: action.no };
      case 'DATA_CHANGED':
        return { ...state, data: [...action.newData] };
      case 'OPEN':
        return { ...state, open: action.bool };
      case 'LOADING':
        return { ...state, loading: action.bool };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    searched: '',
    page: 0,
    data: [],
    open: false,
    loading: false,
  });

  const [itrData, setItrData] = useState(initialITRData);
  const [hasITR, setHasITR] = useState(true);
  const [HasITProof, setHasITProof] = useState(true);
  const [hasDOC, setHasDoc] = useState(false);

  // Role-based visibility for NDA: Only show for specific roles (3, 7, 9, 10, 11)
  const allowedDocsByRole =
    roleId === '9'
      ? [
          'DynPro Code of Ethics & Business Conduct',
          'HIPAA Security Awareness & Training',
          'Vendor Guidelines/Policies',
          'POSH-Awareness & Education',
          'CRM4-NDA-v24',
        ]
      : roleId === '10' || roleId === '11'
      ? ['DynPro Code of Ethics & Business Conduct', 'HIPAA Security Awareness & Training']
      : null;

  // Fetch appointment letter when component mounts (for all users)
  useEffect(() => {
    fetchAppointmentLetter();
  }, []);
  const allowedDocsSet = allowedDocsByRole
    ? new Set(allowedDocsByRole.map((s) => s.toLowerCase().trim()))
    : null;
  const displayedDocuments = allowedDocsSet
    ? Array.isArray(documents)
      ? documents.filter((doc) =>
          allowedDocsSet.has(
            String(doc?.doc_name || '')
              .toLowerCase()
              .trim()
          )
        )
      : []
    : documents;

  // Fetch appointment letter details
  const fetchAppointmentLetter = async () => {
    try {
      setAppointmentLetterLoading(true);

      const accessToken = localStorage.getItem('accessToken');
      const identityNo = localStorage.getItem('identityNo');

      if (!accessToken || !identityNo) {
        console.error('Access token or identity number not found in localStorage');
        setAppointmentLetterLoading(false);
        return;
      }

      const response = await axios.get(
        `https://ess.dynprocloud.com:8443/api/docs_appointment/${identityNo}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setAppointmentLetterLoading(false);

      if (response && response.data && response.data.status === 200) {
        setAppointmentLetter(response.data);
        setHasAppointmentLetter(true);
      } else {
        setHasAppointmentLetter(false);
      }
    } catch (error) {
      setAppointmentLetterLoading(false);
      console.error(
        'Error fetching appointment letter:',
        error?.message || 'Something went wrong!'
      );
      setHasAppointmentLetter(false);
    }
  };

  // Download appointment letter via direct URL
  const handleAppointmentLetterDownload = () => {
    try {
      if (appointmentLetter && appointmentLetter.file_url) {
        const link = document.createElement('a');
        link.href = appointmentLetter.file_url;
        link.setAttribute('download', appointmentLetter.file_name || 'Appointment_Letter.docx');
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        SnackbarUtils.error('Appointment letter not available');
      }
    } catch (error) {
      console.error('Error downloading appointment letter:', error);
      SnackbarUtils.error('Failed to download appointment letter');
    }
  };

  const fetchData = async (sectionTitle) => {
    try {
      setLoading(true);
      const response = await axios.get(commonConfig.urls.docs + '/' + sectionTitle, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response && response.data && response.data.Response) {
        if (response.data.Response.length > 0) {
          setHasDoc(true);
        }
        setLoading(false);

        const response1 = await axios.get(commonConfig.urls.getitrlist, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response1 && response1.data && response1.data.Response) {
          if (response1.data.Response.length > 0) {
            setHasITR(false);
          }
        }

        setDocuments(response.data.Response);

        const response2 = await axios.get(commonConfig.urls.itproofcheck, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response2 && response2.data && response2.data.Response) {
          if (response2.data.Response.length > 0) {
            setHasITProof(false);
          }
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!');
    }
  };

  const getitrdata = async () => {
    try {
      setLoading(true);
      const response = await axios.get(commonConfig.urls.getitrlist, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response && response.data && response.data.Response) {
        if (response.data.Response.length > 0) {
          setHasITR(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!');
    }
  };

  // Fetch signed NDA documents
  const fetchSignedNDA = async () => {
    try {
      setSignedNDALoading(true);
      const response = await getSignedNDA();

      if (response.error) {
        console.error('Error fetching signed NDA:', response.error);
        setSignedNDADocuments([]);
      } else if (response.status === 200 && response.file_url) {
        // API returns a single document object with file_url and file_name
        const document = {
          name: response.file_name,
          filename: response.file_name,
          url: response.file_url,
          file_url: response.file_url,
          uploadedAt: 'Recently uploaded',
        };
        setSignedNDADocuments([document]);
      } else {
        // No signed NDA found
        setSignedNDADocuments([]);
      }
    } catch (error) {
      console.error('Error fetching signed NDA:', error);
      setSignedNDADocuments([]);
    } finally {
      setSignedNDALoading(false);
    }
  };

  // Handle NDA upload
  const handleNDAUpload = async (file) => {
    try {
      setNdaUploading(true);
      const response = await uploadSignedNDA(file);

      console.log('Upload response:', response); // Debug log

      if (response.error) {
        SnackbarUtils.error(response.error);
      } else if (response.Status === 'Success' || response.status === 200) {
        SnackbarUtils.success('NDA uploaded successfully!');
        setOpenNDADialog(false);
        // Refresh signed NDA documents after successful upload
        await fetchSignedNDA();
      } else {
        SnackbarUtils.error(response.Message || 'Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading NDA:', error);
      SnackbarUtils.error('Failed to upload NDA. Please try again.');
    } finally {
      setNdaUploading(false);
    }
  };

  // Handle opening NDA upload dialog
  const handleOpenNDADialog = () => {
    setOpenNDADialog(true);
  };

  // Handle closing NDA upload dialog
  const handleCloseNDADialog = () => {
    if (!ndaUploading) {
      setOpenNDADialog(false);
    }
  };

  useEffect(() => {
    fetchData('CompanyPolicy');
    fetchAppointmentLetter();
    fetchSignedNDA();
  }, []);

  const handlePreview = async (doc_id, name) => {
    try {
      const response = await axios.get(commonConfig.urls.docs_download + '/' + doc_id, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const { file_url } = response.data;
        window.open(file_url, '_blank');
      } else {
        console.error('Failed to generate the document preview.');
      }
    } catch (error) {
      console.error('Error previewing the document:', error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(commonConfig.urls.itr_template_download, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `IT Declaration FY 2025-26.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  };

  const downloadSubmittedITR = async () => {
    try {
      const response = await axios.get(commonConfig.urls.getitr, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `IT_Declaration_24_25.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setItrData((prevData) => ({
      ...prevData,
      attachment: file,
    }));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog1 = () => {
    setOpenDialog1(true);
  };

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
  };

  const handleSubmitITR = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fy', itrData.fy);

    if (itrData.attachment) {
      formData.append('attachment', itrData.attachment);
    }

    try {
      setLoading(true);
      const response = await axios.post(commonConfig.urls.uploadITR, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false);
      if (response && response.data.Status === 'Failed') {
        SnackbarUtils.error(
          Object.values(response.data.Errors)
            .map((item) => item.toString())
            .toString()
        );
      } else if (response && response.data.Status === 'Success') {
        SnackbarUtils.success('IT declaration Submitted successfully');
        handleCloseDialog();
        fetchData('CompanyPolicy');
      } else {
        SnackbarUtils.error('Something went wrong!!');
      }
    } catch (error) {
      dispatch({ type: 'LOADING', bool: false });
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
    }
  };

  const getFinancialYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JS

    if (currentMonth < 4) {
      return `${currentYear - 1}-${currentYear}`;
    } else {
      return `${currentYear}-${currentYear + 1}`;
    }
  };

  const handleSubmitITProof = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fy', getFinancialYear());
    if (itrData.attachment) {
      formData.append('attachment', itrData.attachment);
    }

    try {
      setLoading(true);
      const response = await axios.post(commonConfig.urls.uploadITProof, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false);
      if (response && response.data.Status === 'Failed') {
        SnackbarUtils.error(
          Object.values(response.data.Errors)
            .map((item) => item.toString())
            .toString()
        );
      } else if (response && response.data.Status === 'Success') {
        SnackbarUtils.success('IT Proof Submitted successfully');
        handleCloseDialog1();
        fetchData('CompanyPolicy');
      } else {
        SnackbarUtils.error('Something went wrong!!');
      }
    } catch (error) {
      dispatch({ type: 'LOADING', bool: false });
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ color: '#cb8b59', fontWeight: 'bold' }}>
          Document Center
        </Typography>
        {hasNDAPermission && (
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={handleOpenNDADialog}
            sx={{
              backgroundColor: '#00246b',
              '&:hover': {
                backgroundColor: '#001a4d',
              },
            }}
          >
            Upload NDA
          </Button>
        )}
      </Box>
      {/* Appointment Letter Section - visible for all users */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: '#00246b', fontWeight: 'bold', mb: 2 }}>
          Appointment Letter
        </Typography>
        {appointmentLetterLoading ? (
          <Typography>Loading appointment letter...</Typography>
        ) : hasAppointmentLetter ? (
          <Grid container spacing={2} justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  border: '1px solid #59919d',
                  borderRadius: '8px',
                  boxShadow: 3,
                  height: '80%',
                }}
              >
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Appointment Letter"
                        secondary={appointmentLetter?.file_name || 'View your appointment letter'}
                        sx={{ color: '#59919d', fontWeight: '400 !important' }}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Download">
                          <IconButton
                            edge="end"
                            onClick={handleAppointmentLetterDownload}
                            sx={{ color: '#00246b' }}
                          >
                            <GetAppIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Typography>No appointment letter available</Typography>
        )}
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#00246b', fontWeight: 'bold', mb: 2 }}>
              Company Policies
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {displayedDocuments.map((doc, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      border: '1px solid #59919d',
                      borderRadius: '8px',
                      boxShadow: 3,
                      height: '80%',
                    }}
                  >
                    <CardContent>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary={doc.doc_name}
                            sx={{ color: '#59919d', fontWeight: '400 !important' }}
                          />
                          <ListItemSecondaryAction>
                            <Tooltip title="View">
                              <IconButton
                                edge="end"
                                onClick={() => handlePreview(doc.id, doc.doc_name)}
                                sx={{ color: '#59919d' }}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Grid>
              ))}
              {!hasDOC && (
                <Typography sx={{ mt: 1 }}>No company policy documents available</Typography>
              )}
            </Grid>
          </Box>
        </>
      )}
      {/* Signed NDA Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: '#00246b', fontWeight: 'bold', mb: 2 }}>
          Signed NDA
        </Typography>
        {signedNDALoading ? (
          <Typography>Loading signed NDA documents...</Typography>
        ) : signedNDADocuments.length > 0 ? (
          <Grid container spacing={2} justifyContent="flex-start">
            {signedNDADocuments.map((doc, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    border: '1px solid #59919d',
                    borderRadius: '8px',
                    boxShadow: 3,
                    height: '80%',
                  }}
                >
                  <CardContent>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={doc.name || doc.filename || 'Signed NDA Document'}
                          secondary={doc.uploadedAt || doc.created_at || 'Recently uploaded'}
                          sx={{ color: '#59919d', fontWeight: '400 !important' }}
                        />
                        <ListItemSecondaryAction>
                          <Tooltip title="View">
                            <IconButton
                              edge="end"
                              onClick={() => window.open(doc.url || doc.file_url, '_blank')}
                              sx={{ color: '#59919d' }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ mt: 1 }}>No signed NDA documents available</Typography>
        )}
      </Box>
      {/* IT Declaration section - visible for all users */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#00246b', fontWeight: 'bold', mb: 2 }}>
          IT Declaration
        </Typography>
        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item xs={12} sm={4} md={3}>
            <Card
              sx={{
                border: '1px solid #59919d',
                borderRadius: '8px',
                boxShadow: 3,
                height: '80%',
              }}
            >
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Download FY 25-26 IT Declaration Template"
                      sx={{ color: '#59919d', fontWeight: '400 !important' }}
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Download Template">
                        <IconButton edge="end" sx={{ color: '#00246b' }} onClick={handleDownload}>
                          <GetAppIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          {hasITR && (
            <Grid item xs={12} sm={4} md={3}>
              <Card
                sx={{
                  border: '1px solid #59919d',
                  borderRadius: '8px',
                  boxShadow: 3,
                  height: '80%',
                }}
              >
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Upload Filled IT Declaration"
                        sx={{ color: '#59919d', fontWeight: '400 !important' }}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Upload IT Declaration">
                          <IconButton
                            edge="end"
                            onClick={handleOpenDialog}
                            sx={{ color: '#00246b' }}
                          >
                            <UploadIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          )}
          {HasITProof && (
            <Grid item xs={12} sm={4} md={3}>
              <Card
                sx={{
                  border: '1px solid #59919d',
                  borderRadius: '8px',
                  boxShadow: 3,
                  height: '80%',
                }}
              >
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Upload IT Proof"
                        sx={{ color: '#59919d', fontWeight: '400 !important' }}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Upload IT Proof">
                          <IconButton
                            edge="end"
                            onClick={handleOpenDialog1}
                            sx={{ color: '#00246b' }}
                          >
                            <UploadIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
      <UploadITRDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitITR}
        itrData={itrData}
        onFileChange={handleFileChange}
      />
      <UploadITProofDialog
        open={openDialog1}
        onClose={handleCloseDialog1}
        onSubmit={handleSubmitITProof}
        itrData={itrData}
        onFileChange={handleFileChange}
      />
      {hasNDAPermission && (
        <UploadNDADialog
          open={openNDADialog}
          onClose={handleCloseNDADialog}
          onSubmit={handleNDAUpload}
          loading={ndaUploading}
          userRole={roleId}
        />
      )}
    </Box>
  );
};

export default DocumentCenter;
