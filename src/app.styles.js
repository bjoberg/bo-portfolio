import { DrawerWidth } from './utils/styles/global.styles';

const AppStyles = theme => ({
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DrawerWidth,
  },
  snackbarMargin: {
    margin: theme.spacing(1),
  },
});

export default AppStyles;
