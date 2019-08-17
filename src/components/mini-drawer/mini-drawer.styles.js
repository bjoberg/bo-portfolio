import { miniDrawerWidth } from '../../utils/theme';

const MiniDrawerStyles = theme => ({
  drawer: {
    width: miniDrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    zIndex: theme.zIndex.appBar - 1,
    width: miniDrawerWidth,
    backgroundColor: theme.palette.common.white,
    border: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  linkIsActive: {
    textDecoration: 'none',
    color: 'yellow',
  },
});

export default MiniDrawerStyles;
