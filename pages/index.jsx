import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Avatar, Typography, Button,
} from '@material-ui/core';

import IndexStyles from '../styles';
import AppContainer from '../components/AppContainer';
import User from '../models/user';

const useStyles = makeStyles(IndexStyles);

const Index = (props) => {
  const classes = useStyles();
  const { user } = props;

  const actionBarOptions = {
    elevateOnScroll: true,
    showAvatar: true,
    showAddPhoto: user.isAdmin,
    showAddGroup: user.isAdmin,
  };

  return (
    <AppContainer user={user} actionBarOptions={actionBarOptions}>
      <div className={classes.background}>
        <div style={{ height: 300 }} />
        <Grid
          style={{
            backgroundColor: 'white', minHeight: '100vh',
          }}
          container
          direction="column"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Avatar
              className={classes.avatar}
              src="../static/media/profile.jpg"
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Typography variant="h1" align="center" gutterBottom>Brett Oberg</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" align="center">Chicago-based landscape photographer, software engineer, and outdoor enthusiast</Typography>
              </Grid>
              <Grid>
                <Typography align="center">Instagram Github LinkedIn</Typography>
              </Grid>
              <Grid item style={{ margin: 40 }}>
                <Button variant="outlined" color="primary">Portfolio</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </div>
    </AppContainer>
  );
};

Index.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.instanceOf(User),
    isFetching: PropTypes.bool,
    isAdmin: PropTypes.bool,
  }),
};

Index.defaultProps = {
  user: undefined,
};


export default Index;
