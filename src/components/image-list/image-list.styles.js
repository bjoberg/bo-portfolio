const ImageListStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(9),
  },
  imageItem: {
    marginLeft: theme.spacing(1),
  },
  progressBarContainer: {
    flexGrow: 1,
  },
});

export default ImageListStyles;
