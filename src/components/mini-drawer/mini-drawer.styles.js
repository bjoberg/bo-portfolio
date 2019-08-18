import { miniDrawerWidth } from '../../utils/theme';

const MiniDrawerStyles = theme => ({
  drawer: {
    minWidth: miniDrawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    zIndex: theme.zIndex.appBar - 1,
    minWidth: miniDrawerWidth,
    backgroundColor: theme.palette.common.white,
    border: 0,
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.grey[700],
  },
  linkIsActive: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
});

export default MiniDrawerStyles;
