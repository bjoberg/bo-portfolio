import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Avatar, Typography, Button,
} from '@material-ui/core';

import IndexStyles from '../styles';
import AppContainer from '../components/AppContainer';
import User from '../models/user';
import SocialButtons from '../containers/Index/SocialButtons/SocialButtons';

const useStyles = makeStyles(IndexStyles);

const Index = (props) => {
  const classes = useStyles();
  const { user } = props;
  const name = 'Brett Oberg';
  const bio = 'Chicago-based landscape photographer, software engineer, and outdoor enthusiast';

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
            backgroundColor: 'white', minHeight: '100vh', paddingLeft: 20, paddingRight: 20, paddingBottom: 20,
          }}
          container
          direction="column"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Avatar
              className={classes.avatar}
              src="/media/profile.jpg"
            />
          </Grid>
          <Grid item xs={12} style={{ maxWidth: 960 }}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Typography
                  variant="h1"
                  align="center"
                  gutterBottom
                >
                  {name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="subtitle2"
                  align="center"
                  gutterBottom
                >
                  {bio}
                </Typography>
              </Grid>
              <Grid item>
                <SocialButtons />
              </Grid>
              <Grid item style={{ margin: 10, marginBottom: 60 }}>
                <Button href="/groups" variant="outlined" margin="">Portfolio</Button>
              </Grid>
              <Grid item>
                <Typography variant="body1" gutterBottom>Heyyooo 👋🏼, thanks for taking the time to visit my photography portfolio. My name is Brett Oberg, and in my spare time I take photos. I am inspired by nature and I use photography as an excuse to experience its beauty. Photography has helped give direction and purpose to my life, and I hope my images inspire you to go out and find what is special for you.</Typography>
                <Typography variant="body1" gutterBottom>Aside from photography, I spend my time developing software (like this website 😜), cycling, golfing, playing tennis, and spening time with family.</Typography>
                <Typography variant="body1" gutterBottom>I hope you enjoy my work and would like to collaborate on a project or chat over coffee ☕️, please email me at brett.oberg8@gmail.com.</Typography>
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
