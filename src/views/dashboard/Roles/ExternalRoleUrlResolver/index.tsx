import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FullscreenProgress from '../../../../components/FullscreenProgress/FullscreenProgress';
import axios from 'axios';
import _api_url from '../../../../api/_api_url';
import { SET_MENU } from '../../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

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
        .get(`http://localhost:5000/roleshorturl`, {
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

  /**
   * Boolean indicating if an error occurred while resolving the short URL.
   */
  if (hasError) {
    return (
      <div className="shortUrlPage">
        <h1>Not found</h1>
        <div className="svgcontainer">
          <svg width="200" height="250" viewBox="0 0 30 27" fill="gray" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3929 20.6633C13.3929 21.1017 13.5623 21.5221 13.8636 21.8322C14.165 22.1422 14.5738 22.3163 15 22.3163C15.4262 22.3163 15.835 22.1422 16.1364 21.8322C16.4377 21.5221 16.6071 21.1017 16.6071 20.6633C16.6071 20.2248 16.4377 19.8044 16.1364 19.4944C15.835 19.1844 15.4262 19.0102 15 19.0102C14.5738 19.0102 14.165 19.1844 13.8636 19.4944C13.5623 19.8044 13.3929 20.2248 13.3929 20.6633V20.6633ZM13.9286 10.1939V16.5306C13.9286 16.6821 14.0492 16.8061 14.1965 16.8061H15.8035C15.9508 16.8061 16.0714 16.6821 16.0714 16.5306V10.1939C16.0714 10.0423 15.9508 9.91837 15.8035 9.91837H14.1965C14.0492 9.91837 13.9286 10.0423 13.9286 10.1939ZM29.8552 25.3469L15.9274 0.55102C15.7198 0.182526 15.3616 0 15 0C14.6384 0 14.2768 0.182526 14.0726 0.55102L0.144813 25.3469C-0.266994 26.0839 0.248602 27 1.07222 27H28.9278C29.7514 27 30.267 26.0839 29.8552 25.3469ZM3.62341 24.3861L15 4.12921L26.3766 24.3861H3.62341V24.3861Z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="shortUrlPage">
      <FullscreenProgress />
    </div>
  );
};

export default ShortUrlPage;
