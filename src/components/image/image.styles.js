const ImageStyles = theme => ({
  thumbnail: {
    height: 250,
    overflow: 'hidden',
    display: 'block',
    position: 'relative',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest,
    }),
    [theme.breakpoints.down('sm')]: {
      height: 175,
    },
  },
  img: {
    objectFit: 'cover',
    height: '100%',
  },
});

export default ImageStyles;
