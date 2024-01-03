// import { Helmet } from "react-helmet-async";
// import Footer from "../../../../../../components/Footer";

import { Grid, Container } from '@mui/material';

import ProfileCover from '../../../components/profile/ProfileCover';
import RecentActivity from '../../../components/profile/RecentActivity';
import { IUser, Iuser } from '../../../types/user';
// import { userdata as user } from '../../../components/settings/userdata';
import { useGetUserQuery } from '@/store/services/userAuth.service';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import NoData from '@/components/NoData';
import Loader from '@/components/Loader';
import { Protect } from '@/components/auth/requireAuth';
function ManagementUserProfile() {
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

  // Store google information on the backend as simeple json and parse to use in profile page
  return (
    <>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12} md={12}>
            <ProfileCover user={data as IUser} />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
// export default ManagementUserProfile;
export default Protect(ManagementUserProfile, ['Ceo', 'Recruitment']);
