import { Box, Icon } from '@mui/material';
import { Formik } from 'formik';
import { useReducer, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';

import commonConfig from '../commonConfig';
import SnackbarUtils from 'SnackbarUtils';
import useApiOnce from 'app/hooks/useApiOnce';
import useRefreshData from 'app/hooks/useRefreshData';
import { getAccessToken } from 'app/utils/utils';
import AppthemeLoadingBtn from '../ReusableComponents/AppThemeLoadingBtn';
import AppThemeTextField from '../ReusableComponents/AppThemeTextField';
import AvatarUpload from './AvatarUpload';

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  file: null,
  is_deleted: 0,
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Kindly enter your First Name').label('First Name'),
  last_name: Yup.string().required('Kindly enter your Last Name').label('Last Name'),
  email: Yup.string()
    .email('Kindly enter a valid email')
    .required('Kindly enter a valid email')
    .label('Email'),
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: action.bool };
    case 'OPEN':
      return { ...state, open: action.bool };
    case 'RESPONSE_ERROR':
      return {
        ...state,
        hasError: action.bool,
        responseError: action.error_name,
      };
    default:
      return state;
  }
};

const createInitialValues = (responseObj) => {
  if (responseObj.first_name && responseObj.last_name && responseObj.email) {
    return {
      ...initialValues,
      first_name: responseObj.first_name,
      last_name: responseObj.last_name,
      email: responseObj.email,
      file: responseObj.profile_pic,
    };
  }
  return initialValues;
};

const EditUserProfile = ({ onclose }) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    open: false,
    responseError: '',
    hasError: false,
  });

  const { data: userObj } = useApiOnce(commonConfig.urls.getUserProfile);
  const { handleRefreshData } = useRefreshData(false);

  const user_id = useSelector((state) => state.userDetails?.user?.id);

  const sendDataToServer = async (recdData = {}) => {
    if (recdData.file === '') {
      delete recdData.file;
    }
    if (recdData.is_deleted === 0) {
      delete recdData.is_deleted;
    }
    const data = new FormData();
    Object.keys(recdData).forEach((item) => {
      if (Array.isArray(recdData[item])) {
        recdData[item].forEach((val, idx) => data.append(`${item}[${idx}]`, val));
      } else {
        data.append(item, recdData[item]);
      }
    });

    dispatch({ type: 'LOADING', bool: true });
    const authToken = getAccessToken();
    try {
      const response = await axios.post(commonConfig.urls.updateUserProfile, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.data.Status === 'Failed') {
        SnackbarUtils.error(Object.values(response.data.Errors).map((item) => item.toString()));
      } else if (response.data.Status === 'Success') {
        SnackbarUtils.success(response.data.Message);
        handleRefreshData();
        dispatch({ type: 'OPEN', bool: true });
        onclose();
      }
    } catch (error) {
      SnackbarUtils.error('An error occurred while updating the profile.');
    } finally {
      dispatch({ type: 'LOADING', bool: false });
    }
  };

  const renderFormField = (id, label, placeholder, value, handleChange, handleBlur, error, touched, type = 'text') => (
    <div key={id}>
      <AppThemeTextField
        id={id}
        name={id}
        required
        label={label}
        placeholder={placeholder}
        style={{ width: '80%' }}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(error && touched)}
        type={type}
      />
      {Boolean(touched && error) && <div style={{ color: 'red' }}>* {error}</div>}
    </div>
  );

  return (
    <Formik
      enableReinitialize
      initialValues={createInitialValues(userObj)}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const value = {
          ...values,
          user_id,
          file: values.file === userObj.profile_pic ? '' : values.file,
        };
        sendDataToServer(value);
      }}
    >
      {({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            width: '100%',
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div style={{ position: 'absolute', right: 20, top: 20 }}>
            <Icon onClick={onclose} style={{ cursor: 'pointer' }}>
              close
            </Icon>
          </div>
          <p
            style={{
              color: 'rgba(52, 49, 76, 0.54)',
              textAlign: 'center',
            }}
          >
            EDIT PROFILE
          </p>
          <div>
            <AvatarUpload />
          </div>
          <div style={{ marginLeft: '45px' }}>
            {['first_name', 'last_name', 'email'].map((field) =>
              renderFormField(
                field,
                field.replace('_', ' ').toUpperCase(),
                `Enter ${field.replace('_', ' ')}`,
                values[field],
                handleChange,
                handleBlur,
                errors[field],
                touched[field]
              )
            )}
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <AppthemeLoadingBtn type="submit" loading={state.loading} variant="contained" sx={{ my: 2 }}>
              Update
            </AppthemeLoadingBtn>
          </div>
        </Box>
      )}
    </Formik>
  );
};

export default EditUserProfile;
