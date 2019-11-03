const ImageGridStyles = theme => ({
  root: {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
  },
  circularProgressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export default ImageGridStyles;
