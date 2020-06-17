const IndexStyles = theme => ({
  background: {
    backgroundImage: "url('/media/about/background.jpg')",
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
  actionButton: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(6),
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
