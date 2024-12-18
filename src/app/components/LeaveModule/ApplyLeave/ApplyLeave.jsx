import {
  Card,
  Box,
  styled,
  TextField,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@mui/material';
import SnackbarUtils from 'SnackbarUtils';
import { Breadcrumb } from 'app/components';
import AppGoBackBtn from 'app/components/ReusableComponents/AppGoBackBtn';
import AppthemeLoadingBtn from 'app/components/ReusableComponents/AppThemeLoadingBtn';
import commonRoutes from 'app/components/commonRoutes';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import { Field, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import commonConfig from '../../commonConfig';
import * as Yup from 'yup';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey',
    },
    '&:hover fieldset': {
      borderColor: 'dodgerblue',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'dodgerblue',
    },
    '& input': {
      color: 'black',
    },
    '& input::placeholder': {
      color: 'lightgrey',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'grey',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'dodgerblue',
  },
}));

const ApplyLeave = () => {
  const [loading, setLoading] = useState(false);
  const [LeaveData, setLeaveData] = useState([]);
  const [isFromDateDisabled, setIsFromDateDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: '',
    reporting_manager_name: '',
    paid_leave_balance: '',
    leave_duration: '',
    from_date: '',
    to_date: '',
    total_applied_leave: 0,
    reason: '',
  });

  const navigate = useNavigate();
  const authToken = getAccessToken();

  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() - 15);
  const formatDate = (date) => date.toISOString().split('T')[0];
  const minDateString = formatDate(minDate);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios(commonConfig.urls.getleavedata, {
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
      });
      setLoading(false);
      if (response?.data?.Response) {
        const data = response.data.Response[0];
        setLeaveData(data);

        setInitialValues({
          name: `${data.first_name} ${data.last_name}`,
          reporting_manager_name: `${data.manager_fname} ${data.manager_lname}`,
          paid_leave_balance: data.user_leave_count || 0,
          leave_duration: '',
          from_date: '',
          to_date: '',
          total_applied_leave: 0,
          reason: '',
        });
      }
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const validationSchema = Yup.object().shape({
    from_date: Yup.date()
      .min(
        new Date(new Date().setDate(new Date().getDate() - 15)),
        'From date cannot be earlier than 15 days before today'
      )
      .required('From date is required'),
    to_date: Yup.date().when('leave_duration', {
      is: 'Full Day',
      then: Yup.date()
        .min(Yup.ref('from_date'), 'To date cannot be earlier than from date')
        .required('To date is required for Full Day leave'),
    }),
    leave_duration: Yup.string().required('Leave duration is required'),
    reason: Yup.string().required('Reason is required'),
  });

  const handleTotalLeaveCalculation = (
    fromDate,
    toDate,
    leaveDuration,
    paidLeaveBalance,
    setFieldValue
  ) => {
    let totalDays = 0;
    if (leaveDuration === 'Half Day') {
      totalDays = 0.5;
    } else if (leaveDuration === 'Full Day' && fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      if (to >= from) {
        totalDays = (to - from) / (1000 * 60 * 60 * 24) + 1;
      }
    }
    setFieldValue('total_applied_leave', totalDays);

    if (totalDays > paidLeaveBalance) {
      SnackbarUtils.error('You have insufficient leave balance.');
    }
  };

  async function sendDataToServer(data) {
    try {
      setLoading(true);
      const response = await axios.post(commonConfig.urls.applyleave, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setLoading(false);
      if (response?.data?.Status === 'Failed') {
        SnackbarUtils.error(
          Object.values(response.data.Errors)
            .map((item) => item.toString())
            .toString()
        );
      }
      if (response?.data?.Status === 'Success') {
        SnackbarUtils.success('Leave Applied Successfully');
        navigate(commonRoutes.roles.roleList);
      }
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
    }
  }

  return (
    <>
      <Box className="breadcrumb" sx={{ m: 1 }}>
        <Breadcrumb
          routeSegments={[
            { name: 'Leave History', path: commonRoutes.leaves.leaveHistory },
            { name: 'Apply Leave' },
          ]}
        />
      </Box>

      <Container sx={{ display: 'flex', justifyContent: 'center', minWidth: '570px' }}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (values.leave_duration === 'Half Day') {
              values.total_applied_leave = 0.5;
              values.to_date = values.from_date;
            }
            sendDataToServer(values);
          }}
        >
          {({ values, handleChange, handleSubmit, setFieldValue, touched, errors }) => (
            <Card
              sx={{
                px: 3,
                pt: 1,
                pb: 2,
                width: '100%',
                maxWidth: '1300px',
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: '100%' }}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Name"
                      name="name"
                      fullWidth
                      margin="normal"
                      value={values.name}
                      disabled
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Reporting Manager Name"
                      name="reporting_manager_name"
                      fullWidth
                      margin="normal"
                      value={values.reporting_manager_name}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Paid Leave Balance"
                      name="paid_leave_balance"
                      fullWidth
                      margin="normal"
                      value={values.paid_leave_balance}
                      disabled
                      error={touched.paid_leave_balance && Boolean(errors.paid_leave_balance)}
                      helperText={touched.paid_leave_balance && errors.paid_leave_balance}
                    />
                  </Grid>
                  <Grid item xs={6} mt={2}>
                    <FormControl
                      fullWidth
                      error={touched.leave_duration && Boolean(errors.leave_duration)}
                    >
                      <InputLabel>Leave Duration</InputLabel>
                      <Select
                        name="leave_duration"
                        value={values.leave_duration}
                        label="Leave Duration"
                        onChange={(e) => {
                          const leaveDuration = e.target.value;
                          setFieldValue('leave_duration', leaveDuration);

                          // Enable "From Date" if a duration is selected
                          setIsFromDateDisabled(!leaveDuration);
                        }}
                      >
                        <MenuItem value="Half Day">Half Day</MenuItem>
                        <MenuItem value="Full Day">Full Day</MenuItem>
                      </Select>
                      <FormHelperText>
                        {touched.leave_duration && errors.leave_duration}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="From Date"
                      name="from_date"
                      type="date"
                      fullWidth
                      margin="normal"
                      value={values.from_date}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        min: minDateString, // Disable dates before 15 days from today
                      }}
                      onChange={(e) => {
                        setFieldValue('from_date', e.target.value);
                        if (values.leave_duration === 'Half Day') {
                          setFieldValue('to_date', e.target.value);
                          setFieldValue('total_applied_leave', 0.5);
                        } else {
                          handleTotalLeaveCalculation(
                            e.target.value,
                            values.to_date,
                            values.leave_duration,
                            values.paid_leave_balance,
                            setFieldValue
                          );
                        }
                      }}
                      disabled={isFromDateDisabled} // Dynamically enable/disable based on state
                      error={touched.from_date && Boolean(errors.from_date)}
                      helperText={touched.from_date && errors.from_date}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomTextField
                      label="To Date"
                      name="to_date"
                      type="date"
                      fullWidth
                      margin="normal"
                      value={values.to_date}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        setFieldValue('to_date', e.target.value);
                        if (values.leave_duration === 'Full Day') {
                          const fromDate = new Date(values.from_date);
                          const toDate = new Date(e.target.value);
                          if (toDate >= fromDate) {
                            const totalDays = (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1;
                            setFieldValue('total_applied_leave', totalDays);
                          } else {
                            SnackbarUtils.error(
                              'To Date must be greater than or equal to From Date'
                            );
                          }
                        }
                      }}
                      disabled={values.leave_duration === 'Half Day'} // Disable for Half Day
                      error={touched.to_date && Boolean(errors.to_date)}
                      helperText={touched.to_date && errors.to_date}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Total Applied Leave"
                      name="total_applied_leave"
                      fullWidth
                      margin="normal"
                      value={values.total_applied_leave}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      label="Reason"
                      name="reason"
                      fullWidth
                      margin="normal"
                      value={values.reason}
                      multiline
                      rows={4}
                      onChange={handleChange}
                      error={touched.reason && Boolean(errors.reason)}
                      helperText={touched.reason && errors.reason}
                    />
                  </Grid>
                </Grid>

                <div>
                  <AppthemeLoadingBtn
                    type="submit"
                    loading={loading}
                    variant="contained"
                    sx={{ my: 2 }}
                  >
                    Submit
                  </AppthemeLoadingBtn>
                  <AppGoBackBtn />
                </div>
              </Box>
            </Card>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default ApplyLeave;
