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
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  TableHead,
  Table,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const printRef = useRef(null);

  // Calculate total earnings and total deductions

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Fetch or display payslip data for the selected month
  };

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) {
      console.error('Print reference is not set.');
      return; // Exit if the ref is not set
    }

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'px', 'a4');

    // Calculate PDF dimensions
    const pdfWidth = pdf.internal.pageSize.width;
    const pdfHeight = pdf.internal.pageSize.height;
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calculate scale to fit the content on the PDF
    const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgScaledWidth = imgWidth * scale;
    const imgScaledHeight = imgHeight * scale;

    pdf.addImage(imgData, 'PNG', 0, 0, imgScaledWidth, imgScaledHeight);
    pdf.save('payslip.pdf');
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
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} width="100%">
          <Typography variant="h3" sx={{ fontSize: '1.8rem' }}>
            PAYSLIPS
          </Typography>
          <Box display="flex" alignItems="center">
            <FormControl sx={{ minWidth: 150, mr: 2 }}>
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
            <button
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                marginLeft: '8px',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
              onClick={handleDownloadPDF}
            >
              Download PDF
            </button>
          </Box>
        </Box>
      </Box>
      <Box
        ref={printRef} // Add ref to the Box you want to convert to PDF
        sx={{ p: 2, border: '1px solid #ddd', borderRadius: '8px', maxWidth: '995px', mx: 'auto' }}
      >
        {/* Header Section */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <img
              src="https://www.dynpro.com/wp-content/uploads/2022/01/dynpro-logo-2-1-e1641987897332.png"
              alt="Company Logo"
              style={{ maxWidth: '150px' }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" sx={{ mt: 2 }}>
              DynPro India Pvt. Ltd.
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              1st Floor, C Wing, Teerth Technospace, Sr. No. 103, Mumbai Pune Bangalore Highway
              Pashan Exit Teerth2Work, Baner, Pune, Maharashtra 411045
            </Typography>
          </Grid>
        </Grid>

        {/* Employee Details Box with Outline */}
        <Box
          sx={{
            p: 2,
            backgroundColor: 'transparent',
            border: '2px solid black',
            borderRadius: '4px',
            mb: 3,
            maxWidth: '100%',
            mx: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                  <strong style={{ marginRight: '8px' }}>Employee Name:</strong> John Doe
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                  <strong style={{ marginRight: '8px' }}>Employee ID:</strong> 12345
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                  <strong style={{ marginRight: '8px' }}>Region:</strong> Region Name
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                  <strong style={{ marginRight: '8px' }}>Bank Name:</strong> Bank XYZ
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                  <strong style={{ marginRight: '8px' }}>Account Name:</strong> John Doe
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                  <strong style={{ marginRight: '8px' }}>UAN No:</strong> 1234567890
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                  <strong style={{ marginRight: '8px' }}>Monthly Salary:</strong> ₹60,000
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                  <strong style={{ marginRight: '8px' }}>Per Day (INR):</strong> ₹2,000
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                  <strong style={{ marginRight: '8px' }}>Total Payable Days:</strong> 30
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                  <strong style={{ marginRight: '8px' }}>PAN:</strong> ABCDE1234F
                </Typography>
                <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
                  <strong style={{ marginRight: '8px' }}>PF No:</strong> PF123456
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Pay Elements Table */}
        <TableContainer
          component={Paper}
          sx={{ maxWidth: '100%', mx: 'auto', border: '2px solid black', mb: 2 }}
        >
          <Table aria-label="pay elements table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ border: '1px solid black', width: '15%' }}>
                  <strong>PAY ELEMENTS</strong>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black', width: '15%' }}>
                  <strong>MONTHLY SALARY</strong>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black', width: '15%' }}>
                  <strong>EARNINGS</strong>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black', width: '15%' }}>
                  <strong>DEDUCTIONS</strong>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black', width: '15%' }}>
                  <strong>AMOUNT</strong>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

        {/* Pay Elements Details Table */}
        <TableContainer
          component={Paper}
          sx={{ maxWidth: '100%', mx: 'auto', border: '2px solid black', mb: 2 }}
        >
          <Table aria-label="pay elements details table">
            <TableBody>
              <TableRow>
                <TableCell align="left" sx={{ border: '1px solid black', padding: '8px 16px' }}>
                  <Box sx={{ fontWeight: 'bold', mb: 1 }}>Component - A</Box>
                  <Box>Basic Salary</Box>
                  <Box>House Rent Allowance</Box>
                  <Box>Special Allowance</Box>
                  <Box>Gratuity Benefit Paid</Box>
                  <Box>Statutory Interim Bonus</Box>
                  <Box>Shift Allowance</Box>
                  <Box sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Component - B</Box>
                  <Box>Gratuity Benefit</Box>
                  <Box>Employer's Contribution to P.F.</Box>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  ₹20,000
                  <Box>₹5,000</Box>
                  <Box>₹3,000</Box>
                  <Box>₹2,000</Box>
                  <Box>₹1,500</Box>
                  <Box>₹1,200</Box>
                  <Box sx={{ mt: 2, mb: 1 }}>₹4,000</Box>
                  <Box>₹1,500</Box>
                  <Box>₹2,000</Box>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  ₹20,000
                  <Box>₹5,000</Box>
                  <Box>₹3,000</Box>
                  <Box>₹2,000</Box>
                  <Box>₹1,500</Box>
                  <Box>₹1,200</Box>
                  <Box sx={{ mt: 2, mb: 1 }}>₹4,000</Box>
                  <Box>₹1,500</Box>
                  <Box>₹2,000</Box>
                </TableCell>
                <TableCell align="left" sx={{ border: '1px solid black', padding: '8px 16px' }}>
                  <Box>Profession Tax</Box>
                  <Box>Tax Deducted at Source</Box>
                  <Box>Other Deductions</Box>
                  <Box>Employee PF</Box>
                  <Box>ESI</Box>
                  <Box>LWF</Box>
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  ₹1,500
                  <Box>₹1,200</Box>
                  <Box>₹800</Box>
                  <Box>₹1,000</Box>
                  <Box>₹500</Box>
                  <Box>₹200</Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Totals Table */}
        <TableContainer
          component={Paper}
          sx={{ maxWidth: '100%', mx: 'auto', border: '2px solid black', mb: 2 }}
        >
          <Table aria-label="totals table">
            <TableBody>
              {/* NET PAY Row */}
              <TableRow>
                <TableCell
                  align="left"
                  sx={{ border: '1px solid black', padding: '8px 16px', fontWeight: 'bold' }}
                >
                  TOTAL
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  ₹50,000
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  ₹60,000
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ border: '1px solid black', padding: '8px 4px', fontWeight: 'bold' }}
                >
                  TOTAL DEDUCTIONS
                </TableCell>
                <TableCell align="center" sx={{ border: '1px solid black' }}>
                  ₹53,800
                </TableCell>
              </TableRow>

              {/* NET PAY (In Words) Row */}
              <TableRow>
                <TableCell align="center" sx={{ border: '1px solid black', padding: '8px 16px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                    NET PAY (In Words)
                  </Typography>
                </TableCell>
                <TableRow align="center">
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Sixty Thousand Rupees Only
                  </Typography>
                </TableRow>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Computer-generated statement */}
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
          This is a computer-generated payslip. No signature is required.
        </Typography>
      </Box>
    </Container>
  );
};

export default Payslips;
