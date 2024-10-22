import { Box, Grid, styled, Tabs, Tab, useTheme } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import AppTableSearchBox from 'app/components/ReusableComponents/AppTableSearchBox';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PaginationTable from './AppPaginateEmployee';
import SnackbarUtils from 'SnackbarUtils';
import commonConfig from '../../commonConfig';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const EmployeeList = () => {
  const theme = useTheme();
  const [searched, setSearched] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [data, setData] = useState({ active: [], inactive: [] }); // Handle active and inactive data
  const [tabValue, setTabValue] = useState(0); // 0 for Active, 1 for Inactive
  const authToken = getAccessToken();

  const employeeViewPermission = useSelector(
    (state) => state.userAccessPermissions?.userPermissions?.employees_view
  );

  // Fetch employee data (active and inactive)
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getEmployeeList, {
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
      });
      setLoading(false);
      if (response && response['data']) {
        setData({
          active: response['data']['active'] || [],
          inactive: response['data']['inactive'] || [],
        });
      }
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const requestSearch = (searchedVal) =>
    (tabValue === 0 ? data.active : data.inactive).filter((row) => {
      return (row.first_name + ' ' + row.last_name + ' ' + row.email1 + ' ' + row.identity_no)
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });

  const handleSearch = (e) => {
    setSearched(e.currentTarget.value);
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0); // Reset page when switching tabs
  };

  return (
    <>
      <Box className="breadcrumb" sx={{ m: 1 }}>
        <Breadcrumb routeSegments={[{ name: 'Employees List' }]} />
      </Box>
      <Container>
        {employeeViewPermission === 1 ? (
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              style={{
                borderRadius: '5px',
                padding: '25px',
              }}
            >
              {/* Add Tabs for Active/Inactive */}
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                TabIndicatorProps={{
                  style: { backgroundColor: '#22cfe2' }, // Indicator color
                }}
                style={{
                  marginBottom: '15px',
                }}
              >
                <Tab
                  label="Billable Employees"
                  sx={{
                    color: tabValue === 0 ? '#ffaf38 !important' : theme.palette.text.primary, // Active tab font color
                    fontWeight: tabValue === 0 ? 'bold' : 'normal',
                  }}
                />
                <Tab
                  label="Non-Billable Employees"
                  sx={{
                    color: tabValue === 1 ? '#ffaf38 !important' : theme.palette.text.primary, // Active tab font color
                    fontWeight: tabValue === 1 ? 'bold' : 'normal',
                  }}
                />
              </Tabs>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      marginBottom: '16px',
                    }}
                  >
                    {tabValue === 0 ? 'Billable Employees' : 'Non-Billable Employees'}
                  </span>
                </Grid>
                <Grid item xs={6}>
                  <AppTableSearchBox onSearch={handleSearch} top="148px" />
                </Grid>
              </Grid>
              <PaginationTable
                loading={loading}
                fetchData={fetchData}
                data={
                  searched ? requestSearch(searched) : tabValue === 0 ? data.active : data.inactive
                }
                page={page}
                onPageSet={setPage}
                onRowClick={handleRowClick}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              {selectedEmployee && (
                <SimpleCard
                  style={{
                    padding: '20px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  {/* Employee Details */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    {selectedEmployee.salutation === 'Mr.' ? (
                      <img
                        src="/assets/images/avatars/001-man.svg"
                        alt=""
                        style={{ width: '150px', marginBottom: '15px', borderRadius: '50%' }}
                      />
                    ) : (
                      <img
                        src="/assets/images/avatars/006-woman-1.svg"
                        alt=""
                        style={{ width: '150px', marginBottom: '15px', borderRadius: '50%' }}
                      />
                    )}
                    <h2 style={{ color: '#cb8b59', marginBottom: '5px', fontWeight: '600' }}>
                      {selectedEmployee.salutation} {selectedEmployee.first_name}{' '}
                      {selectedEmployee.last_name}
                    </h2>
                    <h5 style={{ color: '#cb8b59', marginBottom: '15px', fontWeight: '500' }}>
                      #{selectedEmployee.emp_id} | {selectedEmployee.dpro_designation_offered}
                    </h5>
                  </div>
                  <hr style={{ borderColor: '#dedede', marginBottom: '20px' }} />
                  <div>
                    <table align="center" style={{ width: '100%' }}>
                      {/* Render employee details */}
                      {/* Add other fields as necessary */}
                      <tr>
                        <td
                          style={{
                            color: '#888888',
                            paddingRight: '15px',
                            fontWeight: '500',
                            width: '50%',
                          }}
                        >
                          Designation:
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: '500' }}>
                          {selectedEmployee.dpro_designation_offered}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: '#888888', paddingRight: '15px', fontWeight: '500' }}>
                          Email:
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: '500' }}>
                          {selectedEmployee.email1}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: '#888888', paddingRight: '15px', fontWeight: '500' }}>
                          Contact:
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: '500' }}>
                          {selectedEmployee.phone_mobile}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: '#888888', paddingRight: '15px', fontWeight: '500' }}>
                          Permanent Address:
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: '500' }}>
                          {selectedEmployee.permanent_address}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: '#888888', paddingRight: '15px', fontWeight: '500' }}>
                          Temp Address:
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: '500' }}>
                          {selectedEmployee.temp_address}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: '#888888', paddingRight: '15px', fontWeight: '500' }}>
                          Work Location:
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: '500' }}>
                          {selectedEmployee.work_location}
                        </td>
                      </tr>
                    </table>
                  </div>
                </SimpleCard>
              )}
            </Grid>
          </Grid>
        ) : (
          <h1>You don't have access to view this page</h1>
        )}
      </Container>
    </>
  );
};

export default EmployeeList;
