import { Avatar, Box, Button, ButtonBase, Card, Chip, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import SubCard from '../../../../components/SubCard';
import { IClient } from '../../../../types/client';

const RoleSummary: React.FC<{ client: IClient }> = ({ client }) => {
  return (
    <Grid lg={2} md={12} sm={12}>
      <SubCard>
        <Grid container direction="column" spacing={1}>
          <Grid className="avatar" display={'flex'} gap={'1rem'} item>
            <Typography variant="h5" color={'grey'} fontWeight={700}>
              About role
            </Typography>
          </Grid>
          <Divider sx={{ margin: '1rem 0' }} />
          <Grid className="mail links" item>
            <Box>
              <ButtonBase sx={{ borderRadius: '12px' }}></ButtonBase>
              <Typography fontWeight={500} variant="h5" mr={'auto'}>
                Website
              </Typography>
              <Typography variant="caption">demo@svtech.com</Typography>
            </Box>
            <Divider sx={{ margin: '1rem 0' }} />
            <Box gap={1}>
              <Typography fontWeight={500} variant="h5" mr={'auto'}>
                Email
              </Typography>
              <Typography variant="caption">{client.email}</Typography>
            </Box>
            <Divider sx={{ margin: '1rem 0' }} />

            <Box>
              <Typography fontWeight={500} variant="h5" mr={'auto'}>
                Location
              </Typography>
              <Typography variant="caption">{client.country.label}</Typography>
            </Box>
            <Divider sx={{ margin: '1rem 0' }} />
            <Box>
              <Typography fontWeight={500} variant="h5" mr={'auto'}>
                Industry
              </Typography>
              {client.industry.map((item, i) => (
                <Typography key={item} variant="caption" mx={1}>
                  <Chip label={item} />
                </Typography>
              ))}
            </Box>
            <Divider sx={{ margin: '1rem 0' }} />
          </Grid>
        </Grid>
      </SubCard>
    </Grid>
  );
};
export default RoleSummary;
