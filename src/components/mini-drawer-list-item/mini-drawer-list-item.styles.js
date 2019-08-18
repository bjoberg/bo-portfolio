import { miniDrawerWidth } from '../../utils/theme';

const MiniDrawerListItemStyles = theme => ({
  link: {
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
    textDecoration: 'none',
    color: theme.palette.grey[700],
  },
  linkIsActive: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
  },
});

export default MiniDrawerListItemStyles;
