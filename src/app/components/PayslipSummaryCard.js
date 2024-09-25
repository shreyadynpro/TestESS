import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import styled from '@mui/material/styles/styled';
import axios from 'axios';
import commonConfig from './commonConfig';
import { getAccessToken } from 'app/utils/utils';

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Styled components
const StyledCard = styled(Card)({
  marginTop: '20px',
  borderRadius: '15px',
  backgroundColor: '#1a2038',
  color: '#fff',
});
const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: '10px',
}));

const PayslipSummaryCard = () => {
  const [showValues, setShowValues] = useState(false);
  const authToken = getAccessToken();
  const [months, setMonths] = useState([]);
  const [lastPayslip, setLastPayslip] = useState(null);
  const [payslipData, setPayslipData] = useState({});

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await axios(commonConfig.urls.getMonths, {
          headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        });
        const fetchedMonths = response.data.Response;
        setMonths(fetchedMonths);

        if (fetchedMonths.length > 0) {
          const lastMonth = fetchedMonths[fetchedMonths.length - 1].month_year;
          setLastPayslip(lastMonth);
          fetchPayslipData(lastMonth);
        }
      } catch (error) {
        console.error('Failed to fetch months:', error);
      }
    };

    fetchMonths();
  }, []);

  const fetchPayslipData = async (month) => {
    try {
      const [monthPart, year] = month.split(' ');

      const data = {
        year: year,
        month: monthPart,
      };
      const response = await axios.post(commonConfig.urls.getpayslip, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPayslipData(response.data.Response[0]); // Assuming the API returns the payslip data
    } catch (error) {
      console.error('Failed to fetch payslip data:', error);
    }
  };

  const handleToggleValues = () => {
    setShowValues(!showValues);
  };

  // Map payslipData to the data array used for the PieChart
  const chartData = [
    { name: 'Gross Pay', value: Number(payslipData?.gross_payble || 0) }, // Convert to number
    { name: 'Deduction', value: Number(payslipData?.total_deduction || 0) }, // Convert to number
    { name: 'Net Pay', value: Number(payslipData?.net_amount || 0) }, // Convert to number
    { name: 'Paid Days', value: Number(payslipData?.pay_day || 0) }, // Convert to number
  ];

  // Custom Tooltip Formatter
  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#fff', padding: '5px', borderRadius: '5px' }}>
          <p style={{ color: '#000' }}>{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Payslip {lastPayslip}
        </Typography>

        {/* Pie Chart */}
        <Grid container spacing={2}>
          <Grid item xs={6} container justifyContent="center">
            <PieChart width={174} height={174}>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                labelLine={false} // Disable label lines
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={customTooltip} /> {/* Custom Tooltip */}
            </PieChart>
          </Grid>

          {/* Right side for Paid Days */}
          <Grid
            item
            xs={6}
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: '100%', marginTop: '50px' }}
          >
            <Grid item>
              <Typography variant="h6" align="center" gutterBottom>
                Paid Days
              </Typography>
              <Typography variant="h4" align="center" style={{ color: 'orange' }}>
                {payslipData?.pay_day || 0}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Displaying Values as Stars */}
        <Grid container justifyContent="space-around" alignItems="center">
          <Typography variant="body1">
            Gross Pay: {showValues ? chartData[0].value : '★'}
          </Typography>
          <Typography variant="body1">
            Deduction: {showValues ? chartData[1].value : '★'}
          </Typography>
          <Typography variant="body1">Net Pay: {showValues ? chartData[2].value : '★'}</Typography>
        </Grid>

        {/* Toggle Button */}
        <Grid container justifyContent="center" marginTop={2}>
          <StyledButton variant="outlined" color="secondary" onClick={handleToggleValues}>
            {showValues ? 'Hide Values' : 'Show Values'}
          </StyledButton>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default PayslipSummaryCard;
