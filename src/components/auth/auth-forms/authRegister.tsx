import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from "react-redux";

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';

// project imports
import useScriptRef from '../../../hooks/useScriptRef';
// import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from '../../extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { themeTypography } from '../../../themes/schemes/typography';
import CustomButton from '../../button';
import { useGetRolesQuery, useRegisterUserMutation, useRegisterUserWithGoogleMutation } from '../../../store/services/userAuth.service';
import { Send } from '@mui/icons-material';
import { handleSocial } from './authLogin';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { TransparentScreeProgress } from '../../FullscreenProgress/FullscreenProgress';
import { Social } from './authicons';
import { getAvailableRoles, isRegistrationOpen } from '@/utils/checkvalid';
import { IProfession } from '@/types/roles';
interface RegisterFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  submit: null;
}
// ===========================|| AUTH - REGISTER ||=========================== //

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState<{ label: string; color: any }>();
  const [regAvailable, setRegAvailable] = useState<boolean>(false);
  const [registerUser, { isError, error, isLoading }] = useRegisterUserMutation();
  const [registerWithGoogle, { isLoading: isWithGoogleLoading, isError: isWithGoogleErr }] = useRegisterUserWithGoogleMutation();
  const router = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  async function register(values: RegisterFormValues, setters: FormikHelpers<RegisterFormValues>, scriptedRef: React.MutableRefObject<boolean>) {
    let rolesAvailable: string[] = JSON.parse(sessionStorage.getItem('rolesAvailable') as string);
    if (!rolesAvailable.length) {
      setters.setSubmitting(false);
      setters.resetForm();
      toast.warning(`Registeration is closed at the moment, contact support`, { position: 'bottom-center' });
      return false;
    } else {
      const { setStatus, setErrors, setSubmitting } = setters;

      const { firstName, password, email, lastName, role: userRole, phoneNumber } = values;

      try {
        const data = await registerUser({
          user: {
            firstName,
            password,
            email,
            phoneNumber,
            lastName,
          },
        }).unwrap();

        if (!data) return;

        const { token } = data;

        if (token) {
          sessionStorage.setItem(
            'tempUserinfo',
            JSON.stringify({
              email,
              password,
            }),
          );

          router('/role/select');

          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }

          return true;
        }
      } catch (error: any) {
        console.log(error);
        setStatus({ success: false });
        // setErrors({ submit: Something wen });
        setSubmitting(false);
      }
    }
  }

  const onGoogleSuccess = async (codeResponse: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>) => {
    let rolesAvailable: string[] = JSON.parse(sessionStorage.getItem('rolesAvailable') as string) || [];
    if (!rolesAvailable.length) {
      toast.warning(`Registeration is closed at the moment, contact support`, { position: 'bottom-center' });
      return false;
    } else {
      try {
        const response = await registerWithGoogle({
          accessToken: codeResponse.access_token,
        }).unwrap();

        if (response.token) {
          const { email, password } = response;
          //This is a temporal user info login credential, tempUserinfo will be cleared upon login
          sessionStorage.setItem(
            'tempUserinfo',
            JSON.stringify({
              email,
              password,
            }),
          );
          router('/role/select');
        }
      } catch (error) {
        toast.error("Couldn't register with Google, please try again later", {
          position: 'bottom-center',
        });
      }
    }
  };

  const loginAuth = useGoogleLogin({
    onSuccess: (codeResponse) => onGoogleSuccess(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });
  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };
  useEffect(() => {
    changePassword('123456');
  }, []);
  return (
    <>
      {!regAvailable ||
        (isWithGoogleLoading && (
          <Grid
            sx={{
              background: 'rgba(23, 22, 22, 0.19)',
              position: 'absolute',
              zIndex: '3',
              inset: '0 0 0 0',
              // height: "100dvh",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TransparentScreeProgress />
          </Grid>
        ))}
      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          role: 'Ceo' || 'Marketing' || 'Recruitment' || 'Developer',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),

          phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{8,15}$/, 'Please enter a valid phone number')
            .required('Please enter your phone number'),
        })}
        onSubmit={async (values, setters) => {
          await register(values, setters, scriptedRef);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  margin="normal"
                  value={values.firstName}
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  sx={{ ...themeTypography.customInput }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={values.lastName}
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  sx={{ ...themeTypography.customInput }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  value={values.phoneNumber}
                  label="Phone"
                  margin="normal"
                  name="phoneNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="tel"
                  sx={{ ...themeTypography.customInput }}
                />
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.phoneNumber}
                </FormHelperText>
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...themeTypography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...themeTypography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 1 }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}
            <Grid item xs={12}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                <Button
                  variant="outlined"
                  sx={{
                    cursor: 'unset',
                    borderColor: `${theme.palette.grey[100]} !important`,
                    color: `${theme.palette.grey[900]}!important`,
                    fontWeight: 500,
                  }}
                  disableRipple
                  disabled
                >
                  OR
                </Button>

                <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
              </Box>
            </Grid>

            <Grid display={'flex'} justifyContent="center" alignItems={'center'} item xs={12}>
              <AnimateButton>
                <Button
                  aria-label={`login button`}
                  onClick={() => loginAuth()}
                  disabled={isSubmitting || isLoading || isWithGoogleLoading}

                  // disabled={renderProps.disabled}
                >
                  {React.createElement(Social['Google'].icon)}
                </Button>
              </AnimateButton>
              <>
                {Object.entries(handleSocial)?.map(([key, handler], i) => {
                  if (typeof handler !== 'function' || !Social[key] || !Social[key].icon) return null;
                  return (
                    <AnimateButton key={i}>
                      <Button
                        key={key}
                        aria-label={`${key} login button`}
                        onClick={handler}
                        disabled={isSubmitting || isLoading || isWithGoogleLoading}
                      >
                        {React.createElement(Social[key].icon)}
                      </Button>
                    </AnimateButton>
                  );
                })}
              </>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {isError && (
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                <FormHelperText error>{error as string}</FormHelperText>
              </Box>
            )}
            {errors.submit && (
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                <FormHelperText error>{errors.submit as string}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 0 }}>
              <AnimateButton>
                <CustomButton
                  disableElevation
                  disabled={isSubmitting || isLoading || isWithGoogleLoading || level?.label === 'Weak' || level?.label === 'Poor'}
                  loading={isSubmitting || isLoading || isWithGoogleLoading}
                  fullWidth
                  size="large"
                  variant="contained"
                  text="Sign up"
                  type="submit"
                  loadingPosition="end"
                  // endIcon={<Send />}

                  // color="secondary"
                />
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
