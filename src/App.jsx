import React, { useState, useEffect, useCallback } from 'react';
import { hot } from 'react-hot-loader';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { ThemeProvider } from '@material-ui/styles';
import { ClickAwayListener } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/header/header.component';
import Routes from './routes';
import SnackbarContentWrapper from './components/snackbar-content/snackbar-content.component';
import FullDrawer from './components/full-drawer/full-drawer.component';
import MiniDrawer from './components/mini-drawer/mini-drawer.component';
import AppStyles from './app.styles';
import { theme } from './utils/theme';
import UserService from './services/user.service';
import AuthService from './services/auth.service';
import GoogleUser from './models/google-user.model';
import Roles from './utils/roles';

const useStyles = makeStyles(AppStyles);
const userService = new UserService();

function App() {
  const classes = useStyles();
  const title = 'Brett Oberg';

  const [user, setUser] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState('success');
  const [snackbarContent, setSnackbarContent] = useState('');
  const [snackbarIsOpen, setSnackBarIsOpen] = useState(false);

  const toggleDrawer = () => setDrawerIsOpen(!drawerIsOpen);
  const closeDrawer = () => setDrawerIsOpen(false);
  const closeSnackbar = () => setSnackBarIsOpen(false);
  const logoutGoogle = () => AuthService.logoutGoogle();

  /**
   * Open the snackbar as a notification
   * @param {string} variant of the snackbar to display
   * @param {string} message to display in the snackbar
   */
  const openSnackbar = (variant, message) => {
    setSnackbarStatus(variant);
    setSnackbarContent(message);
    setSnackBarIsOpen(true);
  };

  /**
   * Attemp to retrieve and set the user's data
   */
  const setUserData = useCallback(async () => {
    try {
      const userInfo = await userService.getUserInfo();
      const roleInfo = await userService.getUserRole(userInfo.sub);
      const googleUser = new GoogleUser({ ...userInfo, ...roleInfo });
      setUser(googleUser.toJson());
    } catch (error) {
      setUser(undefined);
    }
  }, []);

  /**
   * Get the user's information when the application loads
   */
  useEffect(() => { setUserData(); }, [setUserData]);

  useEffect(() => {
    if (user === undefined || user === null) return;
    if (user.role === Roles.ADMIN) setIsEditable(true);
    else setIsEditable(false);
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClickAwayListener onClickAway={closeDrawer}>
        {/* This div is needed because the ClickAwayListener needs a ref to bind to */}
        <div>
          <Header
            title={title}
            drawerIsOpen={drawerIsOpen}
            handleToggle={toggleDrawer}
            user={user}
            handleLogout={logoutGoogle}
          />
          <FullDrawer isOpen={drawerIsOpen} handleClose={closeDrawer} />
          <MiniDrawer />
        </div>
      </ClickAwayListener>
      <div className={classes.toolbar} />
      <main className={classes.container}>
        <Routes openSnackbar={openSnackbar} isEditable={isEditable} />
      </main>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarIsOpen}
      >
        <SnackbarContentWrapper
          className={classes.snackbarMargin}
          onClose={closeSnackbar}
          variant={snackbarStatus}
          message={snackbarContent}
        />
      </Snackbar>
    </ThemeProvider>
  );
}

// eslint-disable-next-line
let hotApp = App;

if (process.env.NODE_ENV === 'development') {
  hotApp = hot(module)(App);
}

export default hotApp;
