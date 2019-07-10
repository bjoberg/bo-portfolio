import React, { div } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';
import ErrorStyles from './error.styles';

const useStyles = makeStyles(ErrorStyles);

const ErrorPage = (props) => {
  const { title, body } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h1">
        {title}
      </Typography>
      <Typography variant="h3">
        {body}
      </Typography>
    </div>
  );
};

ErrorPage.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

ErrorPage.defaultProps = {
  title: 'Error',
  body: 'This page does not exist',
};

export default ErrorPage;
