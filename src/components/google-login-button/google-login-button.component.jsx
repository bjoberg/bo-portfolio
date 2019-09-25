import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

import GoogleLoginButtonStyles from './google-login-button.styles';
import * as GoogleIcon from '../../media/google-sign-in-button.png';

const useStyles = makeStyles(GoogleLoginButtonStyles);

const GoogleLoginButton = () => {
  const classes = useStyles();
  return (
    <Button variant="contained" className={classes.button}>
      <img className={classes.img} alt="google-logo" src={GoogleIcon} />
    </Button>
  );
};

export default GoogleLoginButton;
