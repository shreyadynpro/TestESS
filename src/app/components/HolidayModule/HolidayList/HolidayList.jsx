import { Box, Button, Grid, styled, Tabs, Tab } from '@mui/material'; // Import Tabs and Tab
import { Breadcrumb, SimpleCard } from 'app/components';
import AppTableSearchBox from 'app/components/ReusableComponents/AppTableSearchBox';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import commonConfig from '../../commonConfig';
import PaginationTable from './AppPaginateHoliday';
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

// Customize the Tabs and Tab styles
const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    backgroundColor: '#1976d2', // Active tab underline color
  },
}));

const StyledTab = styled(Tab)(({ theme, isActive }) => ({
  textTransform: 'none',
  fontWeight: isActive ? 'bold' : 'normal',
  color: isActive ? '#1976d2' : theme.palette.text.primary, // Active tab color
  '&.Mui-selected': {
    color: '#1976d2', // Active tab text color
    fontWeight: 'bold',
  },
}));

const HolidayList = () => {
  const [searched, setSearched] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('Pune'); // Default to 'Pune'
  const navigate = useNavigate();
  const authToken = getAccessToken();

  // Static list of locations for tabs (without 'All')
  const locations = ['Pune', 'Delhi', 'Bangalore', 'Kolkata'];

  // Fetch data from API, and filter by location
  const fetchData = async (selectedLocation) => {
    try {
      setLoading(true);
      const response = await axios.get(commonConfig.urls.getHolidays, {
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
      });
      setLoading(false);
      if (response && response.data && response.data.Response) {
        let holidayData = response.data.Response;
        // Filter data based on selected location
        if (selectedLocation) {
          holidayData = holidayData.filter((holiday) => holiday.place === selectedLocation);
        }
        setData(holidayData);
      }
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong');
    }
  };

  // Define requestSearch to filter data based on search input
  const requestSearch = (searchedVal) => {
    return data.filter((row) => row.role.toLowerCase().includes(searchedVal.toLowerCase()));
  };

  // Fetch data when component loads and when location changes
  useEffect(() => {
    fetchData(location);
  }, [location]);

  // Handle tab (location) change
  const handleLocationChange = (event, newValue) => {
    setLocation(locations[newValue]); // Update the location based on the selected tab
  };

  const handleSearch = (e) => {
    const value = e.currentTarget.value;
    setSearched(value);
  };

  return (
    <>
      <Box className="breadcrumb" sx={{ m: 1 }}>
        <Breadcrumb routeSegments={[{ name: 'Holidays List' }]} />
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
                Holidays List
              </span>
            </Grid>
            <Grid item xs={12}>
              <p
                style={{
                  fontSize: '13px',
                  color: 'red',
                }}
              >
                (*Please note that this holiday list applies only to DynPro offices at respective
                locations and employees working in these offices. Resources deployed on client
                projects must follow holiday list issued by respective client location.)
              </p>
            </Grid>
            {/* <Grid item xs={12} sm={3} md={3} lg={2}>
              <AppTableSearchBox onSearch={handleSearch} top="148px" />
            </Grid> */}
            <Grid item xs={12}>
              {/* Styled Tabs for locations, moved after the heading */}
              <StyledTabs
                value={locations.indexOf(location)}
                onChange={handleLocationChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {locations.map((loc, index) => (
                  <StyledTab
                    key={loc}
                    label={loc}
                    isActive={location === loc} // Pass the active state for custom styling
                  />
                ))}
              </StyledTabs>
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

export default HolidayList;
