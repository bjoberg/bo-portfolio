import { createMuiTheme } from '@material-ui/core/styles';

const miniDrawerWidth = 80;
const drawerWidth = 250;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e5ffff',
      main: '#b2dfdb',
      dark: '#82ada9',
      contrastText: '#006064',
    },
    background: {
      default: '#ffffff',
    },
    action: {
      hover: '#e5ffff',
    },
  },
  typography: {
    subtitle1: {
      fontWeight: 900,
    },
    subtitle2: {
      color: '#616161', // default grey[700]
    },
  },
});

export {
  theme,
  miniDrawerWidth,
  drawerWidth,
};
