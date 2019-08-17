import { drawerWidth } from '../../utils/styles/theme';

const HeaderDrawerStyles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  Link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export default HeaderDrawerStyles;
