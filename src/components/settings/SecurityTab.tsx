import { useState, MouseEvent, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
  ListItemAvatar,
  Avatar,
  Switch,
  CardHeader,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  styled,
  SvgIcon,
} from '@mui/material';

import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { format, subHours, subWeeks, subDays } from 'date-fns';
import CustomTable from '../Table/customTable';
import CustomButton from '../button';
// import Google from '@/assets/images/icons/google.svg';
import { IUser } from '@/types/user';
import { GitHub, Google, LinkedIn } from '@mui/icons-material';
const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors?.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors?.error.dark};
     }
    `,
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors?.success.light};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`,
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`,
);
export const logs = [
  {
    id: 1,
    browser: ' Safari/537.36',
    ipaddress: '3.70.73.142',
    location: 'United States',
    date: subDays(new Date(), 2).getTime(),
  },
  {
    id: 2,
    browser: 'Chrome/36.0.1985.67',
    ipaddress: '138.13.136.179',
    location: 'China',
    date: subDays(new Date(), 6).getTime(),
  },
  {
    id: 3,
    browser: 'Googlebot/2.1',
    ipaddress: '119.229.170.253',
    location: 'China',
    date: subHours(new Date(), 15).getTime(),
  },
  {
    id: 4,
    browser: 'AppleWebKit/535.1',
    ipaddress: '206.8.99.49',
    location: 'Philippines',
    date: subDays(new Date(), 4).getTime(),
  },
  {
    id: 5,
    browser: 'Mozilla/5.0',
    ipaddress: '235.40.59.85',
    location: 'China',
    date: subWeeks(new Date(), 3).getTime(),
  },
];
const providerIcons = {
  Google: <SvgIcon component={Google} />,
  LinkedIn: <SvgIcon component={LinkedIn} />,
  Github: <SvgIcon component={GitHub} />,
  // Add more providers as needed
};
function SecurityTab({ insettings, user }: { insettings?: boolean; user: IUser }) {
  const isGoogleVerified = user.googleVerified;
  const isLInkedInVerified = user.linkedinVerified;
  const isGithubVerified = user.githubVerified;

  const renderSocialAccount = (provider: keyof typeof providerIcons, verified: boolean, lastSync?: Date) => {
    const isVerified = verified ? 'connected' : 'not connected';
    const statusText = verified
      ? `Your ${provider} account has been successfully connected`
      : lastSync
      ? `Your ${provider} account was last synchronized ${format(lastSync, 'PP')} ago`
      : `A ${provider} account hasn’t been yet added to your account`;

    return (
      <ListItem sx={{ p: 3 }} key={provider}>
        <ListItemAvatar sx={{ pr: 2 }}>
          {providerIcons[provider] || <AvatarWrapper />} {/* Use the icon from the mapping */}
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
          secondaryTypographyProps={{
            variant: 'subtitle2',
            lineHeight: 1,
          }}
          primary={provider}
          secondary={statusText}
        />
        {verified ? (
          <CustomButton size="large" variant="contained">
            Revoke access
          </CustomButton>
        ) : (
          <CustomButton color="secondary" size="large" variant="contained">
            Connect
          </CustomButton>
        )}
      </ListItem>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Social Accounts</Typography>
          <Typography variant="subtitle2">Manage connected social accounts options</Typography>
        </Box>
        <Grid item xs={12}>
          <Card>
            <List>
              {renderSocialAccount('Google', isGoogleVerified as boolean)}
              {renderSocialAccount('LinkedIn', isLInkedInVerified as boolean)}
              {renderSocialAccount('Github', isGithubVerified as boolean, subDays(new Date(), 6))}
            </List>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Security</Typography>
          <Typography variant="subtitle2">Change your security preferences below</Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1,
                }}
                primary="Change Password"
                secondary="You can change your password here"
              />
              <CustomButton size="large" variant="outlined">
                Change password
              </CustomButton>
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1,
                }}
                primary="Two-Factor Authentication"
                secondary="Enable PIN verification for all sign in attempts"
              />
              <Switch color="primary" />
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default SecurityTab;
