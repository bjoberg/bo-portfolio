const GroupImageStyles = theme => ({
  root: {
    height: '100vh',
    width: '100vw',
  },
  background: {
    backgroundColor: theme.palette.common.black,
  },
  errorMessage: {
    marginBottom: theme.spacing(3),
  },
  iconButton: {
    color: theme.palette.common.white,
  },
  image: {
    maxHeight: '100vh',
    maxWidth: '100vw',
  },
  navIcon: {
    zIndex: theme.zIndex.appBar - 1,
    position: 'absolute',
  },
  navIconLeft: {
    left: 0,
    marginLeft: theme.spacing(2),
  },
  navIconRight: {
    right: 0,
    marginRight: theme.spacing(2),
  },
});

export default GroupImageStyles;
