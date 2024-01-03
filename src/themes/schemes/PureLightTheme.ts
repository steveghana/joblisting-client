import { alpha, createTheme, lighten, darken } from '@mui/material';
import '@mui/lab/themeAugmentation';
import { colors } from './palette';
import { styleOverrides } from './compStyleOverride';
import Overides from '../compStyleOverride';
import { themeOption as theme } from './palette';

export const themeColors = {
  primary: '#5569ff',
  secondary: '#6E759F',
  success: '#57CA22',
  warning: '#FFA319',
  error: '#FF1943',
  info: '#33C2FF',
  black: '#223354',
  white: '#ffffff',
  primaryAlt: '#000C57',
};
const bgColor = theme.colors?.grey50;
export const componentThemeoption = {
  customInput: {
    marginTop: 1,
    marginBottom: 1,
    '& > label': {
      top: 23,
      left: 0,
      color: theme.colors.grey500,
      '&[data-shrink="false"]': {
        top: 5,
      },
    },
    '& > div > input': {
      padding: '30.5px 14px 11.5px !important',
    },
    '& legend': {
      display: 'none',
    },
    '& fieldset': {
      top: 0,
    },
  },
  mainContent: {
    backgroundColor: theme.background,
    width: '100%',
    minHeight: 'calc(100vh - 88px)',
    flexGrow: 1,
    padding: '10px',
    marginTop: '88px',
    marginRight: '20px',
    borderRadius: `${20}px`,
  },
  menuCaption: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.heading,
    padding: '6px',
    textTransform: 'capitalize',
    marginTop: '10px',
  },
  subMenuCaption: {
    fontSize: '0.6875rem',
    fontWeight: 500,
    color: theme.darkTextSecondary,
    textTransform: 'capitalize',
  },
  commonAvatar: {
    cursor: 'pointer',
    borderRadius: '8px',
  },
  smallAvatar: {
    width: '22px',
    height: '22px',
    fontSize: '1rem',
  },
  mediumAvatar: {
    width: '34px',
    height: '34px',
    fontSize: '1.2rem',
  },
  largeAvatar: {
    width: '44px',
    height: '44px',
    fontSize: '1.5rem',
  },
};

export const PureLightTheme = createTheme({
  // direction: i18n.dir(),
  colors: styleOverrides.colors,
  general: styleOverrides.general,
  header: styleOverrides.header,
  sidebar: styleOverrides.sidebar,
  //@ts-ignore
  components: Overides(theme),
  mixins: {
    toolbar: {
      minHeight: '48px',
      padding: '16px',
      '@media (min-width: 600px)': {
        minHeight: '48px',
      },
    },
  },
  // shape: {
  //   borderRadius: 10,
  // },

  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',

    h6: {
      fontWeight: 500,
      color: theme.heading,
      fontSize: '0.75rem',
    },
    h5: {
      fontSize: '1.175rem',
      color: theme.heading,
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.3rem',
      color: theme.heading,
      fontWeight: 700,
      fontFamily: ['Poppins', 'san serif'].join(','),
    },
    h3: {
      fontSize: '1.45rem',
      color: theme.heading,
      fontWeight: 600,
      fontFamily: ['Didact Gothic', 'san serif'].join(','),
    },
    h2: {
      fontSize: '1.6rem',
      color: theme.heading,
      fontWeight: 700,
      fontFamily: ['Didact Gothic', 'san serif'].join(','),
    },
    h1: {
      fontSize: '2.125rem',
      color: theme.heading,
      fontWeight: 700,
      fontFamily: ['Didact Gothic', 'san serif'].join(','),
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.textDark,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: theme.darkTextSecondary,
    },
    caption: {
      fontSize: '0.7rem',
      color: theme.darkTextSecondary,
      fontFamily: ['Poppins', 'san serif'].join(','),

      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontFamily: ['Lato', 'san serif'].join(','),
      fontWeight: 400,
      lineHeight: '1.334em',
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: theme.darkTextPrimary,
      fontFamily: ['Lato', 'san serif'].join(','),
    },
    button: {
      textTransform: 'capitalize',
      fontFamily: ['Poppins', 'san-serif'].join(','),
    },
  },
});
