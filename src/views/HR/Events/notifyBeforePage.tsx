import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Grid,
  Paper,
} from '@mui/material';

import './NotifyBeforePage.css'; // Make sure to import your CSS file

const NotifyBeforePage: React.FC = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <a href="Dashboard.html">
            <img src="Images/Icons/MyCalBrand.png" alt="logo" />
          </a>
          <div id="linav">
            <ul>
              <li>
                <a href="./Dashboard.html">Home</a>
              </li>
              <li>
                <a href="calendar.html">My Calendar</a>
              </li>
              <li>
                <a href="Dashboard.html">Availability</a>
              </li>
            </ul>
          </div>
          <div id="Logout">
            <div className="namecircle">
              <img style={{ width: '22px', filter: 'invert()' }} src="Images/logout.svg" alt="" />
            </div>
            <a href="Dashboard.html" id="UserShow3">
              Account
            </a>
          </div>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <hr />
            <div id="sticky">
              <div id="topnav">
                <p>My Calendly</p>
                <a href="CreateEvent.html">
                  <p id="Create">+ Create</p>
                </a>
              </div>
              <div id="botnav">
                <ul>
                  <li>
                    <a href="Dashboard.html">Event Types</a>
                  </li>
                  <li>
                    <a href="Dashboard.html">Schedule Event </a>
                  </li>
                  <li>
                    <a href="NotifyBeforePage.html">Workflows</a>
                  </li>
                  <li>
                    <a href="calendar.html">My Calendar</a>
                  </li>
                </ul>
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} className="margins">
              <form action="">
                <div id="WFnameAndSelectDiv" className="flex">
                  <div>
                    <label>Workflow name</label> <br />
                    <TextField type="text" value="Email reminder to host" id="name" variant="outlined" />
                  </div>
                  <div>
                    <label>Which event types will this apply to?</label>
                    <br />
                    <FormControl variant="outlined">
                      <InputLabel id="userEventsLabel">Select event</InputLabel>
                      <Select label="Select event" id="userEvents" required>
                        <MenuItem value="">Select event</MenuItem>
                        {/* Add other menu items based on your data */}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div id="beforetimeDiv">
                  <label>When this happens</label>
                  <br />
                  <TextField
                    id="beforeTimeValue"
                    type="number"
                    // min="1"
                    // max="100000"
                    placeholder="Enter value"
                    required
                    variant="outlined"
                  />
                  <Select label="Select unit" id="beforeTimeUnit" required variant="outlined">
                    <MenuItem value="min">minutes</MenuItem>
                    <MenuItem value="hour">hour</MenuItem>
                  </Select>
                  <label>: before event starts</label>
                </div>

                <h2 style={{ marginTop: '30px' }}>Edit: Email to host</h2>

                <div id="subject">
                  <label>Subject</label> <br />
                  <TextareaAutosize id="subjectText" placeholder="Reminder: {{event_name}} is at {{event_time}} on {{event_date}}" />
                </div>

                <div id="body">
                  <label>Body</label> <br />
                  <TextareaAutosize
                    id="bodyText"
                    placeholder={`Hi {{event_organizer_name}},
    This is a friendly reminder that your {{event_name}} is at {{event_time}} on {{event_date}}.`}
                  />
                </div>

                <div id="saveBtnDiv">
                  <Button id="saveBtn" type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NotifyBeforePage;
