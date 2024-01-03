import React from 'react';
import { Avatar, Box, Button, ButtonBase, Card, Chip, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { roleData } from '../../../../lib/data/roledata';
import { ArrowForward } from '@mui/icons-material';
import Dot from '../../../../components/Dot';
import SubCard from '../../../../components/SubCard';
import { themePalette } from '../../../../themes/schemes/palette';
import { useNavigate, useParams } from 'react-router';
import { IRoleData } from '../../../../types/roles';
import NoData from '../../../../components/NoData';
import { formatTimeDifference } from '../../../../utils/timeFormatter';
import CustomButton from '../../../../components/button';
import { unknown } from 'zod';
interface IRoleDetails {
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  role: IRoleData;
}
const RoleDetails = ({ role, setCurrentTab }: IRoleDetails): JSX.Element => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const now = new Date();
  const date = new Date(role.createdAt);
  const hasApplied: Record<string, { applied: boolean }> = JSON.parse(localStorage.getItem('hasApplied') as string) || {};
  const appliedJobIds = Object.keys(hasApplied).map((jobid) => jobid);
  console.log(role);
  return (
    <Card>
      {!role ? (
        <NoData />
      ) : (
        <Grid display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'} gap={1}>
          <Grid item lg={8} md={6} sm={12}>
            <Grid item display={'flex'} flexDirection={'column'} my={2} gap={1}>
              <Typography fontWeight={700} variant="h2">
                {role.client!.companyName}
              </Typography>
              <Typography fontWeight={600} variant="h5">
                {role.aboutTheProject}
              </Typography>
              <Typography variant="body2">{/* {aboutTheProject} */}</Typography>
            </Grid>
            <Box my={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{ width: '100%' }}>
              <Typography variant="h4">Jobs</Typography>
              <Button onClick={(e) => setCurrentTab('jobs')} variant="text" sx={{ color: 'grey' }} endIcon={<ArrowForward />}>
                <Typography variant="caption">view jobs </Typography>
              </Button>
            </Box>
            {role?.jobs.map((job) => (
              <Box
                my={1}
                alignItems={'flex-start'}
                borderRadius={2}
                p={1}
                key={job.id}
                border={'2px solid rgba(0, 0, 0, 0.1)'}
                display={'flex'}
                flexWrap={'wrap'}
                gap={2}
                width={'100%'}
                // flexWrap={"wrap"}
              >
                <Box>
                  <Typography color={themePalette.primary.main} fontWeight={700} variant="body2">
                    {job.roleName} - <b>{job.employmentType}</b>
                  </Typography>
                  <Box display={'flex'} alignItems={'center'} gap={0.4}>
                    <Typography fontWeight={400} variant="subtitle1">
                      {role.client!.country.label}
                    </Typography>
                    <Dot />
                    <Typography>{job.jobType}</Typography>
                    <Dot />
                    <Typography>{job.employmentType}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    ml: { md: 0, lg: 'auto' },
                    flexDirection: { sm: 'column', md: 'row' },
                    justifyContent: { sm: 'flex-end', md: 'flex-start' },
                  }}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  flexWrap={'wrap'}
                  alignItems={'center'}
                  //   flexDirection={props.feature ? "column" : "row"}
                  gap={1}
                >
                  <Typography>Posted {formatTimeDifference(now, date)}</Typography>
                  <Grid display={'flex'} justifyContent={'center'} gap={0.5}>
                    <CustomButton
                      size="small"
                      sx={{
                        color: 'black',
                        borderColor: 'black',
                        maxHeight: '30px',
                      }}
                      // onClick={() => navigate("job-submttion")}
                      variant="outlined"
                      text="save"
                    />
                    {!appliedJobIds.includes(job.id) ? (
                      <CustomButton
                        href={`/job-submttion/${role.id}/job/${job.id}`}
                        // onClick={() => navigate("job-submttion")}
                        fullWidth
                        variant="contained"
                        text="apply"
                      />
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
            ))}
            <Typography my={2} variant="h5">
              Founders
            </Typography>
            <Grid lg={4}>
              <SubCard>
                <Grid display={'flex'} gap={1} justifyContent={'space-between'} alignItems={'center'}>
                  <Avatar alt="Founder" src={role.client!.companyLogo} />
                  <Box>
                    <Typography mt={2}>Founder at {role.client!.companyName}</Typography>
                    <Typography fontWeight={700}>{role.client?.name}</Typography>
                  </Box>
                </Grid>
              </SubCard>
            </Grid>
          </Grid>{' '}
          {matchUpMd && (
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
                      <Typography variant="caption">unknown</Typography>
                    </Box>
                    <Divider sx={{ margin: '1rem 0' }} />
                    <Box gap={1}>
                      <Typography fontWeight={500} variant="h5" mr={'auto'}>
                        Phone
                      </Typography>
                      <Typography variant="caption">{role.client!.phoneNumber}</Typography>
                    </Box>
                    <Divider sx={{ margin: '1rem 0' }} />

                    <Box>
                      <Typography fontWeight={500} variant="h5" mr={'auto'}>
                        Location
                      </Typography>
                      <Typography variant="caption">{role.client!.country.label || role.client?.country?.name}</Typography>
                    </Box>
                    <Divider sx={{ margin: '1rem 0' }} />
                    <Box>
                      <Typography fontWeight={500} variant="h5" mr={'auto'}>
                        Industry
                      </Typography>
                      {role.client!.industry.map((item, i) => (
                        <Typography key={i} variant="caption">
                          <Chip label={item} />
                        </Typography>
                      ))}
                    </Box>
                    <Divider sx={{ margin: '1rem 0' }} />
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          )}
        </Grid>
      )}
    </Card>
  );
};
export default RoleDetails;
