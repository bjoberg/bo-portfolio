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
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ElevationScroll from './components/ElevationScroll';
import ActionBarStyles from './ActionBar.styles';

const useStyles = makeStyles(ActionBarStyles);

const ActionBar = (props) => {
  const classes = useStyles();
  const {
    title,
    routes,
    elevateOnScroll,
    showMenuButton,
    showBackButton,
    handleNav,
    handleBack,
  } = props;

  return (
    <ElevationScroll elevateOnScroll={elevateOnScroll}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {showMenuButton && (
            <Box display={{ xs: 'block', sm: 'none' }}>
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
          <Grid container className="titleContainer" spacing={3} alignItems="center">
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
            <Grid item>
              <Box display={{ xs: 'none', sm: 'block' }}>
                <Grid container spacing={3} alignItems="center">
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
            </Grid>
          </Grid>
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
  showMenuButton: PropTypes.bool,
  showBackButton: PropTypes.bool,
  handleBack: PropTypes.func,
  handleNav: PropTypes.func,
};

ActionBar.defaultProps = {
  title: '',
  routes: [],
  elevateOnScroll: false,
  showMenuButton: false,
  showBackButton: false,
  handleBack: () => { },
  handleNav: () => { },
};

export default ActionBar;
