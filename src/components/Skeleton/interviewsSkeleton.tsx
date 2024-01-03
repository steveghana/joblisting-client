// EventSchedulerSkeletonLoader.jsx

import React from 'react';
import {
  Skeleton,
  Grid,
  Typography,
  Box,
  Paper,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const EventSchedulerSkeletonLoader = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            <Skeleton variant="text" animation="wave" />
          </Typography>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            gap: 1,
            px: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Skeleton variant="rectangular" width={150} height={40} />
          <Skeleton variant="rectangular" width={40} height={40} />
        </Box>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="rectangular" sx={{ height: '70vh' }} />

        {/* Skeleton for data */}
        <Box>
          <Paper elevation={3} sx={{ padding: '20px', display: 'flex', alignItems: 'start' }}>
            <Box width={'100%'}>
              <Grid container spacing={2}>
                <Grid item xs={6} mb={2}>
                  <Typography variant="subtitle1" display={'flex'} alignItems={'center'} gap={1}>
                    Candidate: <Skeleton variant="circular" width={23} height={23} /> <Skeleton variant="text" animation="wave" />
                  </Typography>
                  <Typography variant="subtitle1" display={'flex'} alignItems={'center'} gap={1}>
                    Interviewer: <Skeleton variant="circular" width={23} height={23} /> <Skeleton variant="text" animation="wave" />
                  </Typography>
                  <Typography variant="subtitle1">{/* Date: <Skeleton variant="text" animation="wave" /> */}</Typography>
                  <Typography variant="subtitle1" display={'flex'} alignItems={'center'} gap={1}>
                    Time: <Skeleton variant="text" animation="wave" />
                  </Typography>
                  <Typography variant="subtitle1" display={'flex'} alignItems={'center'} gap={1}>
                    Location: <Skeleton variant="text" animation="wave" />
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography variant="subtitle1" component={'animate'}>
                    Comments
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* Skeleton for comments */}
                  {[1, 2, 3].map((index) => (
                    <Grid key={index}>
                      <Box style={{ marginBottom: '10px' }}>
                        <Typography variant="subtitle1">
                          <strong>
                            <Skeleton variant="text" animation="wave" />
                          </strong>{' '}
                          <Skeleton variant="text" animation="wave" />
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                  {/* Skeleton for comment form */}
                  <form>
                    <Skeleton variant="rectangular" width={'50%'} height={40} style={{ marginBottom: '10px' }} />
                    <Skeleton variant="rectangular" width={'100%'} height={120} style={{ marginBottom: '10px' }} />
                    <Skeleton variant="rectangular" width={'30%'} height={40} style={{ marginBottom: '10px' }} />
                  </form>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Tooltip sx={{ mx: 'auto' }} title="Cancel Interview">
              <IconButton>
                <Typography color={'blue'}>
                  <Skeleton variant="text" animation="wave" />
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Interview">
              <IconButton>
                <Typography color={'blue'}>
                  <Skeleton variant="text" animation="wave" />
                </Typography>
              </IconButton>
            </Tooltip>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EventSchedulerSkeletonLoader;
