import { Avatar, Divider, Grid, IconButton, Tab, Tabs, Tooltip, styled } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { ArrowBackTwoTone } from '@mui/icons-material';
import ClientDetailsOverview from './clientDetails/overview';
import { useNavigate, useParams } from 'react-router';
import { useGetClientQuery } from '../../../../store/services/client.service';
import FullscreenProgress from '../../../../components/FullscreenProgress/FullscreenProgress';
import ClientEmployees from '../Tables/clientEmployeesTable';
import { IRoleData } from '@/types/roles';
import { IDev } from '@/types/devs';
import ClientTopCard from './clientDetails/clientTopCard';
import { IClient } from '@/types/client';
import StatusComingSoon from '@/views/status/ComingSoon';
const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`,
);
type Tabstring = 'projects' | 'tasks' | 'devs';
const ClientDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentTab, setCurrentTab] = React.useState<Tabstring>('projects');
  const { data, isError, isLoading, isFetching, refetch } = useGetClientQuery(
    {
      id: id as string,
    },
    { refetchOnMountOrArgChange: true },
  );
  const tabs = [
    { value: 'projects', label: 'Project' },
    { value: 'tasks', label: 'Tasks' },
    { value: 'devs', label: 'Developers' },
  ];
  const handleTabsChange = (event: ChangeEvent<{}>, value: Tabstring): void => {
    //dont propagate to the drawer component
    event.stopPropagation();
    setCurrentTab(value);
  };
  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }
  return (
    <Grid sx={{ background: 'white', p: 1 }}>
      <Tooltip arrow placement="top" title="Go back">
        <IconButton color="primary" onClick={() => navigate(-1)} sx={{ p: 2, mr: 2 }}>
          <ArrowBackTwoTone />
        </IconButton>
      </Tooltip>
      <ClientTopCard data={data as IClient} />
      <Divider sx={{ m: 2 }} />
      <>
        <Grid mt={2} item xs={12} display={'flex'} justifyContent={'space-between'}>
          <TabsWrapper
            onChange={handleTabsChange}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab sx={{ fontSize: '.7rem' }} key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </TabsWrapper>
        </Grid>
        <Grid xs={12}>
          {currentTab === 'projects' && (
            <ClientDetailsOverview data={{ clientId: data!.id as string, role: data!.roles as IRoleData[] }} onActionComplete={() => refetch()} />
          )}
          {currentTab === 'tasks' && (
            <div>
              <StatusComingSoon />
            </div>
          )}
          {currentTab === 'devs' && <ClientEmployees devs={data!.developers as IDev[]} /* roles={data?.roles as IRoleData[]} */ />}
        </Grid>
      </>
    </Grid>
  );
};
export default ClientDetails;
