import React from 'react';
import ApplicantTable from '.';
import { ApplicantsSubmission } from '@/types/roles';
import MainCard from '@/components/MainCard';
import FullscreenProgress, { TransparentScreeProgress } from '@/components/FullscreenProgress/FullscreenProgress';
import NoData from '@/components/NoData';
import { useGetApplicantsQuery } from '@/store/services/application.service';
import { Box, Grid, CircularProgress } from '@mui/material';
import { useParams } from 'react-router';

const Applicants = ({ roleid }: { roleid: string }) => {
  const { data: applicants, refetch, isError, isLoading, isFetching } = useGetApplicantsQuery({ roleid });
  const { jobid } = useParams();
  const filteredApplicantsByJob = applicants?.filter((applicant) => applicant.jobId === jobid);
  if (isLoading || isFetching) {
    return <TransparentScreeProgress />;
  }
  if (!filteredApplicantsByJob?.length || isError) {
    return (
      <Box height={'100%'}>
        <NoData />
      </Box>
    );
  }
  return (
    <Grid>
      <ApplicantTable applicants={filteredApplicantsByJob as ApplicantsSubmission[]} actionFn={() => refetch()} />;
    </Grid>
  );
};

export default Applicants;
