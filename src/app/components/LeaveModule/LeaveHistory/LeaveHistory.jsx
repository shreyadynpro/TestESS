import { Box, Button, Grid, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import commonRoutes from 'app/components/commonRoutes';
import AppTableSearchBox from 'app/components/ReusableComponents/AppTableSearchBox';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import commonConfig from '../../commonConfig';
import PaginationTable from './AppPaginateLeave';
import SnackbarUtils from 'SnackbarUtils';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.info.main,
  marginTop: 0,
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const LeaveHistory = () => {
  const [searched, setSearched] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const requestSearch = (searchedVal) =>
    data.filter((row) => {
      return (
        row.from_date +
        ' ' +
        row.to_date +
        ' ' +
        row.total_days_applied +
        ' ' +
        row.type_of_leave +
        ' ' +
        row.leave_status +
        ' ' +
        row.reason
      )
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });
  const [data, setData] = useState([]);
  const authToken = getAccessToken();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.leavehistory, {
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
      });
      setLoading(false);
      if (response && response['data'] && response['data']['Response'])
        setData(response['data']['Response']);
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearched(e.currentTarget.value);
    if (searched) {
      requestSearch(searched);
    }
  };
  return (
    <>
      <Box className="breadcrumb" sx={{ m: 1 }}>
        <Breadcrumb routeSegments={[{ name: 'Leave History' }]} />
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
                Leave History
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
                onClick={() => navigate(commonRoutes.leaves.applyLeave)}
              >
                Apply Leave
              </StyledButton>
            </Grid>
          </Grid>
          <PaginationTable
            loading={loading}
            fetchData={fetchData}
            data={searched ? requestSearch(searched) : data}
            page={page}
            onPageSet={setPage}
          />
        </SimpleCard>
      </Container>
    </>
  );
};

export default LeaveHistory;
