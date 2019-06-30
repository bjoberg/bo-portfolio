import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Routes from './routes';
import Header from './components/header/header.component';
import AppStyles from './app.styles';

const useStyles = makeStyles(AppStyles);

function App() {
  const classes = useStyles();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  /**
   * Toggle the state of the drawer
   */
  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <Fragment>
      <Header
        title="Portfolio Manager"
        drawerIsOpen={drawerIsOpen}
        handleToggleDrawer={toggleDrawer}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerIsOpen,
        })}
      >
        <Routes />
      </main>
    </Fragment>
  );
}

export default App;
