// material-ui
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Divider, Drawer, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Paper, TextField } from '@mui/material';
// project imports
import SubCard from '../../../components/SubCard';
import MainCard from '../../../components/MainCard';
import { useDeletInterviewMutation, useGetInterviewsQuery } from '../../../store/services/interview.service';
import React from 'react';
import NoData from '../../../components/NoData';
import { ArrowBackTwoTone, ExpandMore, Settings } from '@mui/icons-material';
import CustomButton from '../../../components/button';
import { ClockIcon } from '@mui/x-date-pickers';
import { toast } from 'react-toastify';
import { useTypedDispatch, useTypedSelector } from '../../../store';
import { useNavigate } from 'react-router';
import EventSchedulerSkeletonLoader from '@/components/Skeleton/interviewsSkeleton';
import CalenderEvent from '@/components/EmailComposer/calenderevents';
import { Iinterviews, TInterviewComment } from '@/types/interviews';
import { themePalette } from '@/themes/schemes/palette';
import InterviewComments from './interviewComments';
import { fetchDevs } from '@/store/slices/dev.slice';

// ===============================|| INTERVIEWS ||=============================== //
const interviewDetails = {
  candidateName: 'John Doe',
  interviewerName: 'Jane Smith',
  interviewDate: '2023-12-15',
  interviewTime: '10:00 AM',
  location: 'Zoom Meeting',
};
const event = {
  title: 'Stephen Williams <> ROSE Framework',
  date: 'Monday, December 18',
  time: '4:00 – 4:20pm',

  zoomLink: 'https://us05web.zoom.us/j/82539491456?pwd=5xZ4FAze0pFZb1sIPdlZfSXJqQQ9t7.1',
  host: 'johannes.scharlach@roseframework.io',
  guests: [
    { name: 'Johaness', email: 'johannes.scharlach@roseframework.io' },
    { name: 'stephen boateng', email: 'stephenboateng@roseframework.io' },
  ],
};
// Dummy data for comments
const Interviews = () => {
  const { data, isError, isLoading, isFetching, refetch } = useGetInterviewsQuery();
  const [deletinterview, { isLoading: isDeleting }] = useDeletInterviewMutation();
  const allDevsAndApplicants = useTypedSelector((state) => state.devs.devs);
  const navigate = useNavigate();
  const [eventIndex, seteventIndex] = React.useState<string>('');
  const dispatch = useTypedDispatch();
  // Date: {
  //   format(new Date(interviewDetails.interviewDate), "yyyy-MM-dd");
  // }
  // Assuming the data structure returned by the API has interview details
  //  const interviewDetails = data?.interviewDetails || {};
  const handleDelete = async (id: string) => {
    try {
      const deleted = await deletinterview({
        id,
      }).unwrap();
      if (deleted) {
        toast.warn('Interview Canceled', {
          position: 'bottom-center',
        });
        dispatch(fetchDevs());
        // refetch();
        setState(false);
        navigate(`/devs/interviews`);
      }
    } catch (error) {
      // toast.error('Couldnt cancel interview', {
      //   position: 'bottom-center',
      // });
    }
  };
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean, id?: string) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    if (open) {
      seteventIndex(id as string);
    } else {
      seteventIndex('');
    }

    setState(open);
  };
  if (isLoading) {
    <EventSchedulerSkeletonLoader />;
  }
  const ExtractEventFromEvents = ({ event }: { event: Iinterviews }) => {
    // All guest and candidates should be merged as one for the for array of guests
    if (!event?.candidate) {
      return;
    }
    let { candidate, guests, id, candidateId, createdAt, ...rest } = event;
    const eventDetails = {
      ...rest,
      guests: guests
        .map((guest) => {
          return { name: `${guest.firstName} ${guest.lastName}`, email: guest.email, avatar: guest.avatar };
        })
        .concat({
          name: `${candidate.firstName} ${candidate.lastName}`,
          email: candidate.email,
          avatar: candidate.avatar,
        }),
    };
    return (
      <CalenderEvent
        event={eventDetails}
        loading={isDeleting}
        onClose={() => setState(false)}
        onDelete={() => {
          handleDelete(id as string);
          // setState(false);
        }}
        onEdit={() => {
          setState(false);
          navigate(`/devs/interviews/Edit/${id}`);
        }}
      />
    );
  };
  return (
    <MainCard title="Event Details">
      <Box display="flex">
        <Tooltip arrow placement="top" onClick={() => navigate(-1)} title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoTone />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container>
        <Grid item xs={12}>
          {/* <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Interview Details
            </Typography>
          </Grid> */}
          {/* {!data?.length && ( */}
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
            <CustomButton
              text="+ New Event"
              onClick={() => {
                !allDevsAndApplicants.length || !allDevsAndApplicants.filter((dev) => dev.rolestatus === 'Pending').length
                  ? toast.warn('add developers or new shortlisted candidates before scheduling an event', {
                      position: 'top-center',
                    })
                  : navigate('/hr/interviews/create');
              }}
              sx={{ marginLeft: 'auto' }}
              endIcon={<Settings />}
            />
          </Box>
          {/* )} */}
          {!data?.length ? (
            <Grid container minHeight={'45dvh'} sx={{ alignSelf: 'stretch' }}>
              <NoData />
            </Grid>
          ) : (
            <Box>
              <SubCard>
                <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
                  <ExtractEventFromEvents event={data.find((interview) => interview.id === eventIndex) as Iinterviews} />
                </Drawer>
                {/* Header */}
                <Grid container spacing={2} sx={{ cursor: 'pointer' }}>
                  {data.map((item, i) => (
                    <Grid item xs={12} sm={12} md={12} lg={data.length > 1 ? 6 : 12} key={item.id}>
                      <Paper
                        elevation={3}
                        sx={{
                          padding: '20px',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'start',
                          background: themePalette.primary.main,
                          my: 1,
                        }}
                      >
                        <Box width={'100%'}>
                          <Grid
                            container
                            onClick={(e) => {
                              toggleDrawer(true, item?.id as string)(e);
                            }}
                            spacing={2}
                          >
                            <Grid sx={{ color: 'white' }} item xs={12} mb={2}>
                              <Typography variant="subtitle1" display={'flex'} color={'white'} alignItems={'center'} gap={1}>
                                Candidate: <Avatar sx={{ width: 23, height: 23 }} src={item.candidate.avatar} /> {item.candidate.firstName}{' '}
                                {item.candidate.lastName}
                              </Typography>
                              <Typography variant="subtitle1" color={'white'} display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
                                guest(s):
                                {item.guests
                                  .filter((item) => item.rolestatus !== 'Interviewing')
                                  .map((guest) => (
                                    <Box display={'flex'} alignItems={'center'} gap={1} key={guest.id}>
                                      <Avatar sx={{ width: 23, height: 23 }} src={guest.avatar} />
                                      {guest.firstName} {guest.lastName}
                                    </Box>
                                  ))}
                              </Typography>
                              <Typography color={'white'} variant="subtitle1">
                                Date: {new Date(interviewDetails.interviewDate).toLocaleDateString()}
                              </Typography>
                              <Typography color={'white'} variant="subtitle1" display={'flex'} alignItems={'center'} gap={1}>
                                Time: <ClockIcon color="disabled" fontSize="small" /> {new Date(item.starttime).toLocaleTimeString()}
                              </Typography>
                              <Typography
                                color={'white'}
                                variant="subtitle1"
                                display={'flex'}
                                alignItems={'center'}
                                gap={1}
                                sx={{ wordBreak: 'keep-all' }}
                              >
                                Location: {item.eventOption}
                              </Typography>
                            </Grid>
                            {/* Additional interview details can be added here */}
                          </Grid>
                          <Divider />
                          <InterviewComments comments={item.comments as TInterviewComment[]} interviewId={item.id as string} />
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </SubCard>
            </Box>
          )}

          {/* <EventDashboard /> */}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Interviews;
