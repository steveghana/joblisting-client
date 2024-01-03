import { useState, ChangeEvent } from 'react';
import { Container, Tabs, Tab, Grid } from '@mui/material';
import Footer from '../../../components/Footer';
import { styled } from '@mui/material/styles';
import ActivityTab from '../../../components/settings/ActivityTab';
import EditProfileTab from '../../../components/settings/EditProfileTab';
import NotificationsTab from '../../../components/settings/NotificationsTab';
import SecurityTab from '../../../components/settings/SecurityTab';
import MainCard from '../../../components/MainCard';
import { useNavigate, useParams } from 'react-router';
import { useGetUserQuery } from '@/store/services/userAuth.service';
import Loader from '@/components/Loader';
import NoData from '@/components/NoData';
import { toast } from 'react-toastify';
import { Protect } from '@/components/auth/requireAuth';
const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`,
);
function ManagementUserSettings() {
  const [currentTab, setCurrentTab] = useState<string>('profile');
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id || id === undefined) {
    navigate(-1);
    toast.error('Invalid user', { position: 'top-right' });
  }
  const { data, isError, isLoading, isFetching } = useGetUserQuery({ id: id as string });
  if (isLoading || isFetching) {
    return <Loader />;
  }
  if (!data || isError) {
    toast.error('Error user wasnt found');
    return <NoData />;
  }
  const tabs = [
    { value: 'profile', label: 'Profile' },
    { value: 'edit_profile', label: 'Edit Profile' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Passwords/Security' },
  ];
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  return (
    <>
      <MainCard>
        <Container maxWidth="lg">
          <Grid mt={2}>
            <Grid item xs={12}>
              <TabsWrapper
                onChange={handleTabsChange}
                value={currentTab}
                variant="scrollable"
                scrollButtons="auto"
                // textColor="primary"
                // indicatorColor="primary"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabsWrapper>
            </Grid>
            <Grid item xs={12}>
              {currentTab === 'profile' && <ActivityTab user={data} insettings={true} />}
              {currentTab === 'edit_profile' && <EditProfileTab user={data} />}
              {currentTab === 'notifications' && <NotificationsTab /* user={data}  */ />}
              {currentTab === 'security' && <SecurityTab user={data} insettings={true} />}
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </MainCard>
    </>
  );
}
// export default ManagementUserSettings;
export default Protect(ManagementUserSettings, ['Ceo', 'Recruitment']);
