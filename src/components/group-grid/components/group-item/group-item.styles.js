const GroupItemStyles = theme => ({
  imgContainer: {
    maxHeight: 400,
    minHeight: 300,
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[200],
    display: 'block',
    position: 'relative',
  },
  textContainer: {
    paddingTop: theme.spacing(1),
  },
  img: {
    position: 'absolute',
    objectFit: 'cover',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export default GroupItemStyles;
