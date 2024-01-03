import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './interviewChart';
import MainCard from '../../../../components/MainCard';
import SkeletonPopularCard from '../../../../components/Skeleton/PopularCard';
import { gridSpacing } from '../../../../store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { themePalette } from '../../../../themes/schemes/palette';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const interviewCardsData = [
  {
    title: 'Total Interviews',
    value: 120,
  },
  {
    title: 'Completed Interviews',
    value: 90,
  },
  {
    title: 'Pending Interviews',
    value: 30,
  },
  // Add more data for additional cards
];
const PopularCard = ({ isLoading }: { isLoading: boolean }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Interview overview</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: themePalette.primary[200],
                        cursor: 'pointer',
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleClose}> Today</MenuItem>
                      <MenuItem onClick={handleClose}> This Month</MenuItem>
                      <MenuItem onClick={handleClose}> This Year </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  pt: '16px !important',
                }}
              >
                <BajajAreaChartCard />
              </Grid>
              <Grid item xs={12}>
                {interviewCardsData.map((item) => (
                  <>
                    <Grid key={item.value} container direction="column">
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {item.title}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                  {item.value}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '5px',
                                    backgroundColor: themePalette.success.light,
                                    color: themePalette.success.dark,
                                    ml: 2,
                                  }}
                                >
                                  <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                </Avatar>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider
                      sx={{
                        my: 1.5,
                      }}
                    />
                  </>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{
              p: 1.25,
              pt: 0,
              justifyContent: 'center',
            }}
          >
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

export default PopularCard;
