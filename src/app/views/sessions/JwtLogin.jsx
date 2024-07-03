import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Checkbox,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import BgImg from 'app/components/AppLandingPage/assets/images/1.jpg';
import { lightModeTheme } from 'app/components/MatxTheme/themeColors';
import { Paragraph } from 'app/components/Typography';
import commonRoutes from 'app/components/commonRoutes';

import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const verifyErrors = (errorName, touchedName) => {
  if (Boolean(touchedName && errorName)) return <div style={{ color: 'red' }}>* {errorName}</div>;
  return null;
};

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));
const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));
const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
  backgroundImage: `url(${BgImg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// initial login credentials

const initialValues = {
  email: '',
  password: '',
  remember: true,
};

// form field validation schema

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const captchaRef = useRef(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = useTheme();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);

    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (error) {
      //// SnackbarUtils.error(error?.message || 'Something went wrong!!');
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={lightModeTheme}>
      <JWTRoot>
        <Card className="card">
          <Grid container>
            <Grid item sm={6} xs={12}>
              <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#25326d',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '4rem',
                  }}
                >
                  Dynalytix
                </Typography>
              </JustifyBox>
            </Grid>

            <Grid item sm={6} xs={12}>
              <ContentBox>
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldTouched,
                    setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      {verifyErrors(errors.email, touched.email)}
                      <Input
                        autoComplete="on"
                        type="email"
                        fullWidth
                        size="small"
                        name="email"
                        label="Email"
                        variant="standard"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('email', e.currentTarget.value);
                          setFieldTouched('email', true, false);
                        }}
                        value={values.email}
                        error={Boolean(errors.email && touched.email)}
                        placeholder="Email"
                        sx={{ mb: 3 }}
                      />
                      {verifyErrors(errors.password, touched.password)}
                      <Input
                        autoComplete="on"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        size="small"
                        name="password"
                        label="Password"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('password', e.currentTarget.value);
                          setFieldTouched('password', true, false);
                        }}
                        value={values.password}
                        error={Boolean(errors.password && touched.password)}
                        placeholder="Password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{ mb: 3 }}
                      />
                      <ReCAPTCHA
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        ref={captchaRef}
                        onChange={(value) => {
                          if (value) setDisableSubmit(false);
                        }}
                        onExpired={() => setDisableSubmit(true)}
                      />
                      <FlexBox justifyContent="space-between">
                        <FlexBox gap={1}>
                          <Checkbox
                            size="small"
                            name="remember"
                            onChange={handleChange}
                            checked={values.remember}
                            sx={{ padding: 0 }}
                          />
                          <Paragraph>Remember Me</Paragraph>
                        </FlexBox>

                        <NavLink
                          to={commonRoutes.session.forgot_password}
                          style={{ color: theme.palette.primary.main }}
                        >
                          Forgot password?
                        </NavLink>
                      </FlexBox>
                      <LoadingButton
                        disabled={
                          !(
                            Object.keys(errors).length === 0 &&
                            Boolean(touched.email) &&
                            Boolean(touched.password) &&
                            !disableSubmit
                          )
                        }
                        type="submit"
                        color="primary"
                        loading={loading}
                        variant="contained"
                        sx={{ my: 2 }}
                      >
                        Login
                      </LoadingButton>
                      <Paragraph>
                        Don't have an account?
                        <NavLink
                          to={commonRoutes.session.signup}
                          style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                        >
                          Register
                        </NavLink>
                      </Paragraph>
                    </form>
                  )}
                </Formik>
              </ContentBox>
            </Grid>
          </Grid>
        </Card>
      </JWTRoot>
    </ThemeProvider>
  );
};

export default JwtLogin;
