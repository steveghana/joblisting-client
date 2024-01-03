import React from 'react';
import { Button, Typography } from '@mui/material';

interface InterviewScheduledProps {
  onClose: () => void;
}

const InterviewScheduled: React.FC<InterviewScheduledProps> = ({ onClose }) => {
  return (
    <div>
      <Typography variant="h5">Interview Scheduled Successfully!</Typography>
      <Typography>Thank you for scheduling the interview. We look forward to meeting you!</Typography>
      <Button variant="contained" color="primary" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};

export default InterviewScheduled;
