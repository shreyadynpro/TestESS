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
} from '@mui/material';

import GetAppIcon from '@mui/icons-material/GetApp';
import axios from 'axios';
import commonConfig from '../commonConfig';
import { getAccessToken } from 'app/utils/utils';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadIcon from '@mui/icons-material/Upload';
import UploadITRDialog from '../DocumentCenter/UploadITRDialog';
import UploadITProofDialog from '../DocumentCenter/UploadITProofDialog';
import SnackbarUtils from 'SnackbarUtils';

const DocumentCenter = () => {
  const [documents, setDocuments] = useState([]);
  const authToken = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);

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
          // Check if ITR data exists
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
          // Check if ITR data exists
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
        // Check if ITR data exists
        if (response.data.Response.length > 0) {
          setHasITR(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!');
    }
  };

  useEffect(() => {
    fetchData('CompanyPolicy');
  }, []);
  useEffect(() => {
    console.log('hasITR state changed:', hasITR);
    console.log('HasITProof state changed:', HasITProof);
    console.log('hasDOC state changed:', hasDOC);
  }, [hasITR, HasITProof, hasDOC]);
  const handlePreview = async (doc_id, name) => {
    try {
      const response = await axios.get(commonConfig.urls.docs_download + '/' + doc_id, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Get the presigned URL from the response
        const { file_url } = response.data;

        // Open the document in a new tab
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
      link.setAttribute('download', `IT Declaration FY 2024-25.xlsx`);
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

    // Financial year starts in April. If before April, it belongs to the previous FY.
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
    console.log('=======', formData);
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
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ color: '#cb8b59', fontWeight: 'bold', mb: 3 }}
      >
        Document Center
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {hasDOC ? (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#00246b', fontWeight: 'bold', mb: 2 }}>
                Company Policies
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {documents.map((doc, index) => (
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
              </Grid>
            </Box>
          ) : (
            <Typography>No documents available</Typography>
          )}
        </>
      )}

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#00246b', fontWeight: 'bold', mb: 2 }}>
          IT Declaration
        </Typography>
        <Grid container spacing={2} justifyContent="center">
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
                      primary="Download FY 24-25 IT Declaration Template"
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
          {/* {hasITR && (
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
                        primary="Download Filled IT Declaration"
                        sx={{ color: '#59919d', fontWeight: '400 !important' }}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Upload IT Declaration">
                          <IconButton
                            edge="end"
                            onClick={downloadSubmittedITR}
                            sx={{ color: '#00246b' }}
                          >
                            <GetAppIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          )} */}
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
        onSubmit={handleSubmitITR} // This is where you're handling the form submission
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
    </Box>
  );
};

export default DocumentCenter;
