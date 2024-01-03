import { alpha, createTheme, lighten, darken } from '@mui/material';
import '@mui/lab/themeAugmentation';
//@ts-ignore
import color from '../../assets/scss/_themes-vars.module.scss';
export const themeOption = {
  colors: color,
  heading: color.grey900,
  paper: color.paper,
  backgroundDefault: color.paper,
  background: color.primaryLight,
  darkTextPrimary: color.grey700,
  darkTextSecondary: color.grey500,
  textDark: color.grey900,
  menuSelected: color.primaryDark,
  menuSelectedBack: color.primaryLight,
  divider: color.grey200,
  // customization,
};
const themeColors = {
  primary: '#00f2fe',
  secondary: '#6E759F',
  success: '#57CA22',
  warning: '#FFA319',
  error: '#FF1943',
  info: '#33C2FF',
  black: '#223354',
  white: '#ffffff',
  primaryAlt: '#000C57',
};
export const colors = {
  gradients: {
    blue1: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
    blue2: 'linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)',
    blue3: 'linear-gradient(127.55deg, #141E30 3.73%, #243B55 92.26%)',
    blue4: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
    blue5: 'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
    orange1: 'linear-gradient(135deg, #FCCF31 0%, #F55555 100%)',
    orange2: 'linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)',
    orange3: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    purple1: 'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)',
    purple3: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pink1: 'linear-gradient(135deg, #F6CEEC 0%, #D939CD 100%)',
    pink2: 'linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)',
    green1: 'linear-gradient(135deg, #FFF720 0%, #3CD500 100%)',
    green2: 'linear-gradient(to bottom, #00b09b, #96c93d)',
    black1: 'linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%)',
    black2: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
  },
  shadows: {
    success: '0px 1px 4px rgba(68, 214, 0, 0.25), 0px 3px 12px 2px rgba(68, 214, 0, 0.35)',
    error: '0px 1px 4px rgba(255, 25, 67, 0.25), 0px 3px 12px 2px rgba(255, 25, 67, 0.35)',
    info: '0px 1px 4px rgba(51, 194, 255, 0.25), 0px 3px 12px 2px rgba(51, 194, 255, 0.35)',
    primary: '0px 1px 4px rgba(85, 105, 255, 0.25), 0px 3px 12px 2px rgba(85, 105, 255, 0.35)',
    warning: '0px 1px 4px rgba(255, 163, 25, 0.25), 0px 3px 12px 2px rgba(255, 163, 25, 0.35)',
    card: '0px 9px 16px rgba(159, 162, 191, .18), 0px 2px 2px rgba(159, 162, 191, 0.32)',
    cardSm: '0px 2px 3px rgba(159, 162, 191, .18), 0px 1px 1px rgba(159, 162, 191, 0.32)',
    cardLg: '0 5rem 14rem 0 rgb(255 255 255 / 30%), 0 0.8rem 2.3rem rgb(0 0 0 / 60%), 0 0.2rem 0.3rem rgb(0 0 0 / 45%)',
  },
  layout: {
    general: {
      bodyBg: '#f2f5f9',
    },
    sidebar: {
      background: 'black',
      textColor: themeColors.secondary,
      dividerBg: '#f2f5f9',
      menuItemColor: '#242E6F',
      menuItemColorActive: themeColors.primary,
      menuItemBg: themeColors.black,
      menuItemBgActive: '#f2f5f9',
      menuItemIconColor: lighten(themeColors.secondary, 0.3),
      menuItemIconColorActive: themeColors.primary,
      menuItemHeadingColor: darken(themeColors.secondary, 0.3),
    },
  },
  alpha: {
    white: {
      5: alpha(themeColors.white, 0.02),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white,
    },
    trueWhite: {
      5: alpha(themeColors.white, 0.02),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white,
    },
    black: {
      5: alpha(themeColors.black, 0.02),
      10: alpha(themeColors.black, 0.1),
      30: alpha(themeColors.black, 0.3),
      50: alpha(themeColors.black, 0.5),
      70: alpha(themeColors.black, 0.7),
      100: themeColors.black,
    },
  },
  common: {
    black: color?.darkPaper,
  },
  // secondary: {
  secondary: {
    light: color?.secondaryLight,
    main: color?.secondaryMain,
    dark: color?.secondaryDark,
    200: color?.secondary200,
    800: color?.secondary800,
  },
  // },
  primary: {
    light: color?.primaryLight,
    main: color?.primaryMain,
    dark: color?.primaryDark,
    200: color?.primary200,
    800: color?.primary800,
  },
  success: {
    light: color?.successLight,
    200: color?.success200,
    main: color?.successMain,
    dark: color?.successDark,
  },

  warning: {
    light: color?.warningLight,
    main: color?.warningMain,
    dark: color?.warningDark,
  },
  error: {
    light: color?.errorLight,
    main: color?.errorMain,
    dark: color?.errorDark,
  },
  info: {
    lighter: lighten(themeColors.info, 0.85),
    light: lighten(themeColors.info, 0.3),
    main: themeColors.info,
    dark: darken(themeColors.info, 0.2),
  },
  orange: {
    light: color?.orangeLight,
    main: color?.orangeMain,
    dark: color?.orangeDark,
  },
  grey: {
    50: color?.grey50,
    100: color?.grey100,
    500: themeOption.darkTextSecondary,
    600: themeOption.heading,
    700: themeOption.darkTextPrimary,
    900: themeOption.textDark,
  },
  dark: {
    light: color?.darkTextPrimary,
    main: color?.darkLevel1,
    dark: color?.darkLevel2,
    800: color?.darkBackground,
    900: color?.darkPaper,
  },
  text: {
    primary: themeOption.darkTextPrimary,
    secondary: themeOption.darkTextSecondary,
    dark: themeOption.textDark,
    hint: color?.grey100,
  },
  background: {
    paper: themeOption.paper,
    default: themeOption.backgroundDefault,
  },
};
/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

const theme = themeOption;
export const themePalette = {
  // mode: theme?.customization?.navType,
  common: {
    black: theme.colors?.darkPaper,
  },
  primary: {
    light: theme.colors?.primaryLight,
    main: theme.colors?.primaryMain,
    dark: theme.colors?.primaryDark,
    200: theme.colors?.primary200,
    800: theme.colors?.primary800,
  },
  secondary: {
    light: theme.colors?.secondaryLight,
    main: theme.colors?.secondaryMain,
    dark: theme.colors?.secondaryDark,
    200: theme.colors?.secondary200,
    800: theme.colors?.secondary800,
  },
  error: {
    light: theme.colors?.errorLight,
    main: theme.colors?.errorMain,
    dark: theme.colors?.errorDark,
  },
  info: {
    lighter: lighten(themeColors.info, 0.85),
    light: lighten(themeColors.info, 0.3),
    main: themeColors.info,
    dark: darken(themeColors.info, 0.2),
  },
  orange: {
    light: theme.colors?.orangeLight,
    main: theme.colors?.orangeMain,
    dark: theme.colors?.orangeDark,
  },
  warning: {
    light: theme.colors?.warningLight,
    main: theme.colors?.warningMain,
    dark: theme.colors?.warningDark,
  },
  success: {
    light: theme.colors?.successLight,
    200: theme.colors?.success200,
    main: theme.colors?.successMain,
    dark: theme.colors?.successDark,
  },
  grey: {
    50: theme.colors?.grey50,
    100: theme.colors?.grey100,
    500: theme.darkTextSecondary,
    600: theme.heading,
    700: theme.darkTextPrimary,
    900: theme.textDark,
  },
  dark: {
    light: theme.colors?.darkTextPrimary,
    main: theme.colors?.darkLevel1,
    dark: theme.colors?.darkLevel2,
    800: theme.colors?.darkBackground,
    900: theme.colors?.darkPaper,
  },
  text: {
    primary: theme.darkTextPrimary,
    secondary: theme.darkTextSecondary,
    dark: theme.textDark,
    hint: theme.colors?.grey100,
  },
  background: {
    paper: theme.paper,
    default: theme.backgroundDefault,
  },
};
