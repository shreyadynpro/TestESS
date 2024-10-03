import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import { lightModeTheme } from 'app/components/MatxTheme/themeColors';
import commonRoutes from 'app/components/commonRoutes';
import DynpEssLT from 'app/components/AppLandingPage/assets/images/DynESS_LT.png';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { BackgroundImageBox, ContentBox, JWTRoot } from './JwtLoginStyles'; // Import styles

const initialValues = {
  email: '',
  password: '',
  remember: true,
};

// Form validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const captchaRef = useRef(null);
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
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={lightModeTheme}>
      <div className="topLogo" style={{ backgroundColor: '#ffffff' }}>
        <img
          src="https://www.dynpro.com/wp-content/uploads/2022/01/dynpro-logo-2-1-e1641987897332.png"
          alt="DynPro Logo"
          style={{ height: '51px', marginTop: '7px', backgroundColor: '#ffffff' }}
        />
      </div>

      <JWTRoot>
        <Grid container>
          <Grid
            item
            sm={5}
            xs={12}
            style={{
              backgroundColor: '#212e7c',
            }}
          >
            <Card className="card">
              <ContentBox>
                <img src={DynpEssLT} alt="DynESS Logo" style={{ height: '71px', margin: 'auto' }} />
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
                      <Input
                        autoComplete="on"
                        type="email"
                        fullWidth
                        size="small"
                        name="email"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('email', e.currentTarget.value);
                          setFieldTouched('email', true, false);
                        }}
                        value={values.email}
                        placeholder="Email"
                        sx={{ mb: 3 }}
                      />
                      <Input
                        autoComplete="on"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        size="small"
                        name="password"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('password', e.currentTarget.value);
                          setFieldTouched('password', true, false);
                        }}
                        value={values.password}
                        placeholder="Password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{ mb: 3 }}
                      />
                      <NavLink
                        to={commonRoutes.session.forgot_password}
                        style={{ color: '#01256c', marginLeft: '70%' }}
                      >
                        Forgot password?
                      </NavLink>
                      <ReCAPTCHA
                        sitekey={process.env.REACT_APP_SITE_KEY}
                        ref={captchaRef}
                        onChange={(value) => {
                          if (value) setDisableSubmit(false);
                        }}
                        onExpired={() => setDisableSubmit(true)}
                      />
                      <LoadingButton
                        disabled={!Object.keys(errors).length === 0 || disableSubmit}
                        type="submit"
                        loading={loading}
                        variant="contained"
                        sx={{
                          my: 2,
                          color: '#ffffff',
                          backgroundColor: '#212e7c',
                          '&:hover': {
                            backgroundColor: '#1a2465',
                          },
                        }}
                      >
                        Login
                      </LoadingButton>
                    </form>
                  )}
                </Formik>
              </ContentBox>
            </Card>
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            sx={{
              ml: '5%',
            }}
          >
            <h4 className="h1Heading">Welcome to our Employee Self Service Portal "DynESS"</h4>
            <BackgroundImageBox />
          </Grid>
        </Grid>
      </JWTRoot>
    </ThemeProvider>
  );
};

export default JwtLogin;
