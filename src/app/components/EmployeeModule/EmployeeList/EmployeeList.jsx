import { Box, Grid, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import AppTableSearchBox from 'app/components/ReusableComponents/AppTableSearchBox';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import commonConfig from '../../commonConfig';
import PaginationTable from './AppPaginateEmployee';
import SnackbarUtils from 'SnackbarUtils';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const EmployeeList = () => {
  const [searched, setSearched] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  const requestSearch = (searchedVal) =>
    data.filter((row) => {
      return (row.first_name + ' ' + row.last_name + ' ' + row.email1)
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });

  const [data, setData] = useState([]);
  const authToken = getAccessToken();

  const employeeViewPermission = useSelector(
    (state) => state.userAccessPermissions?.userPermissions?.employees_view
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getEmployeeList, {
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
      });
      setLoading(false);
      if (response && response['data'] && response['data']) setData(response['data']);
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearched(e.currentTarget.value);
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
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
                backgroundColor: '#ffffff',
                borderRadius: '5px',
                padding: '25px',
              }}
            >
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
                    Employees List
                  </span>
                </Grid>
                <Grid item xs={6}>
                  <AppTableSearchBox onSearch={handleSearch} top="148px" />
                </Grid>
              </Grid>
              <PaginationTable
                loading={loading}
                fetchData={fetchData}
                data={searched ? requestSearch(searched) : data}
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

                    <h2 style={{ color: '#3b5998', marginBottom: '5px', fontWeight: '600' }}>
                      {selectedEmployee.salutation} {selectedEmployee.first_name}{' '}
                      {selectedEmployee.last_name}
                    </h2>
                    <h5 style={{ color: '#3b5998', marginBottom: '15px', fontWeight: '500' }}>
                      #{selectedEmployee.emp_id} | {selectedEmployee.dpro_designation_offered}
                    </h5>
                  </div>
                  <hr style={{ borderColor: '#dedede', marginBottom: '20px' }} />
                  <div>
                    <table align="center" style={{ width: '100%' }}>
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
                        <td style={{ color: '#333333', textAlign: 'right', fontWeight: '500' }}>
                          {selectedEmployee.dpro_designation_offered}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: '#888888', paddingRight: '15px', fontWeight: '500' }}>
                          Email:
                        </td>
                        <td style={{ color: '#333333', textAlign: 'right', fontWeight: '500' }}>
                          {selectedEmployee.email1}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: '#888888', paddingRight: '15px', fontWeight: '500' }}>
                          Contact:
                        </td>
                        <td style={{ color: '#333333', textAlign: 'right', fontWeight: '500' }}>
                          {selectedEmployee.phone_mobile}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: '#888888', paddingRight: '15px', fontWeight: '500' }}>
                          Permanent Address:
                        </td>
                        <td style={{ color: '#333333', textAlign: 'right', fontWeight: '500' }}>
                          {selectedEmployee.permanent_address}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: '#888888', paddingRight: '15px', fontWeight: '500' }}>
                          Temp Address:
                        </td>
                        <td style={{ color: '#333333', textAlign: 'right', fontWeight: '500' }}>
                          {selectedEmployee.temp_address}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: '#888888', paddingRight: '15px', fontWeight: '500' }}>
                          Work Location:
                        </td>
                        <td style={{ color: '#333333', textAlign: 'right', fontWeight: '500' }}>
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
