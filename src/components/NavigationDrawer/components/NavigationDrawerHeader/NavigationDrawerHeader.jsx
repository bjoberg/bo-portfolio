import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Link } from '@material-ui/core';

import NavigationDrawerHeaderStyles from './NavigationDrawerHeader.styles';

const useStyles = makeStyles(NavigationDrawerHeaderStyles);

const NavigationDrawerHeader = (props) => {
  const classes = useStyles();
  const { title, email } = props;

  return (
    <Fragment>
      <div className={classes.root}>
        <Typography variant="h5">
          {title}
        </Typography>
        <Link href={`mailto:${email}`} variant="subtitle2">
          {email}
        </Link>
      </div>
      <Divider />
    </Fragment>
  );
};

NavigationDrawerHeader.propTypes = {
  title: PropTypes.string,
  email: PropTypes.string,
};

NavigationDrawerHeader.defaultProps = {
  title: '',
  email: '',
};

export default NavigationDrawerHeader;
