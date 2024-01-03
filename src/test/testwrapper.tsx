import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'nprogress/nprogress.css';
import '../src/assets/scss/style.scss';
import { Provider } from 'react-redux';
import store, { persistor } from '../store';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';

const Testwrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate /* s */ persistor={persistor}>{children}</PersistGate>
      </BrowserRouter>
    </Provider>
  );
};

export default Testwrapper;
