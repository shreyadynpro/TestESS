import { Box, Button, Grid, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import commonRoutes from 'app/components/commonRoutes';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import { useEffect, useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import commonConfig from '../commonConfig';
import SnackbarUtils from 'SnackbarUtils';
import DocumentCenters from '../UserProfileModule/DocumentCenter';
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

const DocumentCenter = () => {
  const [userdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [searched, setSearched] = useState('');
  const [openDialog, setOpenDialog] = useState(false); // <-- Add state to manage the dialog open/close
  const [referralData, setReferralData] = useState({
    full_name: '',
    email: '',
    contact_no: '',
    skills: '',
    experience: '',
    pan: '',
    current_location: '',
  });
  const navigate = useNavigate();
  const authToken = getAccessToken();
  const user = useSelector((state) => state.userDetails?.user);
  const fetchData = async () => {
    if (!user?.dynmis_empid) return; // Prevent API call if dynmis_empid is empty

    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getUserProfile, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (response?.data?.Response) setData(response.data.Response[0]);
    } catch (error) {
      setLoading(false);
      console.error(error?.message || 'Something went wrong!!');
    }
  };
  useEffect(() => {
    if (user?.dynmis_empid) {
      fetchData();
    }
  }, [user?.dynmis_empid]);
  return (
    <>
      <Box className="breadcrumb" sx={{ m: 1 }}>
        <Breadcrumb routeSegments={[{ name: 'Document Center' }]} />
      </Box>
      <Container>
        <DocumentCenters theme userData={userdata} />
      </Container>
    </>
  );
};

export default DocumentCenter;



