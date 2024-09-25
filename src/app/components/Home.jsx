import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  styled,
  useTheme,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import ProfileSummaryCard from './ProfileSummaryCard'; // Import Profile Summary Card
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import commonConfig from './commonConfig';
import { getAccessToken } from 'app/utils/utils';
import DownloadIcon from '@mui/icons-material/CloudDownload'; // Importing download icon
import PayslipSummaryCard from './PayslipSummaryCard'; // Import the new card
import CalenderCard from './CalenderCard';
// StyledDiv with underline effect using ::before pseudo-element
const StyledDiv = styled('div')({
  position: 'absolute',
  top: '20px',
  left: '20px',
  '& h3': {
    position: 'relative',
    textTransform: 'capitalize',
    margin: 0,
    paddingBottom: '10px',
    fontSize: '36px',
    fontWeight: 700,
    fontFamily: "'Roboto', sans-serif",
    color: '#00246b',
    '&::before': {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '60px',
      height: '2px',
      content: '""',
      backgroundColor: '#c50000',
    },
  },
});

// Styled Payslip Card with background color #1a2038
const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: '20px',
  padding: theme.spacing(1), // Reduced padding
  borderRadius: '15px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#1a2038', // Changed background color
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: '10px', // Align button with the text
}));
const StyledIcon = styled(DownloadIcon)(({ theme }) => ({
  color: '#FFA500', // Set the color of the icon to orange
}));
const PayslipCard = () => {
  const [months, setMonths] = useState([]);
  const authToken = getAccessToken();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userDetails?.user);
  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await axios(commonConfig.urls.getLetestPayslipMonths, {
          headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        });
        const fetchedMonths = response.data.Response;
        setMonths(fetchedMonths);
      } catch (error) {
        console.error('Failed to fetch months:', error);
      }
    };

    fetchMonths();
  }, []);
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
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" align="center" color={'white'} gutterBottom>
          Payslips
        </Typography>

        {months && months.length > 0 ? (
          <List dense>
            {' '}
            {/* Use dense for less spacing */}
            {months.map((payslip) => (
              <ListItem key={payslip.month_year} style={{ marginBottom: '0px' }}>
                {' '}
                {/* Reduced padding */}
                <ListItemText
                  primary={` ${payslip.month_year}`}
                  primaryTypographyProps={{ style: { color: 'white' } }}
                />
                <ListItemIcon>
                  <StyledButton
                    variant="contained"
                    style={{ backgroundColor: 'transparent', boxShadow: 'none' }} // Transparent button background
                    onClick={() => downloadPayslip(payslip.month_year)}
                  >
                    <StyledIcon /> {/* Use the styled icon */}
                  </StyledButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No payslips available.
          </Typography>
        )}
        <StyledButton
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate('/Profile'); // Redirect to /Profile page
          }}
        >
          View All
        </StyledButton>
      </CardContent>
    </StyledCard>
  );
};

const Home = () => {
  const user = useSelector((state) => state.userDetails?.user);
  const theme = useTheme();

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
        padding: '20px',
      }}
    >
      <StyledDiv>
        <h3>
          {getGreeting()} {user?.first_name || ''},
        </h3>
      </StyledDiv>

      {/* Center Grid for content */}
      <Grid container justifyContent="center" spacing={2} style={{ marginTop: '40px' }}>
        {/* Row with Profile Summary Card and Image */}
        <Grid item xs={12} sm={4}>
          <ProfileSummaryCard />
        </Grid>
        {user?.dynmis_empid && user.dynmis_empid !== '' ? (
          <>
            <Grid item xs={12} sm={4}>
              <PayslipSummaryCard />
            </Grid>
            <Grid item xs={12} sm={4}>
              <PayslipCard />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={4}>
              {/* Optional content when condition is false */}
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* Optional content when condition is false */}
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={6}>
          <CalenderCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            width="100%" // Adjust image to fill the grid item
            height="80%" // Maintain aspect ratio
            src="/assets/images/311.jpg"
            alt="Greeting"
            style={{
              borderRadius: '15px', // Optional: Add some rounding to the image corners
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Add shadow to the image
            }}
          />
        </Grid>

        {/* Row with Payslip List Card and Payslip Summary Card */}
      </Grid>
    </div>
  );
};

export default Home;
