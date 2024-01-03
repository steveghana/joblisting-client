import { Box, Grid, Paper, Typography, CssBaseline, Button } from '@mui/material';
import CustomButton from '../button';
import { themePalette } from '@/themes/schemes/palette';
import pattern from '@/assets/images/auth/auth-pattern-dark.svg';
import Logo from '@/assets/images/Logo-Small-19.png';
import AuthPattern from '@/assets/Shape_17.png';
import Rocket from '@/assets/images/users/pic-3.png';
import Contact from '@/assets/images/users/contact.png';
import { useGetRolesQuery } from '@/store/services/userAuth.service';
import { IProfession } from '@/types/roles';
import { getAvailableRoles } from '@/utils/checkvalid';
export default function AuthWrapper2(props: { children: React.ReactNode }) {
  const { data } = useGetRolesQuery(undefined, { refetchOnFocus: true, refetchOnReconnect: true, refetchOnMountOrArgChange: 5 });
  const availableRoles = getAvailableRoles(data as IProfession[]);
  console.log(availableRoles);
  sessionStorage.setItem('rolesAvailable', JSON.stringify(availableRoles));
  return (
    <>
      <CssBaseline />
      <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden', display: 'flex' }}>
        <Grid item md={6} lg={6} sx={{ display: { md: 'flex', xs: 'none' } }}>
          <Box
            display={'flex'}
            position={'relative'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            sx={{
              color: 'white',
              background: 'rgba(21, 101, 192, 0.85)',
              backgroundImage: `url(${pattern})`,
              backgroundSize: 'cover',
            }}
            gap={2}
            width={'100%'}
            height={'100%'}
            textAlign={'center'}
          >
            <Box position={'absolute'} className="top" sx={{ p: 5, top: 0, left: 0, mr: 7 }}>
              <img width={90} src={Rocket} alt="" />
            </Box>
            <Box position={'absolute'} className="middle" sx={{ p: 5, top: 80, mx: 'auto' }}>
              <img width={350} src={Logo} alt="" />
            </Box>
            <Box position={'absolute'} className="middle" sx={{ p: 5, mx: 'auto', zIndex: 0, opacity: 0.06 }}>
              <img width={450} src={Contact} alt="" />
            </Box>
            <Typography fontWeight={700} sx={{ zIndex: 1 }} color={'white'} variant="h1">
              Welcome to Savannah Tech
            </Typography>
            <Typography sx={{ zIndex: 1 }} variant="body1">
              We connect talented developers across Africa with clients all over the world.
            </Typography>
            <Button variant="outlined" sx={{ color: 'white !important', borderRadius: '20px' }} size="small" color="primary">
              Lets Get started
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              mx: 4,
              display: 'flex',
              // width: '100%',
              height: '100%',
              flexDirection: 'column',
              backgroundImage: `url(${AuthPattern})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              zIndex: 44,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {props.children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
