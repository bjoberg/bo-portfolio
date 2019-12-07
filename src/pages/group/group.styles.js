const GroupPageStyles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    minHeight: '100vh',
    width: '100vw',
    zIndex: theme.zIndex.snackbar - 1,
    backgroundColor: theme.palette.background.default,
  },
  gridContainer: {
    maxWidth: theme.breakpoints.values.lg,
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  toolbar: theme.mixins.toolbar,
});

export default GroupPageStyles;
