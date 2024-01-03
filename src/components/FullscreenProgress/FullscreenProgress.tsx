import { Box, CircularProgress, Grid } from '@mui/material';
import React from 'react';

const FullscreenProgress = () => {
  return (
    <div id="preRender">
      <div className="loader-inner">
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        {/* <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div> */}
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
      </div>
    </div>
  );
};
export const TransparentScreeProgress = () => {
  return (
    <div id="preRender">
      <div className="loader-inner">
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
        <div className="loader-line-wrap">
          <div className="loader-line"></div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenProgress;
