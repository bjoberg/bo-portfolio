import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/header/header.component';
import Routes from './routes';
import SnackbarContentWrapper from './components/snackbar-content/snackbar-content.component';
import AppStyles from './app.styles';
import { theme } from './utils/styles/theme';

const useStyles = makeStyles(AppStyles);

function App() {
  const classes = useStyles();
  const [title, setTitle] = useState('Brett Oberg');
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState('success');
  const [snackbarContent, setSnackbarContent] = useState('');
  const [snackbarIsOpen, setSnackBarIsOpen] = useState(false);

  /**
   * Toggle the state of the drawer
   */
  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        title={title}
        drawerIsOpen={drawerIsOpen}
        handleToggleDrawer={toggleDrawer}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerIsOpen,
        })}
      >
        <Routes
          openSnackbar={openSnackbar}
          setTitle={val => setTitle(val)}
        />
      </main>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarIsOpen}
      >
        <SnackbarContentWrapper
          className={classes.snackbarMargin}
          onClose={() => setSnackBarIsOpen(false)}
          variant={snackbarStatus}
          message={snackbarContent}
        />
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
