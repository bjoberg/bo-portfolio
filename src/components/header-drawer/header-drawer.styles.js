import { DrawerWidth } from '../../utils/styles/global.styles';

const HeaderDrawerStyles = theme => ({
  drawer: {
    width: DrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DrawerWidth,
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
    color: 'inherit'
  }
});

export default HeaderDrawerStyles;