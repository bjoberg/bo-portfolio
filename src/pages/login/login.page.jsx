import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

import LoginPageStyles from './login.styles';
import GoogleLoginButton from '../../components/google-login-button/google-login-button.component';
import AuthService from '../../services/auth.service';

const useStyles = makeStyles(LoginPageStyles);

const LoginPage = (props) => {
  const classes = useStyles();
  const { openSnackbar } = props;

  const loginButtonOnClick = async () => {
    try {
      AuthService.loginGoogle();
    } catch (error) {
      openSnackbar('error', error.message);
    }
  };

  return (
    <div className={classes.container}>
      <GoogleLoginButton handleOnClick={loginButtonOnClick} />
    </div>
  );
};

LoginPage.propTypes = {
  openSnackbar: PropTypes.func,
};

LoginPage.defaultProps = {
  openSnackbar: () => {},
};

export default LoginPage;
