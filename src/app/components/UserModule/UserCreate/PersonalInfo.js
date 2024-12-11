import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import SnackbarUtils from 'SnackbarUtils';
import AppThemeTextField from 'app/components/ReusableComponents/AppThemeTextField';
import commonConfig from 'app/components/commonConfig';
import useApi from 'app/hooks/useApi';
import { getAccessToken } from 'app/utils/utils';
import axios from 'axios';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import util from '../util';

export default function PersonalInfo({ showPassword }) {
  const { values, handleChange, errors, touched, handleBlur, setFieldValue } = useFormikContext();
  const { data: userGroups } = useApi(commonConfig.urls.groupList);
  const { data: userGroupRoles } = useApi(commonConfig.urls.getRole);
  const [data, setData] = useState([]);
  const authToken = getAccessToken();
  useEffect(() => {
    if (values.personalInfo.role_id) {
      const fetchData = async () => {
        try {
          const response = await axios(
            commonConfig.urls.roles + '/' + values.personalInfo.role_id,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.data?.Response) {
            setData(response['data']['Response']);
            setFieldValue(
              'userAccess',
              util.retRoleAccessObj(
                util.transformUserAccessObj(
                  util.initialValues.userAccess,
                  response['data']['Response'][0]
                )
              )
            );
          }
        } catch (error) {
          SnackbarUtils.error(error?.message || 'Something went wrong!!');
        }
      };
      fetchData();
    }
  }, [values.personalInfo.role_id]);

  const verifyErrors = (errors, touched, fieldName) => {
    if (
      Boolean(
        errors.personalInfo &&
          touched.personalInfo &&
          touched.personalInfo[fieldName] &&
          errors.personalInfo[fieldName]
      )
    )
      return <div style={{ color: 'red' }}>* {errors.personalInfo[fieldName]}</div>;
    return null;
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        width: '100%',
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        {/* Radio Button Group */}
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Employee Type
        </label>
        <div style={{ display: 'flex', gap: '16px' }}>
          <label>
            <input
              type="radio"
              name="employeeType"
              value="Billable"
              checked={values.personalInfo.employeeType === 'Billable'}
              onChange={handleChange('personalInfo.employeeType')}
              onBlur={handleBlur}
            />
            Billable
          </label>
          <label>
            <input
              type="radio"
              name="employeeType"
              value="Non-Billable"
              checked={values.personalInfo.employeeType === 'Non-Billable'}
              onChange={handleChange('personalInfo.employeeType')}
              onBlur={handleBlur}
            />
            Non-Billable
          </label>
        </div>
        {/* Error Message */}
        {errors.personalInfo &&
          touched.personalInfo &&
          touched.personalInfo.employeeType &&
          errors.personalInfo.employeeType && (
            <span style={{ color: 'red', fontSize: '12px' }}>
              {errors.personalInfo.employeeType}
            </span>
          )}
      </div>

      <div>
        <AppThemeTextField
          id="personalInfo.first_name"
          required
          label="First Name"
          placeholder="Enter First Name"
          style={{ width: '100%' }}
          value={values.personalInfo.first_name}
          onChange={handleChange('personalInfo.first_name')}
          onBlur={handleBlur}
          error={Boolean(
            errors.personalInfo &&
              touched.personalInfo &&
              touched.personalInfo.first_name &&
              errors.personalInfo.first_name
          )}
        />
      </div>
      {Boolean(
        errors.personalInfo &&
          touched.personalInfo &&
          touched.personalInfo.first_name &&
          errors.personalInfo.first_name
      ) && <div style={{ color: 'red' }}>* {errors.personalInfo.first_name}</div>}
      <div>
        <AppThemeTextField
          required
          fullWidth
          id="personalInfo.last_name"
          label="Last Name"
          placeholder="Enter Last Name"
          value={values.personalInfo.last_name}
          style={{ width: '100%' }}
          onChange={handleChange('personalInfo.last_name')}
          onBlur={handleBlur}
          error={Boolean(
            errors.personalInfo &&
              touched.personalInfo &&
              touched.personalInfo.last_name &&
              errors.personalInfo.last_name
          )}
        />
      </div>
      {Boolean(
        errors.personalInfo &&
          touched.personalInfo &&
          touched.personalInfo.last_name &&
          errors.personalInfo.last_name
      ) && <div style={{ color: 'red' }}>* {errors.personalInfo.last_name}</div>}
      <div>
        <AppThemeTextField
          required
          id="personalInfo.email"
          label="Email Address"
          placeholder="Enter Email Address"
          style={{ width: '100%' }}
          onChange={handleChange('personalInfo.email')}
          onBlur={handleBlur}
          value={values.personalInfo.email}
          error={Boolean(
            errors.personalInfo &&
              touched.personalInfo &&
              touched.personalInfo.email &&
              errors.personalInfo.email
          )}
        />
        {verifyErrors(errors, touched, 'email')}
      </div>
      {showPassword && (
        <div>
          <AppThemeTextField
            id="personalInfo.password"
            label="Password"
            type="password"
            style={{ width: '100%' }}
            onChange={handleChange('personalInfo.password')}
            onBlur={handleBlur}
            value={values.personalInfo.password}
            error={Boolean(
              errors.personalInfo &&
                touched.personalInfo &&
                touched.personalInfo.password &&
                errors.personalInfo.password
            )}
          />
          {verifyErrors(errors, touched, 'password')}
        </div>
      )}

      <div>
        <AppThemeTextField
          id="personalInfo.dynmis_empid"
          required
          label="Employee Id"
          placeholder="Enter DynMis Emp Id"
          style={{ width: '100%' }}
          value={values.personalInfo.dynmis_empid}
          onChange={handleChange('personalInfo.dynmis_empid')}
          onBlur={handleBlur}
          error={Boolean(
            errors.personalInfo &&
              touched.personalInfo &&
              touched.personalInfo.dynmis_empid &&
              errors.personalInfo.dynmis_empid
          )}
        />
      </div>
      <div>
        <AppThemeTextField
          variant="standard"
          required
          defaultValue={''}
          value={values.personalInfo.group_id || ''}
          name="personalInfo.group_id"
          id="personalInfo.group_id"
          select
          label="Groups"
          placeholder="Select Groups"
          style={{ width: '100%' }}
          onChange={handleChange('personalInfo.group_id')}
          onBlur={handleBlur}
          error={Boolean(
            errors.personalInfo &&
              touched.personalInfo &&
              touched.personalInfo.group_id &&
              errors.personalInfo.group_id
          )}
        >
          {userGroups.map((option, index) => (
            <MenuItem key={index} value={option.group_id}>
              {option.group_name}
            </MenuItem>
          ))}
        </AppThemeTextField>
        {verifyErrors(errors, touched, 'group_id')}
      </div>
      {
        <div>
          <AppThemeTextField
            required
            variant="standard"
            id="personalInfo.role_id"
            name="personalInfo.role_id"
            defaultValue={''}
            value={values.personalInfo.role_id || ''}
            style={{ width: '100%' }}
            select
            label="Roles"
            placeholder="Select Roles"
            validateOnChange={false}
            validateOnBlur={false}
            onChange={handleChange('personalInfo.role_id')}
            onBlur={handleBlur}
            error={Boolean(
              errors.personalInfo &&
                touched.personalInfo &&
                touched.personalInfo.role_id &&
                errors.personalInfo.role_id
            )}
          >
            {userGroupRoles.map((option, index) => (
              <MenuItem key={index} value={option.role_id}>
                {option.role}
              </MenuItem>
            ))}
          </AppThemeTextField>
          {verifyErrors(errors, touched, 'role')}
        </div>
      }
    </Box>
  );
}
