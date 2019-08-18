const FullDrawerListItemStyles = theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
  },
  linkIsActive: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
  },
  listItem: {
    backgroundColor: 'inherit',
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  listIcon: {
    color: 'inherit',
  },
});

export default FullDrawerListItemStyles;
