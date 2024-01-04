// JobsList.tsx
import React from 'react';
import { Box, Button, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ClockIcon } from '@mui/x-date-pickers';
import { IJobs } from '../../../../types';
import { themePalette } from '../../../../themes/schemes/palette';
import Dot from '../../../../components/Dot';
import { FiberManualRecord } from '@mui/icons-material';
import NoData from '../../../../components/NoData';
import { formatTimeDifference } from '../../../../utils/timeFormatter';
import SubCard from '../../../../components/SubCard';
import CustomButton from '../../../../components/button';
import { useParams } from 'react-router';

interface JobsListProps {
  jobs: IJobs[];
  location: Record<string, any>;
  roleId: string;
}

const JobsList: React.FC<JobsListProps> = ({ jobs, location, roleId }) => {
  const hasApplied: Record<string, { applied: boolean }> = JSON.parse(localStorage.getItem('hasApplied') as string) || {};
  const appliedJobIds = Object.keys(hasApplied).map((jobid) => jobid);
  const now = new Date();
  return (
    <Grid container lg={7} md={12} sm={12} mt={2}>
      {!jobs?.length ? (
        <NoData />
      ) : (
        jobs?.map((job) => (
          <SubCard key={job.id}>
            {/* <CardContent> */}
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box>
                <Typography color={'gray'} variant="subtitle1">
                  {job.roleCategory}
                </Typography>
                <Typography color={themePalette.primary.main}>{job.roleName}</Typography>
              </Box>
              <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'}>
                <ClockIcon fontSize="small" sx={{ ml: 'auto' }} color="disabled" />
                {/* use the date */}
                <Typography whiteSpace={'nowrap'} variant="caption">
                  Posted {formatTimeDifference(now, new Date(job.postedDate))} ago
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography>{job.description}</Typography>
              <List>
                {job.tasks.map((t, i) => (
                  <ListItem sx={{ display: 'flex' }} key={i}>
                    <ListItemIcon>
                      <FiberManualRecord sx={{ fontSize: '.5rem' }} />
                    </ListItemIcon>
                    <ListItemText primary={t} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box
              my={2}
              alignItems={'flex-start'}
              justifyContent={'flex-start'}
              width={'100%'}
              gap={'.8rem'}
              borderRadius={2}
              p={1}
              border={'2px solid rgba(0, 0, 0, 0.1)'}
              display={'flex'}
              flexWrap={'wrap'}
            >
              <Typography fontWeight={700} variant="body2">
                {job.roleName}
              </Typography>
              <Box display={'flex'} alignItems={'center'} gap={0.4}>
                <Dot />
                <Typography fontWeight={400} variant="subtitle1" mr={'auto'}>
                  {location.label}{' '}
                </Typography>
                <Dot />
                <Typography>{job.jobType}</Typography>
                <Dot />
                <Typography fontWeight={700}>{job.employmentType}</Typography>
              </Box>
              <Box
                sx={{
                  // ml: { md: 0, lg: 'auto' },
                  flexDirection: { sm: 'column', md: 'row' },
                  justifyContent: 'flex-start',
                }}
                display={'flex'}
                justifyContent={'flex-start'}
                flexWrap={'wrap'}
                // alignItems={'center'}
                // flexDirection={props.feature ? "column" : "row"}
                gap={1}
              >
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  sx={{
                    justifyContent: { md: 'flex-start', lg: 'flex-end' },
                    alignItems: { md: 'flex-start', lg: 'flex-end' },
                  }}
                >
                  <Typography>
                    <ClockIcon
                      sx={{
                        color: themePalette.primary.main,
                        fontSize: '.7rem',
                        mr: 0.2,
                      }}
                    />
                    Posted {formatTimeDifference(now, new Date(job.postedDate))} ago
                  </Typography>
                </Box>
                <Grid sx={{ width: { xs: '100%' } }}>
                  {!appliedJobIds.includes(job.id) ? (
                    <CustomButton size="medium" fullWidth href={`/job-submttion/${roleId}/job/${job.id}`} text="Apply" />
                  ) : (
                    <CustomButton
                      size="small"
                      color="success"
                      // onClick={() => navigate("job-submttion")}
                      variant="outlined"
                      text="Applied"
                    />
                  )}
                </Grid>
              </Box>
            </Box>
          </SubCard>
        ))
      )}
    </Grid>
  );
};

export default JobsList;
