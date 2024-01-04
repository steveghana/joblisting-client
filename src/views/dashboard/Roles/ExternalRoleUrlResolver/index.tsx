import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FullscreenProgress from '../../../../components/FullscreenProgress/FullscreenProgress';
import axios from 'axios';
import _api_url from '../../../../api/_api_url';
import { SET_MENU } from '../../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Status404 from '@/views/status/Status404';

/**
 * ShortUrlPage component resolves a short URL to a long URL and navigates to it.
 * It shows a loading indicator while resolving, error page if resolution fails.
 */
const ShortUrlPage: React.FunctionComponent = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const { shortComponent } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resolveShortRoleUrl = async () => {
    setHasError(false);
    if (shortComponent) {
      await axios
        .get(`${_api_url.getApiUrl()}/roleshorturl`, {
          params: { shortComponent: shortComponent },
        })
        .then(({ data: longComponent }) => {
          if (longComponent.startsWith('http:') || longComponent.startsWith('https:')) {
            window.location.replace(longComponent);
          } else {
            navigate(longComponent, { replace: true });
          }
        })
        .catch((err) => {
          console.error(err);
          setHasError(true);
        });
    } else {
      setHasError(true);
    }
  };
  useEffect(() => {
    dispatch({ type: SET_MENU, opened: false });
    resolveShortRoleUrl();
  }, [shortComponent]);

  if (hasError) {
    return <Status404 />;
  }

  return (
    <div className="shortUrlPage">
      <FullscreenProgress />
    </div>
  );
};

export default ShortUrlPage;
