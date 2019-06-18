const ImageFormStyles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: '0px 20px 0px 20px'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '0px 20px 0px 20px'
  },
  details: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '0px 20px 0px 20px'
  },
  photo: {
    margin: "20px 0px 20px 0px",
    maxWidth: "600px !important",
    maxHeight: "400px !important",
    alignSelf: "center"
  },
  inputButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    margin: theme.spacing(1),
  },
});

export { ImageFormStyles };