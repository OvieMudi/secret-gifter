import { createMuiTheme } from '@material-ui/core/styles';

const primary = '#E61643';
const primaryDark = '#a10f2e';
const primaryLight = '#eb4468';

const secondary = '#01701F';
const secondaryLight = '#338c4b';
const secondaryDark = '#004e15';

const textPrimary = '#666';

const browerFontSize = 10;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
      light: primaryLight,
      dark: primaryDark,
    },
    secondary: {
      main: secondary,
      light: secondaryLight,
      dark: secondaryDark,
    },
    text: {
      primary: textPrimary,
    },
  },
  typography: {
    pxToRem: (size) => `${size / browerFontSize}rem`,
    fontFamily:
      'Exo, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
    h1: {
      fontFamily: 'Mountains of Christmas, cursive',
    },
    h2: {
      fontFamily: 'Mountains of Christmas, cursive',
    },
    h3: {
      fontFamily: 'Mountains of Christmas, cursive',
    },
  },
  breakpoints: {
    values: { xs: 0, xsm: 420, sm: 600, xmd: 840, md: 960, lg: 1280, xl: 1920 },
  },
});

export default theme;
