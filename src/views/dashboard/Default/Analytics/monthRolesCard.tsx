import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import MainCard from '../../../../components/MainCard';
import TotalIncomeCard from '../../../../components/Skeleton/TotalIncomeCard';
import { componentThemeoption } from '../../../../themes/schemes/PureLightTheme';
import { themePalette } from '../../../../themes/schemes/palette';
import { ArrowUpward, EventAvailableOutlined } from '@mui/icons-material';
import EarningIcon from '../../../assets/images/icons/earning.svg';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: themePalette.primary.dark,
  color: themePalette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${themePalette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${themePalette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const TotalIncomeDarkCard = ({ isLoading }: { isLoading: boolean }) => {
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
                      backgroundColor: themePalette.primary[800],
                      color: '#fff',
                    }}
                  >
                    <EventAvailableOutlined fontSize="inherit" />
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
                      <Typography variant="h4" sx={{ color: '#fff' }}>
                        10
                      </Typography>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            cursor: 'pointer',
                            ...componentThemeoption.smallAvatar,
                            backgroundColor: themePalette.secondary[200],
                            color: themePalette.secondary.dark,
                          }}
                        >
                          <ArrowUpward fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                        </Avatar>
                      </ListItemAvatar>
                    </Grid>
                  }
                  secondary={
                    <Typography variant="subtitle2" sx={{ color: 'primary.dark', mt: 0.25 }}>
                      New Roles This Month
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

TotalIncomeDarkCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalIncomeDarkCard;
