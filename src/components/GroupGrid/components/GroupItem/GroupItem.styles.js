const GroupItemStyles = theme => ({
  root: {
    height: theme.image.height.large * 1.75,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[100],
    overflow: 'hidden',
    position: 'relative',
    boxShadow: theme.shadows[4],
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
    backgroundColor: theme.palette.common.black,
    overflow: 'hidden',
  },
  imgContainer: {
    display: 'block',
    borderRadius: theme.shape.borderRadius,
  },
  img: {
    position: 'absolute',
    objectFit: 'cover',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  linkContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
  actionBar: {
    position: 'absolute',
    right: 0,
    color: theme.palette.common.white,
    zIndex: theme.zIndex.appBar - 1,
  },
});

export default GroupItemStyles;
