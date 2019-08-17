import { createMuiTheme } from '@material-ui/core/styles';

const miniDrawerWidth = 80;
const drawerWidth = 240;
const headerHeight = 64;

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
  },
});

export {
  theme,
  miniDrawerWidth,
  drawerWidth,
  headerHeight,
};
