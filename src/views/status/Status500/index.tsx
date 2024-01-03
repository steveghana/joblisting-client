import { useState } from 'react';
import { Box, Typography, Hidden, Container, Button, Grid } from '@mui/material';
// import { Helmet } from "react-helmet-async";
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import LoadingButton from '@mui/lab/LoadingButton';
import status404 from '../../../assets/status/500.svg';

import { styled } from '@mui/material/styles';
import CustomButton from '../../../components/button';
import AuthFooter from '../../../components/AuthFooter';

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors?.gradients.black1};
`,
);

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`,
);
const StatusImage = styled('img')({
  height: 260,
});

function Status500() {
  const [pending, setPending] = useState(false);
  function handleClick() {
    window.location.reload();
  }

  return (
    <>
      {/* <Helmet>
        <title>Status - 500</title>
      </Helmet> */}
      <MainContent>
        <Grid container sx={{ background: 'white', alignSelf: 'center' }} height="100dvh" alignItems="stretch" spacing={0}>
          <Grid xs={12} md={12} alignItems="center" display="flex" justifyContent="center" mt={'auto'} item>
            <Container maxWidth="lg">
              <Box textAlign="center" display="flex" alignItems="center">
                <StatusImage alt="500" src={status404} />
                <Box ml={2}>
                  <Typography color="text.secondary" variant="h2">
                    There was an error, please try again later
                  </Typography>
                  <Typography variant="h4" color="text.secondary" fontWeight="normal">
                    The server encountered an internal error and was not able to complete your request
                  </Typography>
                  <Box display={'flex'} justifyContent={'center'} gap={1}>
                    <CustomButton text="Refresh view" onClick={handleClick} loading={pending} color="primary" endIcon={<RefreshTwoToneIcon />} />
                    <CustomButton text="Go back" href="/auth/login" variant="outlined" sx={{ ml: 1 }} />
                  </Box>
                </Box>
              </Box>
            </Container>
          </Grid>
          <Hidden>
            <GridWrapper xs={12} md={12} sx={{}} alignItems="center" display="flex" justifyContent="center" item>
              <Container maxWidth="sm">
                <Box display={'flex'} justifyContent={'center'} color={'black'} textAlign="center">
                  <AuthFooter />
                </Box>
              </Container>
            </GridWrapper>
          </Hidden>
        </Grid>
      </MainContent>
    </>
  );
}

export default Status500;
