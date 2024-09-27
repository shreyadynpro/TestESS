import React, { useState, useEffect } from 'react';
import { styled, Card, CardContent, Grid, Typography } from '@mui/material';
import Calendar from 'react-calendar'; // Import Calendar from react-calendar
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

// Styled Profile Card
const StyledProfileCard = styled(Card)(({ theme }) => ({
  marginTop: '20px',
  borderRadius: '15px',
  backgroundColor: '#1a2038',
  color: '#fff',
  textAlign: 'center', // Center content inside the card
  padding: '20px', // Add padding around the card content
}));

// Custom calendar styles
const CustomCalendar = styled(Calendar)(({ theme }) => ({
  backgroundColor: '#2c2f38', // Change background color
  borderRadius: '15px', // Change border radius
  border: 'none', // Remove default border
  padding: '10px', // Add some padding
  width: '100%', // Ensure full width
  '& .react-calendar__month-view__days__day': {
    borderRadius: '10px', // Change day cell border radius
    padding: '8px', // Adjust padding for day cells
  },
  '& .react-calendar__tile': {
    borderRadius: '10px', // Round tile corners
    transition: 'background-color 0.3s, color 0.3s', // Smooth transitions
  },
  '& .react-calendar__tile--active': {
    background: '#ff5722', // Background for selected day
    color: '#fff', // Text color for selected day
  },
  '& .react-calendar__tile--now': {
    background: '#ffccbc', // Background for today's date
    color: '#000', // Text color for today's date
  },
}));

// Clock Component
const StyledClock = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontFamily: 'serif',
  fontWeight: 'bold',
  fontSize: '1.5rem', // Adjust font size for the clock
  textAlign: 'left', // Center the clock text
  borderRadius: '10px', // Round the clock's corners
  padding: '10px', // Add padding around the clock
}));

const CalenderCard = () => {
  const [date, setDate] = useState(new Date()); // State for the selected date
  const [time, setTime] = useState(''); // State for the current time

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      setTime(now);
    };

    updateTime(); // Initial call to set time immediately
    const timer = setInterval(updateTime, 1000); // Update time every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate); // Update state with the selected date
  };

  return (
    <StyledProfileCard>
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={8}>
            {/* Custom Calendar Component */}
            <CustomCalendar onChange={handleDateChange} value={date} />
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {/* Digital Clock */}
            <StyledClock>{time}</StyledClock>
          </Grid>
        </Grid>
      </CardContent>
    </StyledProfileCard>
  );
};

export default CalenderCard;
