import { Avatar, Button, ButtonBase, Divider, Grid, GridTypeMap, IconButton, Tooltip, Typography } from '@mui/material';
import MainCard from '../../../components/MainCard';
import SubCard from '../../../components/SubCard';
import { Box } from '@mui/system';
import { ArrowBackTwoTone, BlockOutlined, MessageRounded, MoreHoriz } from '@mui/icons-material';
import CustomButton from '../../../components/button';
import { useNavigate } from 'react-router';
import { Protect } from '../../../components/auth/requireAuth';
import ClientTable from './Tables/clientTable';
import { useGetClientsQuery } from '../../../store/services/client.service';
import NoData from '../../../components/NoData';
import FullscreenProgress from '../../../components/FullscreenProgress/FullscreenProgress';
import TableSkeletonLoader from '@/components/Skeleton/tableSkeleton';
import { useClientColums } from '@/hooks/useColumns';
/**
 * Clients component displays a list of clients from the API.
 * It fetches the clients data and handles loading/error states.
 * Renders a table of clients if data is available,
 * otherwise shows loading indicator or empty state.
 * Allows navigating to add a new client.
 * Exported as default for use in route definitions.
 */

const Clients = () => {
  const columns = useClientColums();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isError, refetch } = useGetClientsQuery();
  if (isLoading || isFetching) {
    return <TableSkeletonLoader />;
  }

  return (
    <MainCard>
      <Box display="flex">
        <Tooltip arrow placement="top" onClick={() => navigate(-1)} title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoTone />
          </IconButton>
        </Tooltip>
      </Box>
      <CustomButton text="Add new Client" onClick={() => navigate('/dashboard/customers/clients/add')} />
      {!data?.length || isError ? (
        <>
          <Grid minHeight={'55dvh'}>
            <NoData />
          </Grid>
        </>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <ClientTable refetch={refetch} data={data} isError={isError} columns={columns} isFetching={isFetching} isLoading={isLoading} />
          </Grid>
        </Grid>
      )}
    </MainCard>
  );
};

// export default Clients;
export default Protect(Clients, ['Ceo', 'Recruitment']);
