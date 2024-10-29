import React, { useState, useEffect } from 'react';
import { styled, Card, CardContent, Grid, Typography, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import commonConfig from './commonConfig';
import { getAccessToken } from 'app/utils/utils';

// Styled Profile Card
const StyledProfileCard = styled(Card)(({ theme }) => ({
  marginTop: '20px',
  borderRadius: '15px',
  backgroundColor: '#1a2038',
  color: '#fff',
  textAlign: 'center',
  padding: '0px',
  height: '94%',
}));

const StyledTab = styled(Tab)(({ theme, selected }) => ({
  backgroundColor: selected ? 'transparent' : 'transparent',
  marginTop: '0px',
  color: selected ? 'orange' : 'white',
  '&.Mui-selected': {
    color: 'orange',
  },
  '&:hover': {
    color: 'orange',
  },
}));

const HolidayCard = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState('Pune'); // Default to 'Pune'
  const [locations, setLocations] = useState(['Pune', 'Delhi', 'Bangalore', 'Kolkata']);
  const [value, setValue] = useState(0); // For tab index
  const authToken = getAccessToken();

  const fetchData = async (selectedLocation) => {
    try {
      const response = await axios.get(commonConfig.urls.getHolidays, {
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
      });
      if (response && response.data && response.data.Response) {
        let holidayData = response.data.Response;
        // Filter data based on selected location
        if (selectedLocation) {
          holidayData = holidayData.filter((holiday) => holiday.place === selectedLocation);
        }
        setData(holidayData);
      }
    } catch (error) {
      console.error('Error fetching holiday data:', error);
    }
  };

  useEffect(() => {
    fetchData(location);
  }, [location]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setLocation(locations[newValue]); // Update the selected location based on tab index
  };

  return (
    <StyledProfileCard>
      <p
        style={{
          marginBottom: '1px',
          width: '70%',
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        (*Please note that this holiday list applies only to DynPro offices at respective locations
        and employees working in these offices. Resources deployed on client projects must follow
        holiday list issued by respective client location.)
      </p>
      <CardContent>
        {/* Tab for locations */}

        <Tabs value={value} onChange={handleTabChange} aria-label="location tabs" sx={{ mb: 3 }}>
          {locations.map((loc, index) => (
            <StyledTab key={loc} label={loc} />
          ))}
        </Tabs>

        <Grid container spacing={1}>
          {' '}
          {/* Reduced spacing here */}
          {/* Left side: First 5 holidays */}
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ textAlign: 'left', fontWeight: 'bold', mb: 2 }}>
              Holidays
            </Typography>
            {data.slice(0, 5).map((holiday, index) => (
              <Grid container key={index} spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
                {' '}
                {/* Reduced margin-bottom */}
                <Grid item xs={6} sx={{ textAlign: 'left' }}>
                  <strong>{holiday.name}</strong>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'left' }}>
                  {holiday.holiday_date}
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'left' }}>
                  {holiday.day}
                </Grid>
              </Grid>
            ))}
          </Grid>
          {/* Right side: Next 5 holidays */}
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ textAlign: 'left', fontWeight: 'bold', mb: 2 }}>
              More Holidays
            </Typography>
            {data.slice(5, 10).map((holiday, index) => (
              <Grid container key={index} spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
                {' '}
                {/* Reduced margin-bottom */}
                <Grid item xs={6} sx={{ textAlign: 'left' }}>
                  <strong>{holiday.name}</strong>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'left' }}>
                  {holiday.holiday_date}
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'left' }}>
                  {holiday.day}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </StyledProfileCard>
  );
};

export default HolidayCard;
