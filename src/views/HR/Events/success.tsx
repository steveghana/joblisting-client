import React from 'react';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const SpinnerContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const SuccessPage: React.FC = () => {
  return (
    <main>
      {/* Spinner */}
      <SpinnerContainer>
        <CircularProgress color="secondary" />
      </SpinnerContainer>

      {/* Your SuccessPage content goes here */}
      <section id="SuccessPage">{/* Add your success page content */}</section>
    </main>
  );
};

export default SuccessPage;
