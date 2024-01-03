import { Link } from 'react-router-dom';
import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthCardWrapper from '../../components/auth/authCardWrapper';
import AuthLogin from '../../components/auth/auth-forms/authLogin';
import Logo from '../../components/Logo';
import AuthFooter from '../../components/AuthFooter';
import AuthWrapper2 from '../../components/auth/authwrapper';
import LogoSection from '../../layout/MainLayout/LogoSection';
import { themePalette } from '@/themes/schemes/palette';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper2>
      <>
        <Grid
          sx={{
            background: 'rgba(255, 255, 255, 0.7)',
            height: '100%',
            pt: 3,
          }} /* item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }} */
        >
          <Grid>
            <Grid display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Link to="#">
                <LogoSection />
              </Link>
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid>
                <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                  <Grid item>
                    <Stack alignItems="center" justifyContent="center">
                      <Typography color={theme.palette.primary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                        Hi, Welcome Back
                      </Typography>
                      <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                        Enter your credentials to continue
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <AuthLogin />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid item container direction="column" alignItems="center" xs={12}>
                  <Typography component={Link} to="/auth/register" variant="subtitle1" sx={{ textDecoration: 'none', display: 'flex', gap: 1 }}>
                    Don&apos;t have an account?{' '}
                    <Typography variant="subtitle1" color={themePalette.primary.main}>
                      Sign up
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} textAlign={'center'} justifyContent={'center'} display={'flex'}>
            <AuthFooter />
          </Grid>
        </Grid>
      </>
    </AuthWrapper2>
  );
};

export default Login;
