import { miniDrawerWidth } from '../../utils/theme';

const MiniDrawerListItemStyles = theme => ({
  root: {
    color: theme.palette.grey[800],
    width: miniDrawerWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderRadius: miniDrawerWidth,
    },
  },
});

export default MiniDrawerListItemStyles;
