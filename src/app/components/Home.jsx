import React from 'react';
import { Grid, Card, CardContent, Typography, styled, useTheme } from '@mui/material';
import TaskIcon from 'app/components/AppLandingPage/assets/images/tasks.jpg'; // Adjust path as needed
import HolidayIcon from 'app/components/AppLandingPage/assets/images/calender.jpg'; // Adjust path as needed
import PayslipIcon from 'app/components/AppLandingPage/assets/images/salaryslip.jpg'; // Adjust path as needed
import NotificationIcon from 'app/components/AppLandingPage/assets/images/notification.jpg'; // Adjust path as needed

// Styled components
const GreetingRoot = styled('div')(({ theme, position }) => ({
  position: 'absolute',
  fontSize: '36px',
  fontStyle: 'italic',
  fontFamily: 'Roboto, sans-serif',
  color: theme.palette.text.primary,
  ...(() => {
    switch (position) {
      case 'top-left':
        return { top: '10px', left: '10px' };
      case 'top-right':
        return { top: '10px', right: '10px' };
      case 'bottom-left':
        return { bottom: '10px', left: '10px' };
      case 'bottom-right':
        return { bottom: '10px', right: '10px' };
      default:
        return { top: '10px', left: '10px' };
    }
  })(),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '20px',
  boxShadow: theme.shadows[6],
  '&:hover': {
    boxShadow: theme.shadows[10],
  },
  transition: 'box-shadow 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column', // **Added to stack content vertically**
  position: 'relative', // **Added to position the image absolutely within the card**
}));

// **Updated: Positioned the image at the top-right corner**
const CardImage = styled('img')(({ theme }) => ({
  width: '200px',  // Size of the image
  height: '200px', // Size of the image
  position: 'absolute', // Positioned absolutely within the card
  top: '10px',
  right: '10px',
  borderRadius: '50%',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '24px',
  marginTop: '40px', // Added margin to ensure content is not overlapped by the image
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: '16px',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  fontFamily: 'Roboto, sans-serif',
  textTransform: 'uppercase',
  letterSpacing: '1px',
}));

const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours < 12) return 'Good Morning';
  if (hours < 18) return 'Good Afternoon';
  return 'Good Evening';
};

// Mock data
const pendingTasks = [
  { task: 'Task 1', completion: 70, dueDate: '2024-07-30', priority: 'High', assignedBy: 'Manager', tags: ['Urgent', 'Client'] },
  { task: 'Task 2', completion: 50, dueDate: '2024-08-05', priority: 'Medium', assignedBy: 'Team Lead', tags: ['Internal'] },
  { task: 'Task 3', completion: 30, dueDate: '2024-08-10', priority: 'Low', assignedBy: 'Manager', tags: ['Research'] },
];

const holidays = [
  { date: '2024-08-15', name: 'Independence Day', description: 'National holiday in India', type: 'National' },
  { date: '2024-10-02', name: 'Gandhi Jayanti', description: 'Birthday of Mahatma Gandhi', type: 'National' },
  { date: '2024-12-25', name: 'Christmas Day', description: 'Celebration of the birth of Jesus Christ', type: 'Religious' },
  { date: '2024-10-24', name: 'Diwali', description: 'Festival of Lights', type: 'Religious' },
  { date: '2024-09-08', name: 'Ganesh Chaturthi', description: 'Festival dedicated to Lord Ganesha', type: 'Religious' },
];

const payslip = {
  month: 'July',
  year: 2024,
  workingDays: 22,
  baseSalary: 4000,
  bonuses: 500,
  grossPay: 4500,
  netPay: 4000,
  deductions: 500,
  taxDetails: { federal: 200, state: 100, local: 50 },
  benefits: { healthInsurance: 100, retirement: 50 },
  overtime: 200,
  leaveDeductions: 50,
};

const recentActivities = [
  { activity: 'Completed Task 1', timestamp: '2024-07-23 14:00' },
  { activity: 'Joined Meeting with Team', timestamp: '2024-07-23 10:00' },
];

const notifications = [
  { message: 'Your report is due tomorrow.', type: 'Reminder' },
  { message: 'System maintenance scheduled for this weekend.', type: 'Alert' },
];

const Home = ({ greetingPosition = 'top-left' }) => {
  const theme = useTheme();

  return (
    <div style={{ position: 'relative', height: '100vh', backgroundColor: theme.palette.background.default, padding: '20px' }}>
      <GreetingRoot position={greetingPosition}>
        {getGreeting()} User
      </GreetingRoot>
      <Grid container spacing={3} style={{ marginTop: '80px' }}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardImage src={TaskIcon} alt="Task Icon" />
            <StyledCardContent>
              <StyledTypography variant="h6" component="div" gutterBottom>
                Pending Tasks
              </StyledTypography>
              {pendingTasks.map((task, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <Typography variant="body2" color="text.secondary">
                    {task.task}: {task.completion}% Complete
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Due Date: {new Date(task.dueDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Priority: {task.priority}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assigned By: {task.assignedBy}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tags: {task.tags.join(', ')}
                  </Typography>
                </div>
              ))}
              <Typography variant="body2" color="text.secondary">
                Total Tasks: {pendingTasks.length}
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        {/* Other Grid items remain unchanged */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardImage src={HolidayIcon} alt="Holiday Icon" />
            <StyledCardContent>
              <StyledTypography variant="h6" component="div" gutterBottom>
                Upcoming Holidays
              </StyledTypography>
              {holidays.map((holiday, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(holiday.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })} - {holiday.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {holiday.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Type: {holiday.type}
                  </Typography>
                </div>
              ))}
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardImage src={PayslipIcon} alt="Payslip Icon" />
            <StyledCardContent>
              <StyledTypography variant="h6" component="div" gutterBottom>
                Payslip - {payslip.month} {payslip.year}
              </StyledTypography>
              <Typography variant="body2" color="text.secondary">
                Working Days: {payslip.workingDays}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Base Salary: ${payslip.baseSalary}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bonuses: ${payslip.bonuses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gross Pay: ${payslip.grossPay}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Net Pay: ${payslip.netPay}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Deductions: ${payslip.deductions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tax Details: Federal - ${payslip.taxDetails.federal}, State - ${payslip.taxDetails.state}, Local - ${payslip.taxDetails.local}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Benefits: Health Insurance - ${payslip.benefits.healthInsurance}, Retirement - ${payslip.benefits.retirement}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overtime: ${payslip.overtime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Leave Deductions: ${payslip.leaveDeductions}
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardImage src={NotificationIcon} alt="Notification Icon" />
            <StyledCardContent>
              <StyledTypography variant="h6" component="div" gutterBottom>
                Notifications
              </StyledTypography>
              {notifications.map((notification, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <Typography variant="body2" color="text.secondary">
                    {notification.message}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Type: {notification.type}
                  </Typography>
                </div>
              ))}
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <StyledCardContent>
              <StyledTypography variant="h6" component="div" gutterBottom>
                Recent Activities
              </StyledTypography>
              {recentActivities.map((activity, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <Typography variant="body2" color="text.secondary">
                    {activity.activity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Timestamp: {new Date(activity.timestamp).toLocaleString()}
                  </Typography>
                </div>
              ))}
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
