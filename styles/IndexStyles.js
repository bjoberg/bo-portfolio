const IndexStyles = theme => ({
  background: {
    backgroundImage: "url('../static/media/20190912-Acadia-263.jpg')",
    minHeight: '100vh',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  avatar: {
    width: 150,
    height: 150,
    transform: 'translateY(-50%)',
    marginBottom: '-30%',
    border: '1px solid white',
    boxShadow: theme.shadows[2],
  },
});

export default IndexStyles;
