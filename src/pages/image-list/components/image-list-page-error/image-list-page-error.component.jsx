import React, { Fragment } from 'react';
import { Typography, Button } from '@material-ui/core';

const ImageListPageError = () => {
  const reloadPage = () => window.location.reload();

  return (
    <Fragment>
      <Typography variant="h1">Error</Typography>
      <Typography gutterBottom>Unable to retrieve the images</Typography>
      <Button variant="outlined" onClick={() => reloadPage()}>Reload</Button>
    </Fragment>
  );
};

export default ImageListPageError;
