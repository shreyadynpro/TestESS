import React from 'react';
import { useSelector } from 'react-redux';
import { styled, useTheme, Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Styled Profile Card
const StyledProfileCard = styled(Card)(({ theme }) => ({
  marginTop: '20px',
  borderRadius: '15px',
  backgroundColor: '#1a2038',
  color: '#fff',
  height: '93%',
  textAlign: 'center', // Center content inside the card
}));

const ProfileSummaryCard = () => {
  const user = useSelector((state) => state.userDetails?.user);
  const theme = useTheme();

  return (
    <StyledProfileCard>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Profile Summary
        </Typography>

        {/* Wrapper for each entry to apply consistent styles */}
        {[
          { label: 'Employee ID:', value: user?.emp_id || 'N/A' },
          { label: 'PAN:', value: user?.identity_no || 'N/A' },
          { label: 'Email:', value: user?.email || 'N/A' },
          { label: 'Contact:', value: user?.phone_mobile || 'N/A' },
          { label: 'Designation:', value: user?.dpro_designation_offered || 'N/A' },
          { label: 'Date of Joining:', value: user?.expected_doj || 'N/A' },
        ].map(({ label, value }, index) => (
          <Grid container key={index} alignItems="center" style={{ marginBottom: '10px' }}>
            <Grid item xs={4} style={{ textAlign: 'left' }}>
              <Typography
                variant="body1"
                style={{
                  color: '#FF9800', // Orange color for labels
                  fontWeight: '400',
                }}
              >
                {label}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'left' }}>
              <Typography
                variant="body1"
                color="rgba(255, 255, 255, 0.9)" // Slightly brighter for better visibility
                style={{
                  fontSize: '1.1rem', // Increased font size for values
                  fontWeight: '200', // Increased font weight for values
                }}
              >
                {value}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </StyledProfileCard>
  );
};

export default ProfileSummaryCard;
