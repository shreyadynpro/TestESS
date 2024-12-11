import commonConfig from 'app/components/commonConfig';
import useApi from 'app/hooks/useApi';
import axios from 'axios';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Card, Grid, TextField, styled } from '@mui/material';
import SnackbarUtils from 'SnackbarUtils';
import { Breadcrumb } from 'app/components';
import AppGoBackBtn from 'app/components/ReusableComponents/AppGoBackBtn';
import AppthemeLoadingBtn from 'app/components/ReusableComponents/AppThemeLoadingBtn';
import commonRoutes from 'app/components/commonRoutes';
import useRefreshData from 'app/hooks/useRefreshData';
import { getAccessToken } from 'app/utils/utils';
import groupModuleUtils from '../util';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

export default function EditGroupMaster() {
  const [loading, setLoading] = useState(false);
  const [updateOld, setUpdateOld] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: groupInfo, loading: groupLoading } = useApi(
    commonConfig.urls.groups + '/' + location.state.group_id
  );
  const { handleRefreshData } = useRefreshData(false);

  const [initialValues, setInitialValues] = useState(groupModuleUtils.initialValues);

  useEffect(() => {
    if (groupInfo) {
      setInitialValues(
        groupModuleUtils.createInitalValues(groupInfo) || groupModuleUtils.initialValues
      );
    }
  }, [groupInfo]);

  async function sendDataToServer(data) {
    const authToken = getAccessToken();
    try {
      setLoading(true);
      const response = updateOld
        ? await axios.put(commonConfig.urls.groups + '/' + location.state.group_id, data, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
        : await axios.put(commonConfig.urls.groups + '/' + location.state.group_id, data, {
            headers: { Authorization: `Bearer ${authToken}` },
          });

      setLoading(false);
      if (response && response.data.Code === 406) {
        if (response.data.Errors)
          SnackbarUtils.error(Object.values(response.data.Errors).map((item) => item.toString()));
      }
      if (response && response.data.Code === 401) {
        SnackbarUtils.error(Object.values(response.data.Errors).map((item) => item.toString()));
      }
      if (response && response.data.Status === 401) {
        SnackbarUtils.error(response.data?.Message);
      }

      if (response && response.data.Status === 'Success') {
        SnackbarUtils.success(response.data.Message);
        navigate(commonRoutes.groupMaster.groupMasterlist);
        handleRefreshData();
      }
    } catch (error) {
      setLoading(false);
      SnackbarUtils.error(error?.message || 'Something went wrong!!');
    }
  }

  const verifyErrors = (errors, touched, fieldName) => {
    if (Boolean(touched[fieldName] && errors[fieldName]))
      return <div style={{ color: 'red' }}>* {errors[fieldName]}</div>;
    return null;
  };

  return (
    <>
      <Box className="breadcrumb" sx={{ m: 1 }}>
        <Breadcrumb
          routeSegments={[
            {
              name: 'Group List',
              path: commonRoutes.groupMaster.groupMasterlist,
            },
            { name: 'Edit Group' },
          ]}
        />
      </Box>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        {groupLoading ? (
          <p>Loading...</p>
        ) : (
          <Formik
            enableReinitialize={true}
            validationSchema={
              updateOld ? groupModuleUtils.validationSchema : groupModuleUtils.validationEditSchema
            }
            initialValues={initialValues}
            onSubmit={(values) => {
              sendDataToServer({
                group_id: updateOld ? values.group_id : location.state.group_id,
                group_name: values.group_name,
              });
            }}
          >
            {({
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              setFieldValue,
            }) => {
              return (
                <Card sx={{ px: 3, pt: 1, pb: 2, width: '100%', maxWidth: '1000px' }}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                      width: '100%',
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} lg={6}>
                        <Grid container direction="column" spacing={2}>
                          <Grid item>
                            <div>
                              <TextField
                                id="group_name"
                                name="group_name"
                                required
                                label="Group Name"
                                placeholder="Enter Group Name"
                                style={{ width: '80%' }}
                                value={values.group_name}
                                onChange={handleChange('group_name')}
                                onBlur={handleBlur}
                                error={Boolean(errors.group_name && touched.group_name)}
                              />
                              {verifyErrors(errors, touched, 'group_name')}
                            </div>
                          </Grid>
                          <Grid item>
                            <AppthemeLoadingBtn
                              type="submit"
                              loading={loading}
                              variant="contained"
                              sx={{ my: 2 }}
                              onClick={handleSubmit}
                            >
                              Submit
                            </AppthemeLoadingBtn>
                            <AppGoBackBtn />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              );
            }}
          </Formik>
        )}
      </Container>
    </>
  );
}
