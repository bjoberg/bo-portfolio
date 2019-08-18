import { miniDrawerWidth } from '../../utils/theme';

const MiniDrawerListItemStyles = theme => ({
  root: {
    minWidth: miniDrawerWidth,
    minHeight: miniDrawerWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderRadius: miniDrawerWidth,
    },
    color: 'inherit',
  },
});

export default MiniDrawerListItemStyles;
