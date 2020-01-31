const AddImageDialogStyles = theme => ({
  imgContainer: {
    backgroundColor: theme.palette.grey[100],
    height: theme.image.height.small,
    overflow: 'hidden',
  },
  img: {
    objectFit: 'cover',
    height: '100%',
  },
});

export default AddImageDialogStyles;
