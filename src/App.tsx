import { useSelector } from 'react-redux';
import './styles/main.scss';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
// import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
// routing
import Routes from './routes';
// defaultTheme
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// project imports
import NavigationScroll from './layout/NavigationScroll';
import { PureLightTheme } from './themes/schemes/PureLightTheme';
// ==============================|| APP ||============================== //
import Status500 from './views/status/Status500';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const App = () => {
  function fallbackRender(props: FallbackProps) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    return (
      <>
        <Status500 />
      </>
    );
  }

  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={PureLightTheme}>
            <CssBaseline />
            <NavigationScroll>
              <Routes />
            </NavigationScroll>
          </ThemeProvider>
        </StyledEngineProvider>
      </LocalizationProvider>
      <ToastContainer />
    </ErrorBoundary>
  );
};

export default App;
