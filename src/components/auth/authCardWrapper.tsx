import { Box } from '@mui/material';
import MainCard from '../MainCard';

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }: { children: React.ReactNode }) => (
  <MainCard
    sx={{
      margin: { xs: 1.5, md: 2 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%',
      },
    }}
    content={false}
    {...other}
  >
    <Box sx={{ p: { xs: 1, sm: 1, xl: 2 } }}>{children}</Box>
  </MainCard>
);

export default AuthCardWrapper;
