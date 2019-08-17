import { drawerWidth } from '../../utils/theme';

const HeaderDrawerStyles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: theme.shadows[2],
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  Link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export default HeaderDrawerStyles;
