import React, { useRef, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import PayslipPDF from './PayslipPDF';

// Increase card size and padding
const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    height: '100%',
    position: 'relative',
    width: '100%', // Ensure cards take full width of their container
    minHeight: '300px', // Increase minimum height for visibility
  }));
  
  const NetPayCard = styled(Card)(({ theme }) => ({
    boxShadow: theme.shadows[4],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(3), // Increase padding for more space inside
    textAlign: 'center',
    width: '100%', // Ensure it takes full width of its container
    minHeight: '200px', // Increase minimum height for visibility
  }));
  
  const CardHeaderStyled = styled(CardHeader)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
  }));
  
  const CardContentStyled = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(3), // Increase padding for more space inside
  }));
  

const GreenText = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.main,
}));

const numberToWords = (num) => {
  const ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = [
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const thousands = ['Thousand', 'Lakh', 'Crore'];

  const getWords = (n) => {
    if (n === 0) return 'Zero';
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 11];
    if (n < 100) return tens[Math.floor(n / 10) - 2] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000)
      return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + getWords(n % 100) : '');
    if (n < 100000)
      return (
        getWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + getWords(n % 1000) : '')
      );
    if (n < 10000000)
      return (
        getWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + getWords(n % 100000) : '')
      );
    return (
      getWords(Math.floor(n / 10000000)) +
      ' Crore' +
      (n % 10000000 ? ' ' + getWords(n % 10000000) : '')
    );
  };

  return getWords(num);
};

const formatINR = (amount) => {
  return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

const getMonths = () => {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = month.toLocaleString('default', { month: 'long' });
    months.push({
      label: `${monthName} ${month.getFullYear()}`,
      value: month.toISOString().slice(0, 7),
    });
  }
  return months;
};

const Payslips = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const navigate = useNavigate();
  const componentRef = useRef();

  // Example amounts for the components
  const earningsComponentA = {
    basicSalary: 3000,
    houseRentAllowance: 500,
    specialAllowance: 200,
    gratuityBenefitPaid: 100,
    statutoryInterimBonus: 150,
    shiftAllowance: 50,
  };

  const earningsComponentB = {
    gratuityBenefit: 200,
    employersContributionToPF: 100,
  };

  const deductions = {
    professionTax: 300,
    taxDeductedAtSource: 100,
    otherDeductions: 150,
    employeePF: 200,
    esi: 50,
    lwf: 30,
  };

  // Calculate total earnings and total deductions
  const totalEarnings =
    Object.values(earningsComponentA).reduce((acc, curr) => acc + curr, 0) +
    Object.values(earningsComponentB).reduce((acc, curr) => acc + curr, 0);

  const totalDeductions = Object.values(deductions).reduce((acc, curr) => acc + curr, 0);

  // Calculate net pay
  const netPayAmount = totalEarnings - totalDeductions;

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Fetch or display payslip data for the selected month
  };

  const handleDownloadPDF = () => {
    navigate('/salary/payslips/pdf'); // Navigate to PayslipPDF page
  };

  const employeeDetails = {
    employeeName: 'John Doe',
    employeeID: '12345',
    region: 'Region Name',
    bankName: 'Bank Name',
    accountName: 'Account Name',
    uanNo: 'UAN123456',
    monthlySalary: formatINR(3000),
    perDayINR: formatINR(100),
    totalPayableDays: 30,
    pan: 'PAN123456',
    pfNo: 'PF123456',
  };

  const buttonStyle = {
    backgroundColor: '#007bff', // Bootstrap primary color or your preferred color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3', // Darker shade of the button color for hover
  };

  return (
    <Container>
      <Box position="relative" mb={4}>
        <Box
          display="flex"
          justifyContent="flex-end"
          mb={2}
          position="absolute"
          top={0}
          right={0}
          p={2}
        >
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" mt={4}>
              <button
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)
                }
                onClick={handleDownloadPDF}
              >
                Download PDF
              </button>
            </Box>
          </Grid>
          <Box sx={{ position: 'relative', ml: 2 }}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="month-select-label">Select Month</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                onChange={handleMonthChange}
                label="Select Month"
              >
                {getMonths().map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box mt={8}>
          <Typography variant="h3" gutterBottom>
            PAYSLIPS
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledCard>
            <CardHeaderStyled title="EMPLOYEE DETAILS" />
            <CardContentStyled>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Employee Name:"
                        secondary={employeeDetails.employeeName}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Employee ID:" secondary={employeeDetails.employeeID} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Region:" secondary={employeeDetails.region} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Bank Name:" secondary={employeeDetails.bankName} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Account Name:"
                        secondary={employeeDetails.accountName}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemText primary="UAN No:" secondary={employeeDetails.uanNo} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Monthly Salary:"
                        secondary={employeeDetails.monthlySalary}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Per Day (INR):"
                        secondary={employeeDetails.perDayINR}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Total Payable Days:"
                        secondary={employeeDetails.totalPayableDays}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="PAN:" secondary={employeeDetails.pan} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="PF No:" secondary={employeeDetails.pfNo} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContentStyled>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeaderStyled title="EARNINGS" />
            <CardContentStyled>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <List>
                    {Object.entries(earningsComponentA).map(([key, value]) => (
                      <ListItem key={key}>
                        <ListItemText
                          primary={key.replace(/([A-Z])/g, ' $1').trim()}
                          secondary={formatINR(value)}
                        />
                      </ListItem>
                    ))}
                    {Object.entries(earningsComponentB).map(([key, value]) => (
                      <ListItem key={key}>
                        <ListItemText
                          primary={key.replace(/([A-Z])/g, ' $1').trim()}
                          secondary={formatINR(value)}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContentStyled>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardHeaderStyled title="DEDUCTIONS" />
            <CardContentStyled>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <List>
                    {Object.entries(deductions).map(([key, value]) => (
                      <ListItem key={key}>
                        <ListItemText
                          primary={key.replace(/([A-Z])/g, ' $1').trim()}
                          secondary={formatINR(value)}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContentStyled>
          </StyledCard>
        </Grid>
        <Grid item xs={12}>
          <NetPayCard>
            <Typography variant="h5" gutterBottom>
              NET PAY
            </Typography>
            <GreenText variant="h6">{formatINR(netPayAmount)}</GreenText>
            <Typography variant="subtitle1">({numberToWords(netPayAmount)} Rupees Only)</Typography>
          </NetPayCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Payslips;
