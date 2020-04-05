import { drawerWidth } from '../../styles';

const NavigationDrawerStyles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: theme.shadows[2],
  },
  list: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

export default NavigationDrawerStyles;
