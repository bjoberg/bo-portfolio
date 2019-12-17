import React, {
  useState, useEffect, useCallback, Fragment,
} from 'react';
import { hot } from 'react-hot-loader';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';

import Routes from './routes';
import SnackbarContentWrapper from './components/snackbar-content/snackbar-content.component';
import AppStyles from './app.styles';
import UserService from './services/user.service';
import AuthService from './services/auth.service';
import GoogleUser from './models/google-user.model';
import Roles from './utils/roles';
import NavContainer from './components/nav-container';

const useStyles = makeStyles(AppStyles);
const userService = new UserService();

const App = () => {
  const classes = useStyles();
  const title = 'Brett Oberg';

  const [user, setUser] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [displayNavContainer, setDisplayNavContainer] = useState(false);
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
    <Fragment>
      {displayNavContainer && (
        <NavContainer
          closeDrawer={closeDrawer}
          title={title}
          drawerIsOpen={drawerIsOpen}
          toggleDrawer={toggleDrawer}
          user={user}
          handleLogout={logoutGoogle}
        />
      )}
      <main className={clsx(displayNavContainer ? classes.navContainer : classes.container)}>
        <Routes
          openSnackbar={openSnackbar}
          displayNavContainer={setDisplayNavContainer}
          isEditable={isEditable}
        />
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
    </Fragment>
  );
};

// eslint-disable-next-line
let hotApp = App;

if (process.env.NODE_ENV === 'development') {
  hotApp = hot(module)(App);
}

export default hotApp;
