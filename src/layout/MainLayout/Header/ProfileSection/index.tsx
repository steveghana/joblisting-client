import React, { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  Popper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
// import MainCard from 'ui-component/cards/MainCard';
// import Transitions from 'ui-component/extended/Transitions';
// import User1 from "../../../../assets/images/users/user-round.svg";

// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons-react';

import Transitions from '../../../../components/extended/Transitions';
import MainCard from '../../../../components/MainCard';
import { componentThemeoption } from '../../../../themes/schemes/PureLightTheme';
import { themePalette } from '../../../../themes/schemes/palette';
import AnimateButton from '../../../../components/extended/AnimateButton';
import { IUser, Iuser } from '../../../../types/user';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = ({ userData: user }: { userData: Omit<IUser, 'token'> }) => {
  const theme = useTheme();
  const customization = useSelector((state: any) => state.customization);
  const navigate = useNavigate();

  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState('');
  const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef<HTMLDivElement>(null);
  const handleLogout = async () => {
    sessionStorage.clear();
    navigate('auth/login');
    console.log('Logout');
  };

  const handleClose = (event: { target: Node | null }) => {
    //@ts-ignore
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event: any, index: React.SetStateAction<number>, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef!.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
  componentThemeoption;

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: themePalette.primary.light,
          backgroundColor: themePalette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: themePalette.primary.main,
            background: `${themePalette.primary.main}!important`,
            color: themePalette.primary.light,
            '& svg': {
              stroke: themePalette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={user?.avatar}
            sx={{
              ...componentThemeoption.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <AnimateButton direction="down" type="rotate">
            <IconSettings stroke={1.5} size="1.5rem" color={themePalette.primary.main} />
          </AnimateButton>
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={(e: any) => handleClose(e)}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Good Morning,</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {user?.firstName} {user?.lastName}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">{user?.role}</Typography>
                    </Stack>
                    <OutlinedInput
                      sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                      id="input-search-profile"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search profile options"
                      startAdornment={
                        <InputAdornment position="start">
                          <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                      }
                      aria-describedby="search-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                    <Divider />
                  </Box>
                  <PerfectScrollbar
                    style={{
                      height: '100%',
                      maxHeight: 'calc(100vh - 250px)',
                      overflowX: 'hidden',
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Divider />
                      <Card
                        sx={{
                          bgcolor: themePalette.primary.light,
                          my: 2,
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3} direction="column">
                            <Grid item>
                              <Grid item container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1">Allow Notifications</Typography>
                                </Grid>
                                <Grid item>
                                  <Switch checked={notification} onChange={(e) => setNotification(e.target.checked)} name="sdm" size="small" />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%',
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5,
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 0}
                          onClick={(event) => handleListItemClick(event, 0, `management/profile/settings/${user.id}`)}
                        >
                          <ListItemIcon>{<IconSettings stroke={1.5} size="1.5rem" color={themePalette.primary.main} />}</ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          // href="management/profile/details"
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 1, `management/profile/details/${user.id}`)}
                        >
                          <ListItemIcon>{<IconUser stroke={1.5} size="1.3rem" />}</ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid container spacing={1} justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="body2">Profile</Typography>
                                </Grid>
                                <Grid item>
                                  <Chip
                                    label="02"
                                    size="small"
                                    sx={{
                                      bgcolor: theme.palette.warning.dark,
                                      color: theme.palette.background.default,
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>{<IconLogout stroke={1.5} size="1.3rem" />}</ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
