import * as React from 'react';
import { useLocation, useNavigate } from 'react-router';
import FullscreenProgress from '../FullscreenProgress/FullscreenProgress';

function AuthCallBack() {
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    // GOOGLE OAUTH CALLBACK REDIRECT
    // Redirect the user to the main home page after handling the callback
    navigate('/dashboard/default');
  }, [location]);
  return (
    <>
      <FullscreenProgress />
    </>
  );
}
export default AuthCallBack;
