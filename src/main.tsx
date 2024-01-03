import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'nprogress/nprogress.css';
import '../src/assets/scss/style.scss';
import App from './App';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import FullscreenProgress from './components/FullscreenProgress/FullscreenProgress';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate /* s */ persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>,
);
