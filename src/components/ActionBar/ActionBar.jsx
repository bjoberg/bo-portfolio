import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ProfileMenu from './components/ProfileMenu';
import ElevationScroll from './components/ElevationScroll';
import ActionBarStyles from './ActionBar.styles';
import User from '../../models/User';
import ActionButtons from './components/ActionButtons/ActionButtons';

const useStyles = makeStyles(ActionBarStyles);

const ActionBar = (props) => {
  const classes = useStyles();
  const {
    title,
    routes,
    elevateOnScroll,
    showMenuButton,
    showBackButton,
    showAvatar,
    user,
    handleNav,
    handleBack,
    handleLogout,
    handleLogin,
    actionButtons,
  } = props;

  return (
    <ElevationScroll elevateOnScroll={elevateOnScroll}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {showMenuButton && (
            <Box display={{
              xs: 'block',
              sm: 'none',
            }}
            >
              <IconButton
                className={classes.menuButton}
                edge="start"
                onClick={handleNav}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
          {showBackButton && (
            <IconButton
              className={classes.menuButton}
              edge="start"
              onClick={handleBack}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <div className={classes.titleContainer}>
            <Box display={{
              xs: 'none',
              sm: 'block',
            }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <Typography
                    component="a"
                    href="/"
                    variant="h6"
                    className={classes.title}
                  >
                    {title}
                  </Typography>
                </Grid>
                {routes.map(route => (
                  <Grid item key={route.id}>
                    <Typography
                      component="a"
                      href={`/${route.route}`}
                      className={classes.link}
                    >
                      {route.title}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
          <div className={clsx(showAvatar && classes.actionButtonGroup)}>
            <ActionButtons {...actionButtons} />
          </div>
          {showAvatar && (
            <ProfileMenu user={user} handleLogout={handleLogout} handleLogin={handleLogin} />
          )}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

ActionBar.propTypes = {
  title: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    route: PropTypes.string,
  })),
  elevateOnScroll: PropTypes.bool,
  showAvatar: PropTypes.bool,
  showMenuButton: PropTypes.bool,
  showBackButton: PropTypes.bool,
  user: PropTypes.shape({
    profile: PropTypes.instanceOf(User),
    isFetching: PropTypes.bool,
  }),
  handleBack: PropTypes.func,
  handleNav: PropTypes.func,
  handleLogout: PropTypes.func,
  handleLogin: PropTypes.func,
  actionButtons: PropTypes.shape({
    isDisabled: PropTypes.bool,
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    showDelete: PropTypes.bool,
    showInfo: PropTypes.bool,
    showAddPhoto: PropTypes.bool,
    showSave: PropTypes.bool,
    showAddGroup: PropTypes.bool,
    handleDelete: PropTypes.func,
    handleInfo: PropTypes.func,
    handleAddPhoto: PropTypes.func,
    handleAddGroup: PropTypes.func,
    handleSave: PropTypes.func,
  }),
};

ActionBar.defaultProps = {
  title: '',
  routes: [],
  elevateOnScroll: false,
  showAvatar: false,
  showMenuButton: false,
  showBackButton: false,
  user: undefined,
  handleBack: () => { },
  handleNav: () => { },
  handleLogout: () => { },
  handleLogin: () => { },
  actionButtons: PropTypes.shape({
    isDisabled: false,
    color: 'default',
    showDelete: false,
    showInfo: false,
    showAddPhoto: false,
    showSave: false,
    showAddGroup: false,
    handleDelete: () => { },
    handleInfo: () => { },
    handleAddPhoto: () => { },
    handleAddGroup: () => { },
    handleSave: () => { },
  }),
};

export default ActionBar;
