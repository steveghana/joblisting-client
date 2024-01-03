import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTypedDispatch, useTypedSelector } from '../../../store';
import { fetchDevs } from '../../../store/slices/dev.slice';
import { toast } from 'react-toastify';
import { useAddInterviewMutation } from '../../../store/services/interview.service';
import InterviewFormFields from '../Events/EventForm';
import { InterviewFormValue } from '../../../types/interviews';

export const STATUS_PENDING = 'Pending';
// export const STATUS_ACCEPTED = 'Accepted';
export const STATUS_SCHEDULED = 'Scheduled';

const InterviewScheduler: React.FC = () => {
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [addInterview, { isError, isLoading }] = useAddInterviewMutation();

  useEffect(() => {
    dispatch(fetchDevs());
  }, [dispatch]);

  const state = useTypedSelector((state) => state.devs.devs);
  const editableApplicant = id && state.filter((item) => item.id === id && item.rolestatus === STATUS_PENDING);
  const applicants = state.filter((item) => item.rolestatus === STATUS_PENDING);
  const interviewers =
    state?.filter((item) => item.rolestatus === 'Accepted' || item.rolestatus === 'InHouse' || item.rolestatus === 'External') || [];

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
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
      // toast.error('Failed to create the event. Please try again.');
    }
  };

  const handleSubmit = async (values: InterviewFormValue) => {
    const { candidate, guests, ...rest } = values;
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
      const response = await addInterview({
        candidateId: candidateInfo!.id as string,
        guests: guestsInfo.map((item) => item.id) as string[],
        interviewType: rest.eventType,
        ...rest,
        status: STATUS_SCHEDULED,
      }).unwrap();

      if (response && !isError) {
        dispatch(fetchDevs()); // update the persisted data
        navigate('/devs/interviews');
        toast.success('Interview Scheduled Successfully', {
          position: 'bottom-center',
        });
      }
    } catch (error) {
      toast.error('Could not Schedule interview', {
        position: 'bottom-center',
      });
    }
  };

  return (
    <div>
      <InterviewFormFields
        isEditing={false}
        editableInterviewInfo={null}
        _applicants={editableApplicant || applicants}
        guests={interviewers}
        handleSubmit={(values) => handleSubmit(values)}
        handleEdit={(values) => {}}
      />
    </div>
  );
};

export default InterviewScheduler;
