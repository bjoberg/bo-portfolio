import { miniDrawerWidth } from './utils/theme';

const AppStyles = theme => ({
  container: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: miniDrawerWidth + theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },
  toolbar: theme.mixins.toolbar,
  snackbarMargin: {
    margin: theme.spacing(1),
  },
});

export default AppStyles;
