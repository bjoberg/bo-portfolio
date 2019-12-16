const GroupPageStyles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    minHeight: '100vh',
    width: '100vw',
    zIndex: theme.zIndex.modal - 1,
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  gridContainer: {
    width: '100%',
    maxWidth: theme.breakpoints.values.lg,
    marginTop: theme.spacing(4),
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    overflow: 'hidden',
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
