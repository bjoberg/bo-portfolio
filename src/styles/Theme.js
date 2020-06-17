import { createMuiTheme } from '@material-ui/core/styles';
import { green, deepOrange, grey } from '@material-ui/core/colors';

const miniDrawerWidth = 60;
const drawerWidth = 250;

const Theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: deepOrange,
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Playfair Display',
      'serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '4.25rem',
      fontWeight: 700,
    },
    subtitle2: {
      color: grey[700],
    },
  },
  image: {
    height: {
      small: 175,
      large: 250,
    },
  },
});

export {
  Theme,
  miniDrawerWidth,
  drawerWidth,
};
