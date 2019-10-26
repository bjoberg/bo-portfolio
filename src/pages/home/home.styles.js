const HomePageStyles = theme => ({
  container: {
    display: 'flex',
  },
  media: {
    display: 'flex',
    overflow: 'hidden',
    maxWidth: '50%',
    maxHeight: 600,
    justifyContent: 'center',
  },
  content: {
    padding: theme.spacing(2),
  },
  img: {
    objectFit: 'cover',
    height: '100%',
  },
});

export default HomePageStyles;
