import { useState, ChangeEvent } from 'react';
import { Box, Typography, Card, Grid, ListItem, List, ListItemText, Divider, Switch } from '@mui/material';

function NotificationsTab() {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: false,
    checkedC: true,
    checkedD: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Account</Typography>
          <Typography variant="subtitle2">Choose what notifications you want to receive</Typography>
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
                primary="Weekly Report"
                secondary="Receive weekly emails on developers clocked hours"
              />
              <Switch color="primary" checked={state.checkedA} onChange={handleChange} name="checkedA" />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1,
                }}
                primary="Weekly Report"
                secondary="Receive weekly reports status in your inbox"
              />
              <Switch color="primary" checked={state.checkedB} onChange={handleChange} name="checkedB" />
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">New Applicant joining</Typography>
          <Typography variant="subtitle2">Receive email notifications related to applicants activity</Typography>
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
                primary="New client"
                secondary="Get a message when a client is added"
              />
              <Switch color="primary" checked={state.checkedC} onChange={handleChange} name="checkedC" />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1,
                }}
                primary="interviews Status Update"
                secondary="Whenever an interview is scheduled, get a notification on your phone"
              />
              <Switch color="primary" checked={state.checkedD} onChange={handleChange} name="checkedD" />
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

export default NotificationsTab;
