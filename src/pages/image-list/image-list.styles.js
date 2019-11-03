const ImageListPageStyles = theme => ({
  linearProgressContainer: {
    flex: 1,
  },
  circularProgressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  imageList: {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export default ImageListPageStyles;
