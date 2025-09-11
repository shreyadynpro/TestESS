import { Box, Button, Grid, styled, Tabs, Tab } from '@mui/material'; // Import Tabs and Tab
import { Breadcrumb, SimpleCard } from 'app/components';
import AppTableSearchBox from 'app/components/ReusableComponents/AppTableSearchBox';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import commonConfig from '../../commonConfig';
import PaginationTable from './AppPaginateSalarySlips';
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

const SalarySlipList = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(''); // Initially empty, will be set to the latest month
  const [searched, setSearched] = useState(''); // Search term
  const navigate = useNavigate();
  const authToken = getAccessToken();

  // Static list of the last two months
  const getLastThreeMonths = () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    const secondLastMonth = new Date(now.getFullYear(), now.getMonth() - 2);
    const thirdLastMonth = new Date(now.getFullYear(), now.getMonth() - 3);

    const months = [
      thirdLastMonth.toLocaleString('default', { month: 'long' }),
      secondLastMonth.toLocaleString('default', { month: 'long' }),
      lastMonth.toLocaleString('default', { month: 'long' }),
    ];
    return months;
  };

  const months = getLastThreeMonths(); // Generate static last two months
  const [month, setMonth] = useState(months[1]); // Default to the most recent month

  const handleMonthChange = (event, newValue) => {
    const newMonth = months[newValue];
    setMonth(newMonth); // Update selected month
    fetchData(newMonth); // Fetch data when month is changed
  };

  // Fetch data from API based on selected month
  const fetchData = async (selectedMonth) => {
    try {
      setLoading(true);
      const response = await axios.get(commonConfig.urls.getAllPaySlip, {
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
      });
      setLoading(false);
      if (response && response.data && response.data.Response) {
        let SalarySlipData = response.data.Response;
        // Filter data based on selected month
        if (selectedMonth) {
          SalarySlipData = SalarySlipData.filter(
            (salaryslip) => salaryslip.month === selectedMonth
          );
        }
        setData(SalarySlipData);
      }
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong');
    }
  };

  // Fetch data on initial load and whenever selectedMonth changes
  useEffect(() => {
    fetchData(month); // Fetch data when the component mounts or when the month changes
  }, [month]); // Dependency array ensures the hook triggers on month change

  const handleSearch = (e) => {
    setSearched(e.currentTarget.value); // Set the searched value when user types
  };

  const requestSearch = (searchedVal) =>
    data.filter((row) => {
      return (row.name + ' ' + row.employee_ids + ' ' + row.identity_no)
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });
  const handleDownload = async (payslipdata) => {
    try {
      const response = await axios.get(
        commonConfig.urls.generatePayslipPdfAdmin +
          '/' +
          payslipdata.month +
          '/' +
          payslipdata.year +
          '/' +
          payslipdata.dynmis_empid,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Important to handle binary data
        }
      );

      console.log("This is the response data---", response.data)

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${payslipdata.name}.pdf`); // Use a dynamic filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  };
  return (
    <>
      <Box className="breadcrumb" sx={{ m: 1 }}>
        <Breadcrumb routeSegments={[{ name: 'Salary Slips' }]} />
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
                Salary Slips
              </span>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={2}>
              <AppTableSearchBox onSearch={handleSearch} top="148px" />
            </Grid>
            <Grid item xs={12}>
              {/* Styled Tabs for the last three months */}
              <StyledTabs
                value={months.indexOf(month)} // Ensure value matches a valid index
                onChange={handleMonthChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {/* Third last month */}
                <StyledTab
                  key={months[0]}
                  label={months[0]}
                  isActive={month === months[0]} // Check active state
                />
                {/* Second last month */}
                <StyledTab
                  key={months[1]}
                  label={months[1]}
                  isActive={month === months[1]} // Check active state
                />
                {/* Last month */}
                <StyledTab
                  key={months[2]}
                  label={months[2]}
                  isActive={month === months[2]} // Check active state
                />
              </StyledTabs>
            </Grid>
          </Grid>
          <PaginationTable
            loading={loading}
            data={searched ? requestSearch(searched) : data}
            page={page}
            onPageSet={setPage}
            handleDownload={handleDownload}
          />
        </SimpleCard>
      </Container>
    </>
  );
};

export default SalarySlipList;
