import { Avatar, ButtonBase, Container, Grid, IconButton, Tab, Tabs, Tooltip, Typography, useMediaQuery } from '@mui/material';
import SubCard from '../../../../components/SubCard';
import React, { ChangeEvent, useState } from 'react';
import { Box, styled, useTheme } from '@mui/system';
import RoleDetails from '../components/roledetails';
import { ArrowBackTwoTone, Close } from '@mui/icons-material';
import { themePalette } from '@/themes/schemes/palette';
import JobsPage from '../JobsTab';
import { useGetRoleQuery } from '@/store/services/role.service';
import FullscreenProgress from '@/components/FullscreenProgress/FullscreenProgress';
import { IRoleData } from '@/types/roles';
import { IClient } from '@/types/client';
import MainCard from '@/components/MainCard';
import Applicants from '../../Applicants/Tables/applicants';
import { useNavigate } from 'react-router';
const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`,
);
type IRoleTabs = {
  role: IRoleData;
  isExternal?: boolean;
};
const RoleTabs = ({ role, isExternal }: IRoleTabs) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const hasToken = sessionStorage.getItem('auth_token') as string;
  const isLargerScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [currentTab, setCurrentTab] = React.useState<string>('overview');
  const roleTabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'jobs', label: 'Jobs' },
    { value: 'applicants', label: 'Applicants' },
  ];
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    //dont propagate to the drawer component
    event.stopPropagation();
    setCurrentTab(value);
  };
  const tabs = isExternal || !hasToken ? roleTabs.filter((tab) => tab.value !== 'applicants') : roleTabs;

  return (
    <Grid
      // container
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onKeyUp={(e) => e.stopPropagation()}
    >
      <Grid position={'relative'}>
        <SubCard>
          <Container maxWidth="xl">
            {hasToken && (
              <Box display="flex">
                <Tooltip arrow placement="top" onClick={() => navigate(-1)} title="Go back">
                  <IconButton color="primary" sx={{ mr: 2 }}>
                    <ArrowBackTwoTone />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            <Grid
              // item
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              // spacing={3}
            >
              <Box sx={{ width: '100%' }} display={'flex'} gap={2} my={2} p={{ lg: 2, md: 1, sm: 1 }} alignItems={'center'} flexWrap={'wrap'}>
                <Avatar sx={{ width: 56, height: 56 }} variant="rounded" src={role?.client!.companyLogo} />
                <Box>
                  <Typography variant="h4">{role?.client!.companyName}</Typography>
                  <Typography>
                    {role!.client!.aboutTheCompany}
                    {/* Makes cloud security simple, contextual and automated for
                    customers */}
                  </Typography>
                </Box>
              </Box>
              <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                <TabsWrapper
                  onChange={handleTabsChange}
                  value={currentTab}
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {tabs.map((tab) => {
                    // Only render the "People" tab on larger screens
                    if (tab.value === 'people' && !isLargerScreen) {
                      return null;
                    }
                    return <Tab sx={{ fontSize: '.7rem' }} key={tab.value} label={tab.label} value={tab.value} />;
                  })}
                </TabsWrapper>
              </Grid>

              <Grid lg={12} xs={12}>
                {currentTab === 'overview' && <RoleDetails setCurrentTab={setCurrentTab} role={role as IRoleData} />}
                {currentTab === 'jobs' && <JobsPage job={role!.jobs} client={role!.client as IClient} roleId={role!.id as string} />}
                {currentTab === 'applicants' && (
                  // <MainCard>
                  <Grid container spacing={3} overflow={'auto'}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Applicants roleid={role!.id as string} />
                    </Grid>
                  </Grid>
                  // </MainCard>
                )}
              </Grid>
            </Grid>
          </Container>
        </SubCard>
      </Grid>
    </Grid>
  );
};
export default RoleTabs;
