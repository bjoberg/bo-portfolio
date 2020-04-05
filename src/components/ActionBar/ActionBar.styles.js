const ActionBarStyles = theme => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  navButton: {
    marginRight: theme.spacing(2),
  },
  actionButtonGroup: {
    marginRight: theme.spacing(2),
  },
  titleContainer: {
    flexGrow: 1,
  },
  title: {
    textDecoration: 'none',
    fontWeight: 800,
    color: 'inherit',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export default ActionBarStyles;
