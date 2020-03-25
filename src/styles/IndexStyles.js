const IndexStyles = theme => ({
  background: {
    backgroundImage: "url('/media/20190912-Acadia-263.jpg')",
    minHeight: '100vh',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  placeholder: {
    height: 300,
  },
  root: {
    backgroundColor: theme.palette.common.white,
    minHeight: '100vh',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  contentContainer: {
    maxWidth: theme.breakpoints.values.md,
  },
  avatar: {
    width: 150,
    height: 150,
    transform: 'translateY(-50%)',
    marginBottom: '-30%',
    border: '1px solid white',
    boxShadow: theme.shadows[2],
  },
});

export default IndexStyles;
