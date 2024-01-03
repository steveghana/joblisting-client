import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import SubCard from './SubCard';

function Points() {
  return (
    <Grid item xs={12} lg={6} display={{ xs: 'none', md: 'block' }}>
      <Typography variant="h4" gutterBottom>
        Event Details
      </Typography>
      <SubCard>
        <div>
          <Typography variant="subtitle1" sx={{ my: 1, display: 'flex' }}>
            <b>Name :</b>
            <label id="showname">---</label>
          </Typography>
          <Divider sx={{ borderColor: 'grey' }} />
          <Divider sx={{ borderColor: 'grey' }} />
          <Typography variant="subtitle1" sx={{ my: 1, display: 'flex' }}>
            <b>Location :</b>
            <label id="showlocation">---</label>
          </Typography>
          <Divider sx={{ borderColor: 'grey' }} />
          <Divider sx={{ borderColor: 'grey' }} />
          <Typography variant="subtitle1" sx={{ my: 1, display: 'flex' }}>
            <b>Color :</b>
            <label id="showcolor">blue</label>
          </Typography>
          <Divider sx={{ borderColor: 'grey' }} />
          <Divider sx={{ borderColor: 'grey' }} />
          <Typography variant="subtitle1" sx={{ my: 1, display: 'flex' }}>
            <b>Event Links :</b>
            <label id="showlinks">---</label>
          </Typography>
          <Divider sx={{ borderColor: 'grey' }} />
          <Divider sx={{ borderColor: 'grey' }} />
          <Typography variant="subtitle1" sx={{ my: 1, display: 'flex' }}>
            <b>Start Time :</b>
            <label id="showstarttime">---</label>
          </Typography>
          <Divider sx={{ borderColor: 'grey' }} />
          <Divider sx={{ borderColor: 'grey' }} />
          <Typography variant="subtitle1" sx={{ my: 1, display: 'flex' }}>
            <b>End Time:</b>
            <label id="showendtime">---</label>
          </Typography>
          <Divider sx={{ borderColor: 'grey' }} />
          <Divider sx={{ borderColor: 'grey' }} />
          <Typography variant="subtitle1" sx={{ my: 1, display: 'flex' }}>
            <b>Start Date :</b>
            <label id="showstartdate">---</label>
          </Typography>
          <Divider sx={{ borderColor: 'grey' }} />
          <Divider sx={{ borderColor: 'grey' }} />
          <Typography variant="subtitle1" sx={{ my: 1, display: 'flex' }}>
            <b>Created On :</b>
            <label id="showcreatedon">---</label>
          </Typography>
          <Divider sx={{ borderColor: 'grey' }} />
          <Divider sx={{ borderColor: 'grey' }} />
          <Typography variant="subtitle1" sx={{ my: 1, display: 'flex' }}>
            <b>End Date :</b>
            <label id="showenddate">---</label>
          </Typography>
          <Divider sx={{ borderColor: 'grey' }} />
          <Divider sx={{ borderColor: 'grey' }} />
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            <b>Description :</b>
            <p id="showdesp">Introduce the event by providing a short introduction to the name and purpose of the event.</p>
          </Typography>
        </div>
        <div>{/* Your Event Details JSX */}</div>
      </SubCard>
    </Grid>
  );
}

export default Points;
