import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { componentThemeoption } from '../../../../themes/schemes/PureLightTheme';

// project imports
import MainCard from '../../../../components/MainCard';
import TotalIncomeCard from '../../../../components/Skeleton/TotalIncomeCard';

// assets
import { themePalette } from '../../../../themes/schemes/palette';
import { ArrowDownward, EventAvailableOutlined, EventNoteOutlined } from '@mui/icons-material';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${themePalette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${themePalette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = ({ isLoading }: { isLoading: boolean }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...componentThemeoption.commonAvatar,
                      ...componentThemeoption.largeAvatar,
                      backgroundColor: themePalette.warning.light,
                      color: themePalette.warning.dark,
                    }}
                  >
                    <EventNoteOutlined fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45,
                  }}
                  primary={
                    <Grid display={'flex'} gap={1}>
                      <Typography variant="h4">25</Typography>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            cursor: 'pointer',
                            ...componentThemeoption.smallAvatar,
                            backgroundColor: themePalette.warning.main,
                            color: themePalette.warning.dark,
                          }}
                        >
                          <ArrowDownward fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                        </Avatar>
                      </ListItemAvatar>
                    </Grid>
                  }
                  secondary={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: themePalette.grey[500],
                        mt: 0.5,
                      }}
                    >
                      Interviews Scheduled
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default TotalIncomeLightCard;
