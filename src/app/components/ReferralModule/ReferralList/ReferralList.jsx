import { Box, Button, Grid, styled, Tooltip } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import commonRoutes from 'app/components/commonRoutes';
import AppTableSearchBox from 'app/components/ReusableComponents/AppTableSearchBox';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import commonConfig from '../../commonConfig';
import PaginationTable from './AppPaginateReferral';
import SnackbarUtils from 'SnackbarUtils';
import ReferralDialog from './ReferralDialog';

// StyledButton definition
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.info.main,
  marginTop: 0,
}));

// Container definition
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

// Reducer function for managing multiple states
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

const ReferralList = () => {
  const [state, dispatch] = useReducer(reducer, {
    searched: '',
    page: 0,
    data: [],
    open: false,
    loading: false,
  });

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [searched, setSearched] = useState('');
  const [openDialog, setOpenDialog] = useState(false); // <-- Add state to manage the dialog open/close
  const initialReferralData = {
    full_name: '',
    email: '',
    contact_no: '',
    skills: '',
    experience: '',
    pan: '',
    current_location: '',
    attachment: null, // Assuming you have a file upload field
  };
  const [referralData, setReferralData] = useState(initialReferralData);
  const navigate = useNavigate();
  const authToken = getAccessToken();
  const user = useSelector((state) => state.userDetails?.user);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setReferralData(initialReferralData);
    setOpenDialog(false);
  };

  // Search function for filtering data
  const requestSearch = (searchedVal) =>
    state.data.filter((row) => {
      return (
        row.full_name +
        ' ' +
        row.pan +
        ' ' +
        row.email +
        ' ' +
        row.contact_no +
        ' ' +
        row.skills
      )
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });

  const getReferral = async () => {
    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getReferralProfile, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response?.data?.Response) {
        dispatch({ type: 'DATA_CHANGED', newData: response.data.Response });
      }
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!!');
    }
  };

  useEffect(() => {
    getReferral();
  }, []);

  // Search handler
  const handleSearch = (e) => {
    setSearched(e.currentTarget.value);
    if (searched) {
      dispatch({ type: 'SEARCHED', newVal: e.currentTarget.value });
      requestSearch(searched);
    }
  };
  const handleReferralChange = (e) => {
    const { name, value } = e.target;
    setReferralData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReferralData((prevData) => ({
      ...prevData,
      attachment: file, // Store the file in referralData
    }));
  };

  const handleSubmitReferral = async (e) => {
    e.preventDefault();
    const { full_name, email, contact_no, pan } = referralData;
    // Validate PAN (e.g., Indian PAN format)
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panPattern.test(pan)) {
      SnackbarUtils.error('Invalid PAN format. Please enter a valid PAN.');
      return;
    }

    // Validate Email using regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      SnackbarUtils.error('Invalid Email format. Please enter a valid email.');
      return;
    }

    // Validate Contact No (should be a valid 10-digit number)
    const contactPattern = /^[0-9]{10}$/;
    if (!contactPattern.test(contact_no)) {
      SnackbarUtils.error('Invalid Contact No. Please enter a valid 10-digit phone number.');
      return;
    }

    const authToken = getAccessToken();

    // Create a new FormData object
    const formData = new FormData();

    // Append all the text fields from referralData to formData
    formData.append('full_name', referralData.full_name);
    formData.append('email', referralData.email);
    formData.append('contact_no', referralData.contact_no);
    formData.append('skills', referralData.skills);
    formData.append('experience', referralData.experience);
    formData.append('pan', referralData.pan);
    formData.append('current_location', referralData.current_location);

    // Append the file (if there is any)
    if (referralData.attachment) {
      formData.append('attachment', referralData.attachment); // Name must match what the server expects
    }

    try {
      setLoading(true);

      // Send formData instead of JSON referralData
      const response = await axios.post(commonConfig.urls.getReferralProfile, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data', // Necessary for file uploads
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
        // Adjust condition for success
        const response1 = await axios.post(
          'https://talend.dynpro.com/dynMIS/upload_referral_resume/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Necessary for file uploads
            },
          }
        );
        SnackbarUtils.success('Referral Added Successfully');
        handleCloseDialog();
        getReferral();
        // window.location.reload();
      } else {
        SnackbarUtils.error('Something went wrong!!');
      }
    } catch (error) {
      dispatch({ type: 'LOADING', bool: false });
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
    }
  };

  const handlePreview = async (doc_id, name) => {
    try {
      const response = await axios.get(
        commonConfig.urls.referral_attachment_review + '/' + doc_id,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Important to handle binary data
        }
      );

      // Create a blob URL for the response data and specify the type as 'application/pdf'
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error previewing the document:', error);
    }
  };
  const downloadPayslip = async (id, fallbackName) => {
    try {
      const response = await axios.get(commonConfig.urls.downloadReferraDoc + '/' + id, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob', // Important to handle binary data
      });

      // Determine the file extension based on the Content-Type header
      const contentType = response.headers['content-type'];
      let fileExtension;

      switch (contentType) {
        case 'application/pdf':
          fileExtension = 'pdf';
          break;
        case 'application/msword':
          fileExtension = 'doc';
          break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          fileExtension = 'docx';
          break;
        case 'image/jpeg':
          fileExtension = 'jpg';
          break;
        case 'image/png':
          fileExtension = 'png';
          break;
        // Add more cases as needed
        default:
          fileExtension = 'bin'; // Fallback for unknown content types
      }

      // Construct the filename using the fallback name and determined file extension
      const originalFileName = `${fallbackName}.${fileExtension}`;

      // Create a Blob from the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalFileName); // Download with the original filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL to release memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  };

  return (
    <>
      <Box className="breadcrumb" sx={{ m: 1 }}>
        <Breadcrumb routeSegments={[{ name: 'Referral List' }]} />
      </Box>
      <Container>
        <SimpleCard>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  marginBottom: '16px',
                }}
              >
                Referral List
              </span>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={2}>
              <AppTableSearchBox onSearch={handleSearch} top="148px" />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={2}>
              <StyledButton
                variant="contained"
                size="small"
                color="primary"
                onClick={handleOpenDialog} // <-- Open the dialog when clicked
              >
                Add Referral
              </StyledButton>
            </Grid>
          </Grid>
          <PaginationTable
            loading={loading}
            fetchData={state.data}
            data={searched ? requestSearch(searched) : state.data}
            page={page}
            onPageSet={setPage}
            handlePreview={handlePreview}
            downloadPayslip={downloadPayslip}
          />
        </SimpleCard>
      </Container>
      {/* ReferralDialog */}
      <ReferralDialog
        open={openDialog}
        onClose={handleCloseDialog}
        referralData={referralData}
        onChange={handleReferralChange}
        onSubmit={handleSubmitReferral}
        onFileChange={handleFileChange} // Pass the file change handler
      />
    </>
  );
};

export default ReferralList;
