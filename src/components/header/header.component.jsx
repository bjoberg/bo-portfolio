import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { HeaderDrawer } from '../';
import HeaderStlyes from './header.styles';

const useStyles = makeStyles(HeaderStlyes);

/**
 * Page Header component
 */
const Header = (props) => {
  const classes = useStyles();
  const { title } = props;
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => setDrawerIsOpen(true)} >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <HeaderDrawer 
        isOpen={drawerIsOpen}
        handleClose={() => setDrawerIsOpen(false)}/>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string
};

export default Header;