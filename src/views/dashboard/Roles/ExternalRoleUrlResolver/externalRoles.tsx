import { Grid } from '@mui/material';
import React from 'react';
import RoleTabs from '../RoleTabs/roleTabs';
import { useParams } from 'react-router';
import Status404 from '../../../status/Status404';
import { useGetRoleQuery } from '@/store/services/role.service';
import { IRoleData } from '@/types/roles';
import FullscreenProgress from '@/components/FullscreenProgress/FullscreenProgress';

/**
 * ExternalRoles renders the external roles page.
 * It gets the role ID from the URL params and passes it to RoleTabs.
 * If no role ID is found, it renders the 404 page.
 */
const ExternalRoles = () => {
  const roleIdTrueParams = window.location.href.split('rid=')[1];
  if (!roleIdTrueParams?.length) {
    return <Status404 />;
  }
  const {
    data: role,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetRoleQuery({
    id: roleIdTrueParams as string,
  });
  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }
  if (isError || error || !role) {
    return <Status404 />;
  }

  return (
    <Grid>
      <RoleTabs role={role as IRoleData} isExternal={true} />
    </Grid>
  );
};

export default ExternalRoles;
