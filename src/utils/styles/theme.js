import { createMuiTheme } from '@material-ui/core/styles';

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
  drawerWidth,
  headerHeight,
};
