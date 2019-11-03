const ImageStyles = theme => ({
  imgContainer: {
    height: 250,
    maxWidth: 600,
    margin: theme.spacing(0.5),
    overflow: 'hidden',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest,
    }),
    [theme.breakpoints.down('sm')]: {
      height: 175,
      maxWidth: 400,
    },
  },
  img: {
    objectFit: 'cover',
    height: '100%',
  },
});

export default ImageStyles;
