import React from 'react';
import { Container, Paper, Grid } from '@mui/material';
import { Protect } from '../../../../../components/auth/requireAuth';
import NoData from '../../../../../components/NoData';
import { FormDataProvider } from '../../../../../contexts/clientFormContext';
import ClientDetailsPage from './clientdetails';
import { IRoleData } from '../../../../../types/roles';

const ClientDetailsOverview = ({ data, onActionComplete }: { data: { role: IRoleData[]; clientId: string }; onActionComplete: () => void }) => {
  if (!data) {
    return <NoData />;
  }
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} sm={12}>
          <Paper elevation={2}>
            <FormDataProvider>
              <ClientDetailsPage data={data} onActionComplete={onActionComplete} />
            </FormDataProvider>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Protect(ClientDetailsOverview, ['Ceo', 'Recruitment']);
