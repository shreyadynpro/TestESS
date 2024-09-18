import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  styled,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PolicyIcon from '@mui/icons-material/Policy';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArticleIcon from '@mui/icons-material/Article';
import GetAppIcon from '@mui/icons-material/GetApp'; // Icon for download
import axios from 'axios';
import commonConfig from '../commonConfig';
import { getAccessToken } from 'app/utils/utils';
import DownloadAllIcon from '@mui/icons-material/CloudDownload';

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  color: '#59919d',
  fontWeight: 'bold !important',
  fontSize: '22px !important',
}));

const sections = [
  {
    title: 'Company Policy',
    icon: <PolicyIcon />,
    description: 'Policies and regulations.',
    bgColor: '#ffebee',
    category: 'CompanyPolicy',
  },
  {
    title: 'Form16',
    icon: <DescriptionIcon />,
    description: 'Annual tax documents.',
    bgColor: '#f3e5f5',
    category: 'Form16',
  },
  {
    title: 'Payslip',
    icon: <AccountBalanceIcon />,
    description: 'Monthly salary breakdown.',
    bgColor: '#e8f5e9',
    category: 'Payslip',
  },
  {
    title: 'IT Declaration',
    icon: <ArticleIcon />,
    description: 'Income tax declaration.',
    bgColor: '#fff3e0',
    category: 'ITDeclaration',
  },
];

const DocumentCenter = () => {
  const [open, setOpen] = useState(false);
  const [payslipOpen, setPayslipOpen] = useState(false); // New state for Payslip dialog
  const [selectedSection, setSelectedSection] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [payslipData, setPayslipData] = useState([]); // New state for Payslip data
  const authToken = getAccessToken();
  const [loading, setLoading] = useState(false);

  // Fetch data for other sections
  const fetchData = async (sectionTitle) => {
    try {
      setLoading(true);
      const response = await axios.get(commonConfig.urls.docs + '/' + sectionTitle, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response && response.data && response.data.Response) {
        setDocuments(response.data.Response); // Bind documents to state
      }
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!');
    }
  };

  // Fetch Payslip data
  const fetchPayslipData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(commonConfig.urls.getMonths, {
        // Replace with the new Payslip API
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response && response.data && response.data.Response) {
        setPayslipData(response.data.Response); // Bind Payslip data to state
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching Payslip data:', error);
    }
  };

  const handleOpenDialog = (section) => {
    setSelectedSection(section);
    if (section.category === 'Payslip') {
      fetchPayslipData(); // Fetch Payslip data
      setPayslipOpen(true); // Open Payslip dialog
    } else {
      fetchData(section.category); // Fetch other section documents
      setOpen(true); // Open the regular dialog
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedSection(null);
  };

  const handleClosePayslipDialog = () => {
    setPayslipOpen(false);
  };

  // Function to handle document download
  const handleDownload = async (doc_id, name) => {
    try {
      const response = await axios.get(commonConfig.urls.docs_download + '/' + doc_id, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob', // Important to handle binary data
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}.pdf`); // Use a dynamic filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  };
  //Download Payslip
  const downloadPayslip = async (payslipname) => {
    const splitname = payslipname.split(' ');
    try {
      const response = await axios.get(
        commonConfig.urls.generatePayslipPdf + '/' + splitname[0] + '/' + splitname[1],
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Important to handle binary data
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${payslipname}.pdf`); // Use a dynamic filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  };

  // Function to download all payslips
  const downloadAllPayslips = async () => {
    try {
      const payslipMonths = payslipData.map((payslip) => payslip.month_year);
      const response = await axios.post(
        commonConfig.urls.generatePayslipZip, // API for downloading all payslips
        { payslipmonths: payslipMonths },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Important to handle binary data
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `All_Payslips.zip`); // Download as a zip file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading all payslips:', error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#00246b', fontWeight: 'bold' }}
      >
        Document Center
      </Typography>
      <Grid container spacing={3}>
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: section.bgColor }}
              onClick={() => handleOpenDialog(section)}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center' }}>
                  <IconButton sx={{ fontSize: 60, color: '#00246b' }}>{section.icon}</IconButton>
                  <Typography variant="h6" sx={{ color: '#00246b', fontWeight: 'bold' }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#757575' }}>
                    {section.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for viewing other documents */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: '#00246b', fontWeight: 'bold' }}>
          {selectedSection?.title}
        </DialogTitle>
        <hr style={{ border: '1px solid #00246b', margin: '8px 0' }} />
        <DialogContent>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <List>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <ListItem key={index}>
                    <StyledListItemText primary={doc.doc_name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleDownload(doc.id, doc.doc_name)}
                        sx={{ color: '#00246b' }}
                      >
                        <GetAppIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <Typography>No documents available</Typography>
              )}
            </List>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog for viewing Payslips */}
      <Dialog open={payslipOpen} onClose={handleClosePayslipDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: '#00246b', fontWeight: 'bold' }}>
          Payslip List
          <IconButton
            onClick={downloadAllPayslips}
            sx={{ position: 'absolute', right: 16, top: 16, color: '#00246b' }}
          >
            <DownloadAllIcon />
          </IconButton>
        </DialogTitle>
        <hr style={{ border: '1px solid #00246b', margin: '8px 0' }} />
        <DialogContent>
          {loading ? (
            <Typography>Loading Payslips...</Typography>
          ) : (
            <List>
              {payslipData.length > 0 ? (
                payslipData.map((payslip, index) => (
                  <ListItem key={index}>
                    <StyledListItemText primary={payslip.month_year} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => downloadPayslip(payslip.month_year)}
                        sx={{ color: '#00246b' }}
                      >
                        <GetAppIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <Typography>No Payslips available</Typography>
              )}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DocumentCenter;
