import PerfectScrollbar from 'react-perfect-scrollbar';
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import CustomButton from '../../../components/button';
// import SelectParticipants, {
//   InterviewFormValue,
// } from "../../HR/interviewSteps/SelectParticipants";
import { Iinterviews, InterviewFormValue } from '../../../types/interviews';
import { IDev } from '../../../types/devs';
import { useNavigate, useParams } from 'react-router';
import { useGetInterviewQuery, useUpdateInterviewMutation } from '../../../store/services/interview.service';
import { useTypedDispatch, useTypedSelector } from '../../../store';
import { toast } from 'react-toastify';
import InterviewFormFields from '../../HR/Events/EventForm';
import NoData from '../../../components/NoData';
import FullscreenProgress from '../../../components/FullscreenProgress/FullscreenProgress';
import MainCard from '../../../components/MainCard';
import { STATUS_SCHEDULED } from '../../HR/interviewSteps/InterviewScheduler';
import { fetchDevs } from '../../../store/slices/dev.slice';

const InterviewEdit = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { id } = useParams();
  const { data: interviewEditData, isFetching, isError, isLoading, refetch } = useGetInterviewQuery({ id: id as string });
  const [updateInterview, { isError: isUpdateError }] = useUpdateInterviewMutation();
  const state = useTypedSelector((state) => state.devs.devs);

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const devsAndApplicants = useTypedSelector((state) => state.devs.devs);
  if (isFetching || isLoading) {
    return <FullscreenProgress />;
  }
  if (!interviewEditData || !devsAndApplicants) {
    return <NoData />;
  }

  // const applicant = interviewEditData.candidate;
  const guests = devsAndApplicants.filter((dev) => dev.rolestatus === 'Accepted' || dev.rolestatus === 'External' || dev.rolestatus === 'InHouse');
  // const session = useSession();
  // const supabase = useSupabaseClient();
  // const { isLoading } = useSessionContext();

  // const handleGoogleSignIn = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       scopes: "https://www.googleapis.com/auth/calendar",
  //     },
  //   });
  //   if (error) {
  //     console.error(
  //       "Error logging in to Google provider with Supabase:",
  //       error
  //     );
  //     toast.error("Failed to sign in with Google.");
  //   }
  // };

  const handleSignOut = async () => {
    // await supabase.auth.signOut();
  };

  const createCalendarEvent = async () => {
    {
      const event = {
        summary: eventName,
        description: eventDescription,
        start: {
          dateTime: start.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        attendees: [
          { email: 'john@example.com' },
          { email: 'jane@example.com' },
          { email: 'your-email@example.com' }, // You can include or exclude yourself
        ],
      };
    }
    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          // Authorization: "Bearer " + session.provider_token,
        },
        body: JSON.stringify(event),
      });
      const data = await response.json();
      toast.success('Event created, check your Google Calendar!');
    } catch (error) {
      console.error('Error creating calendar event:', error);
      toast.error('Failed to create the event. Please try again.');
    }
  };
  const handleEdit = async (value: InterviewFormValue) => {
    const { candidate, guests, ...rest } = value;

    const trimedCandidate = candidate.trim().toLowerCase();

    const candidateInfo = state.find((candidate) => `${candidate.firstName} ${candidate.lastName}`.trim().toLowerCase() === trimedCandidate);
    const escapedPattern = '\\s';
    const regex = new RegExp(escapedPattern, 'g');
    const mappedGuests = guests.map((guest) => guest.trim().replace(regex, '').toLowerCase());
    const guestsInfo = state.filter((guest) => mappedGuests.includes(`${guest.firstName}${guest.lastName}`.trim().replace(regex, '').toLowerCase()));
    if (!candidateInfo?.id || !guestsInfo.length) {
      toast.warning('A candidate or a guest(s) is required to schedule an event', {
        position: 'bottom-center',
      });
      return;
    }
    try {
      const response = await updateInterview({
        id: id as string,
        data: {
          candidateId: candidateInfo!.id as string,
          status: STATUS_SCHEDULED,
          guests: guestsInfo.map((item) => item.id) as string[],
          interviewType: rest.eventType,
          ...rest,
        },
      }).unwrap();
      if (response && !isUpdateError) {
        dispatch(fetchDevs()); // update the persisted data
        navigate('/devs/interviews');
      }
      toast.success('Event updated', {
        position: 'bottom-center',
      });
    } catch (error) {
      // toast.error('Cannot edit interview, pleas try again later', {
      //   position: 'bottom-center',
      // });
    }
  };
  return (
    <MainCard title={'Edit Interview'}>
      <InterviewFormFields
        handleSubmit={(values) => {}}
        _applicants={[interviewEditData?.candidate]}
        guests={guests}
        handleEdit={(values) => handleEdit(values)}
        isEditing={true}
        editableInterviewInfo={interviewEditData}
      />
    </MainCard>
  );
};

export default InterviewEdit;
