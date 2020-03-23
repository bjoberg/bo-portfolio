import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Avatar, Typography,
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
            <Avatar style={{ width: 150, height: 150, transform: 'translateY(-50%)' }} />
          </Grid>
          <Grid item xs={12}>
            <Typography>Brett Oberg</Typography>
            <Typography>Subtitle</Typography>
          </Grid>
          <Grid item xs={12} style={{ marginLeft: 100, marginRight: 100 }}>
            <Typography>Heyyooo 👋🏼, thanks for taking the time to visit my photography portfolio. My name is Brett Oberg, and in my spare time I take photos. I am inspired by nature and I use photography as an excuse to experience its beauty. Photography has helped give direction and purpose to my life, and I hope my images inspire you to go out and find what is special for you.</Typography>
            <Typography>Aside from photography, I spend my time developing software (like this website 😜), cycling, golfing, playing tennis, and spening time with family.</Typography>
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
