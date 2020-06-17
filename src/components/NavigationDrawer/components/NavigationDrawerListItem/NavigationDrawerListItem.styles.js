const NavigationDrawerListItemStyles = theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
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

export default NavigationDrawerListItemStyles;
