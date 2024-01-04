import MainCard from '../../../components/MainCard';
import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import { useGetRolesQuery } from '../../../store/services/role.service';
import NoData from '../../../components/NoData';
import RoleSkeleton from '@/components/Skeleton/roleSkeleton';
import RoleCard from './components/roleCard';
import { ArrowBackTwoTone } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const Roles = () => {
  const { data, isLoading, isFetching, isError } = useGetRolesQuery();
  const navigate = useNavigate();
  if (isLoading || isFetching) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <RoleSkeleton key={index} />
        ))}
      </>
    );
  }

  if (!data || !data.length || !data.some((item) => item.jobs.length)) {
    return <NoData />;
  }
  const renderRoles = () => {
    return (
      <Grid container /* spacing={{ xs: 2, md: 3 }} columns={{ xs: 2 }} */>
        <Box display="flex" px={2}>
          <Tooltip arrow placement="top" onClick={() => navigate(-1)} title="Go back">
            <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
              <ArrowBackTwoTone />
            </IconButton>
          </Tooltip>
        </Box>
        {data.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </Grid>
    );
  };

  return (
    <MainCard title={'Roles'}>
      <Grid sx={{ p: 1 }}>{renderRoles()}</Grid>
    </MainCard>
  );
};

export default Roles;
