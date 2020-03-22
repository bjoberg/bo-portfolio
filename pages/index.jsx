import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Avatar } from '@material-ui/core';

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
        <Grid style={{ backgroundColor: 'white', minHeight: '100vh' }} container>
          <Grid item>
            <Avatar style={{ margin: '-20' }} />
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
