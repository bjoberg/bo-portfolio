const HomePageStyles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  media: {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    flex: 0.75,
    [theme.breakpoints.down('xl')]: {
      height: 700,
    },
    [theme.breakpoints.down('lg')]: {
      height: 600,
    },
    [theme.breakpoints.down('md')]: {
      height: 500,
    },
    [theme.breakpoints.down('sm')]: {
      height: 400,
    },
    [theme.breakpoints.down('xs')]: {
      flex: 1,
      height: 400,
    },
  },
  content: {
    padding: theme.spacing(2),
    flex: 1,
  },
  img: {
    objectFit: 'cover',
    maxHeight: '100%',
  },
});

export default HomePageStyles;
