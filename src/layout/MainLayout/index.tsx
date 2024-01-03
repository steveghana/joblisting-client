import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Theme, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from '../../components/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import navigation from '../../routes/menu-items';

import { drawerWidth } from '../../store/constant';
import { SET_MENU } from '../../store/actions';

// assets
import { componentThemeoption } from '../../themes/schemes/PureLightTheme';
import { Protect } from '../../components/auth/requireAuth';
import { IconChevronRight } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

// styles
interface MainProps {
  open: boolean;
  theme: Theme;
}

const Main = styled('main', {
  shouldForwardProp: (prop: string | number) => prop !== 'open',
})<MainProps>(({ theme, open }) => ({
  ...componentThemeoption.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,

  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        },
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px',
  },
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // Handle left drawer
  const leftDrawerOpened = useSelector((state: any) => state.customization?.opened);
  const hasToken = sessionStorage.getItem('auth_token');
  const [sideBarTitle, setSidebarTitle] = useState('');
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({
      type: SET_MENU,
      opened: !hasToken ? false : !leftDrawerOpened,
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar
        navTitle={(title) => setSidebarTitle(title)}
        drawerOpen={!hasToken ? false : !matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      <Main theme={theme} open={leftDrawerOpened}>
        <AnimatePresence mode="popLayout">
          <Outlet />
        </AnimatePresence>
      </Main>
    </Box>
  );
};
// export default Protect(MainLayout, ['Ceo', 'Recruitment']);

export default MainLayout;
