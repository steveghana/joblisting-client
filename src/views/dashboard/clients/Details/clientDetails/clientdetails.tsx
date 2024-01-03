// ClientDetailsPage.tsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import NewRoleForm from '../../Forms/newroleForm';
import NewJobForm from '../../Forms/newjobform';
import CustomButton from '../../../../../components/button';
import { IRoleData } from '../../../../../types/roles';
import ClientRoleTable from '../../Tables/clientRolesTable';
import NoData from '../../../../../components/NoData';

const ClientDetailsPage: React.FC<{
  data: { role: IRoleData[]; clientId: string };

  onActionComplete: () => void;
}> = ({ data, onActionComplete }) => {
  const [roleFormOpen, setRoleFormOpen] = useState(false);
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState('');

  const handleOpenRoleForm = () => {
    setRoleFormOpen(true);
  };

  const handleCloseRoleForm = () => {
    setRoleFormOpen(false);
  };

  const handleOpenJobForm = (roleId: string) => {
    setSelectedRoleId(roleId);
    setJobFormOpen(true);
  };

  const handleCloseJobForm = () => {
    setJobFormOpen(false);
  };

  return (
    <Grid item xs={12} sm={12}>
      <Paper elevation={2}>
        <Box p={2}>
          <CustomButton sx={{ my: 1 }} onClick={handleOpenRoleForm} variant="contained" text="Add new Role / Project" />

          <NewRoleForm
            onClose={() => {
              handleCloseRoleForm();
              onActionComplete();
            }}
            clientId={data.clientId}
            open={roleFormOpen}
          />

          <NewJobForm
            onClose={() => {
              handleCloseJobForm();
              onActionComplete();
            }}
            roleId={selectedRoleId}
            open={jobFormOpen}
          />

          <Typography variant="h5" component="h2" gutterBottom>
            Roles Available
          </Typography>

          {!data?.role?.length ? (
            <NoData />
          ) : (
            <ClientRoleTable data={data} handleOpenJobForm={handleOpenJobForm} onActionComplete={onActionComplete} />
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default ClientDetailsPage;
