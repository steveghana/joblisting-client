// AboutCompany.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const AboutCompany = ({ description }: { description: string }) => (
  <Box mt={4}>
    <Typography variant="h5">About the Company</Typography>
    <Typography variant="body1">{description}</Typography>
  </Box>
);

export default AboutCompany;
