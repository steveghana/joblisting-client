import React from 'react';
import { Button, Typography } from '@mui/material';

interface ConfirmInterviewDetailsProps {
  interviewType: string;
  interviewDate: Date;
  onBack: () => void;
  onConfirm: () => void;
}

const ConfirmInterviewDetails: React.FC<ConfirmInterviewDetailsProps> = ({ interviewType, interviewDate, onBack, onConfirm }) => {
  return (
    <div>
      <Typography variant="h5">Confirm Interview Details</Typography>
      <Typography>Interview Type: {interviewType}</Typography>
      <Typography>Interview Date: {interviewDate.toLocaleDateString()}</Typography>
      <Button variant="contained" color="primary" onClick={onConfirm}>
        Confirm
      </Button>
      <Button variant="outlined" color="info" onClick={onBack}>
        Back
      </Button>
    </div>
  );
};

export default ConfirmInterviewDetails;
