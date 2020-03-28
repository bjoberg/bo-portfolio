import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Grid, Avatar, Typography, Button,
} from '@material-ui/core';
import getConfig from 'next/config';
import { NextSeo } from 'next-seo';

import SEO from '../next-seo.config';
import { IndexStyles } from '../src/styles';
import AppContainer from '../src/components/AppContainer';
import { User } from '../src/models';
import { PersonalData } from '../src/constants';
import { SocialButtons, BodyContent } from '../src/containers/Index';

const { publicRuntimeConfig } = getConfig();
const useStyles = makeStyles(IndexStyles);
const seoTitle = SEO.title;
const url = `${publicRuntimeConfig.ROOT_URL}`;

const Index = (props) => {
  const classes = useStyles();
  const { user } = props;
  const {
    firstName, lastName, bio, avatar,
  } = PersonalData;
  const fullName = `${firstName} ${lastName}`;

  const actionBarOptions = {
    elevateOnScroll: true,
    showAvatar: true,
    showAddPhoto: user.isAdmin,
    showAddGroup: user.isAdmin,
  };

  return (
    <Fragment>
      <NextSeo
        title={seoTitle}
        openGraph={{
          url,
          title: seoTitle,
          description: `About Brett Oberg - ${bio}`,
          images: [
            {
              url: '',
              width: 800,
              height: 600,
              alt: '',
            },
          ],
        }}
      />
      <AppContainer user={user} actionBarOptions={actionBarOptions}>
        <div className={classes.background}>
          <div className={classes.placeholder} />
          <Grid
            container
            className={classes.root}
            direction="column"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Avatar
                className={classes.avatar}
                src={avatar}
              />
            </Grid>
            <Grid item xs={12} className={classes.contentContainer}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography
                    variant="h1"
                    align="center"
                    gutterBottom
                  >
                    {fullName}
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
                <Grid item className={classes.actionButton}>
                  <Button href="/groups" variant="outlined">Portfolio</Button>
                </Grid>
                <Grid item>
                  <BodyContent />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </AppContainer>
    </Fragment>
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
