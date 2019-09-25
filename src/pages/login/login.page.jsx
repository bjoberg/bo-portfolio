import React from 'react';
import { makeStyles } from '@material-ui/core';

import LoginPageStyles from './login.styles';
import GoogleLoginButton from '../../components/google-login-button/google-login-button.component';

const useStyles = makeStyles(LoginPageStyles);

const LoginPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;
