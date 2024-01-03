import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons-react';
import { componentThemeoption } from '../../../themes/schemes/PureLightTheme';
import { themePalette } from '../../../themes/schemes/palette';
import { useTypedSelector } from '../../../store';
import { useWhoamiQuery } from '../../../store/services/userAuth.service';
import LogoImg from '../../../assets/images/Logo-Small-19.png';

import { useNavigate } from 'react-router';
import { IUser } from '@/types/user';
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }: { handleLeftDrawerToggle: () => void }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const state = useTypedSelector(state => state);
  const hasToken = sessionStorage.getItem('auth_token');
  if (!hasToken) {
    return (
      <ButtonBase disableRipple>
        <img src={LogoImg} style={{ objectFit: 'contain' }} alt="Logo" width={100} height={50} />
      </ButtonBase>
    );
  }
  const { data, error, isError, isLoading } = useWhoamiQuery();
  if (hasToken && !data && !isLoading) {
    navigate('/auth/login');
  }

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box
          component="span"
          sx={{
            display: { xs: hasToken && 'none', md: 'block' },
            flexGrow: 1,
          }}
        >
          <LogoSection />
        </Box>
        {hasToken && (
          <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Avatar
              variant="rounded"
              sx={{
                ...componentThemeoption.commonAvatar,
                ...componentThemeoption.mediumAvatar,
                transition: 'all .2s ease-in-out',
                background: themePalette.secondary.light,
                color: themePalette.primary.main,
                '&:hover': {
                  background: themePalette.primary.main,
                  color: themePalette.secondary.light,
                },
              }}
              onClick={handleLeftDrawerToggle}
              color="inherit"
            >
              <IconMenu2 stroke={1.5} size="1.3rem" />
            </Avatar>
          </ButtonBase>
        )}
      </Box>

      {/* header search */}
      {/* <SearchSection /> */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      {hasToken && (
        <>
          <NotificationSection />

          <ProfileSection userData={data as IUser} />
        </>
      )}
    </>
  );
};

export default Header;
