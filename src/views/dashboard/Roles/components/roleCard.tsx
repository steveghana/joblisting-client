import { useNavigate } from 'react-router';
import Roles from '..';
import { useRef, useState } from 'react';
import { IRoleData } from '@/types/roles';
import { Avatar, Box, Button, ButtonBase, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import NoData from '@/components/NoData';
import SubCard from '@/components/SubCard';
import { themePalette } from '@/themes/schemes/palette';
import { CheckCircle, CopyAll, MoreHoriz, People } from '@mui/icons-material';
import { EmploymentType } from '@/lib/data/formFieldData';
import Dot from '@/components/Dot';
import { ClockIcon } from '@mui/x-date-pickers';
import { formatTimeDifference } from '@/utils/timeFormatter';

interface IRoleCard {
  feature?: boolean;
  role: IRoleData;
}
const RoleCard = (props: IRoleCard) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState({
    right: false,
  });
  const hasToken = sessionStorage.getItem('auth_token');
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const textRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();
  const { aboutTheProject, durationForEmployment, experience, title, link, vacancy_status, client, createdAt, jobs } = props?.role;
  let roleLink = `${window.location.origin}/s/${link}`;
  const handleCopy = (e: any) => {
    e.stopPropagation();
    if (textRef.current) {
      navigator.clipboard
        .writeText(roleLink)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch((err) => {
          console.error('Unable to copy text:', err);
        });
    }
  };
  // Create a relative time formatter in your locale
  // with default values explicitly passed in.

  const now = new Date();
  const date = new Date(createdAt);
  if (!jobs.length) {
    return;
  }
  return (
    <Grid container spacing={1}>
      {jobs?.map((job, i) => (
        <Grid
          sx={{ cursor: 'pointer', p: 1 }}
          onClick={() => navigate('/dashboard/roles/' + props.role.id + '/job/' + job.id)}
          item
          lg={jobs.length > 1 ? 6 : 12}
          xs={12}
          sm={12}
          md={12}
        >
          <SubCard sx={{ cursor: 'pointer' }}>
            <Grid container direction="column" spacing={0}>
              <Grid className="avatar" display={'flex'} alignItems={'flex-start'} gap={0.8} item>
                <Avatar alt="user" variant="rounded" src={client!.companyLogo} />
                <Box mr={'auto'}>
                  <Typography fontWeight={500} variant={props.feature ? 'h5' : 'h4'} mr={'auto'}>
                    {client!.companyName}
                  </Typography>
                  <Typography variant="caption" fontWeight={700}>
                    {client!.projectTitle}
                  </Typography>
                  {/* {!props.feature && ( */}
                  <Box>
                    <Typography variant="caption" color={'black'}>
                      {client!.aboutTheCompany}
                    </Typography>
                    <Box sx={{ color: themePalette.primary.light }} display={'flex'} gap={'.3rem'} my={1} alignItems={'center'}>
                      <People sx={{ color: themePalette.primary.dark }} />
                      <Typography variant="caption" fontWeight={700}>
                        {client!.numOfEmployees}
                      </Typography>
                      <Typography variant="caption" fontWeight={700}>
                        Employees
                      </Typography>
                    </Box>
                  </Box>
                  {/* )} */}
                </Box>
                {!props.feature && (
                  <ButtonBase>
                    <MoreHoriz fontSize={'small'} />
                  </ButtonBase>
                )}
              </Grid>
              <Grid mb={1} className="mail links" item>
                {vacancy_status === 'Open' && (
                  <Button
                    sx={{
                      background: 'rgba(27, 227, 44, 0.1)',
                      border: '1px solid rgba(27, 227, 44, 0.5)',
                      borderRadius: '50px',
                    }}
                    disabled={true}
                    startIcon={<CheckCircle color="success" />}
                  >
                    <Typography variant="caption">Actively Hiring</Typography>
                  </Button>
                )}
                {/* <Divider sx={{ margin: "1rem 0" }} /> */}
                <Box
                  my={2}
                  alignItems={'center'}
                  gap={'.8rem'}
                  borderRadius={2}
                  p={1}
                  border={'2px solid rgba(0, 0, 0, 0.1)'}
                  display={'flex'}
                  flexWrap={'wrap'}
                >
                  <Typography fontWeight={700} variant="body2">
                    {experience.toUpperCase()} - {job.roleName}
                  </Typography>
                  <Box display={'flex'} alignItems={'center'} gap={0.4}>
                    <Dot />
                    <Typography fontWeight={400} variant="subtitle1" mr={'auto'}>
                      {client!.country.label}{' '}
                    </Typography>
                    <Dot />
                    <Typography>{job.jobType}</Typography>
                    <Dot />
                    <Typography fontWeight={700}>{EmploymentType.filter((item) => item.label === job.employmentType)[0]?.value}</Typography>
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
                    flexDirection={props.feature ? 'column' : 'row'}
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
                      <Typography variant="caption" fontWeight={700} color={'green'}>
                        Recruiter recently active
                      </Typography>
                      <Typography>
                        <ClockIcon
                          sx={{
                            color: themePalette.primary.main,
                            fontSize: '.7rem',
                            mr: 0.2,
                          }}
                        />
                        Posted {formatTimeDifference(now, date)}
                      </Typography>
                    </Box>
                    <Grid
                      display={'flex'}
                      sx={{
                        width: {
                          md: '100%',
                          lg: props.feature ? '100%' : 'auto',
                        },
                      }}
                      //
                      justifyContent={'center'}
                      gap={0.5}
                    >
                      <Button
                        size="medium"
                        // color=""
                        fullWidth
                        sx={{
                          background: 'black',
                          color: 'white',
                          maxHeight: '30px',
                          width: '100%',
                        }}
                        variant="contained"
                      >
                        <Typography sx={{ wordBreak: 'keep-all' }}>Learn More</Typography>
                      </Button>
                    </Grid>
                  </Box>
                  {hasToken && (
                    <>
                      <Grid
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        sx={{
                          backgroundColor: 'black',
                          maxWidth: '80%',
                          color: 'white',
                          // padding: "10px",
                          px: 2,
                          borderRadius: '7px',
                        }}
                      >
                        <Typography variant="caption" color={'white'} ref={textRef}>
                          {roleLink}
                        </Typography>
                      </Grid>

                      <Typography onClick={handleCopy} variant="caption" sx={{ display: 'flex', alignItems: 'center' }} color="primary">
                        {copySuccess ? 'Copied!' : 'Copy url'}
                        <CopyAll sx={{ fontSize: '1rem', ml: 1 }} />
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      ))}
    </Grid>
  );
};
export default RoleCard;
