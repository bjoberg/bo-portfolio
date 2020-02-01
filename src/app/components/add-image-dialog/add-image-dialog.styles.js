const AddImageDialogStyles = theme => ({
  imgContainer: {
    height: theme.image.height.small,
    maxWidth: theme.image.height.small * 2,
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  img: {
    objectFit: 'cover',
    height: '100%',
  },
});

export default AddImageDialogStyles;
