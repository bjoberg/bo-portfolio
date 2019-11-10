import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';

const ErrorPage = (props) => {
  const { title, details } = props;

  const reloadPage = () => window.location.reload();

  return (
    <Fragment>
      <Typography variant="h1">{title}</Typography>
      <Typography gutterBottom>{details}</Typography>
      <Button variant="outlined" onClick={() => reloadPage()}>Reload</Button>
    </Fragment>
  );
};

ErrorPage.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
};

ErrorPage.defaultProps = {
  title: 'Error',
  details: 'This page does not exist',
};

export default ErrorPage;
