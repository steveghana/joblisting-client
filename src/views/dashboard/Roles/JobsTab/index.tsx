// JobsPage.tsx
import React, { useState } from 'react';
import JobsList from './joblist';
import JobFilters from './jobFilters';
import { Avatar, Container, Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
// import { roleData } from "./roledata";
import RoleSummary from '../components/roleSummary';
import { IClient } from '../../../../types/client';
import { IJobs } from '../../../../types';
import NoData from '../../../../components/NoData';
import SubCard from '../../../../components/SubCard';
// import RoleSummary from "./roleSummary";

const JobsPage: React.FC<{ job: IJobs[]; client: IClient; roleId: string }> = (props) => {
  const [jobs, setJobs] = useState<IJobs[]>(props.job);
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleFilterChange = (newFilters: Record<string, any>) => {
    // We are grabbing the first item in the keys since it can only be one
    let filterkey = Object.keys(newFilters)[1];
    // Applying filtering logic here based on newFilters
    const filteredJobs =
      newFilters[filterkey] === true
        ? props.job.filter((job) => {
            return job.roleCategory === filterkey;
          })
        : props.job;
    setJobs(filteredJobs);
  };
  const categoryByfilter = props.job?.map((item) => {
    //We want to categorise the array by their respective categories
    return {
      [item.roleCategory]: props.job.filter((t) => t.roleCategory === item.roleCategory),
    };
  });
  return (
    <Container sx={{ p: { lg: 'inherit', xs: 0 } }}>
      <Typography my={'1'} variant="h2">
        Jobs
      </Typography>
      {!jobs.length ? (
        <NoData />
      ) : (
        <SubCard>
          <Grid display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'} gap={1}>
            <Grid>
              <Grid
                item
                display={'flex'}
                flexDirection={'column'}
                // my={2}
                gap={1}
              >
                <Typography fontWeight={700} variant="h5">
                  Careers at {props.client.companyName}
                </Typography>
                <Typography fontWeight={600} variant="subtitle1">
                  {props.client.aboutTheCompany}
                </Typography>
              </Grid>
              <Box my={2} display={'flex'} justifyContent={'space-between'} flexWrap={'wrap'} alignItems={'flex-start'} sx={{ width: '100%' }}>
                <JobFilters filters={categoryByfilter} onChange={handleFilterChange} />
                <JobsList jobs={jobs} location={props.client.country} roleId={props.roleId} />
                {matchUpMd && <RoleSummary client={props.client} />}
              </Box>
            </Grid>{' '}
          </Grid>
        </SubCard>
      )}
    </Container>
  );
};

export default JobsPage;
