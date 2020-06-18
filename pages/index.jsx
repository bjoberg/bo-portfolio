import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import {
  makeStyles, Grid, Avatar, Typography, Button,
} from '@material-ui/core';
import { NextSeo } from 'next-seo';

import AppContainer from '../src/components/AppContainer';
import Routes from '../src/constants/Routes';
import SeoConfig from '../src/models/SeoConfig';
import { IndexStyles } from '../src/styles';
import { PersonalData } from '../src/constants';
import { SocialButtons, BodyContent } from '../src/containers/Index';

const useStyles = makeStyles(IndexStyles);

const Index = (props) => {
  const classes = useStyles();
  const { appTitle, appEnv, rootUrl } = props;
  const {
    firstName,
    lastName,
    bio,
    avatar,
  } = PersonalData;
  const fullName = `${firstName} ${lastName}`;

  // configure seo properties
  const url = rootUrl;
  const seoTitle = appTitle;
  const noIndex = SeoConfig.isNoIndexNoFollow(appEnv);
  const noFollow = SeoConfig.isNoIndexNoFollow(appEnv);
  const seoConfig = new SeoConfig(noIndex, noFollow, seoTitle, bio, url);
  seoConfig.pushOpenGraphImage('/media/og/about.jpg', 1200, 900, 'About Brett Oberg');

  const actionBarOptions = {
    title: appTitle,
    elevateOnScroll: true,
    showAvatar: true,
    showMenuButton: true,
    routes: Routes,
  };

  return (
    <Fragment>
      <NextSeo {...seoConfig.getConfig()} />
      <AppContainer actionBarOptions={actionBarOptions} title={appTitle}>
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
                    variant="subtitle1"
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
                  <Button href="/groups" variant="outlined" size="large" color="primary">Portfolio</Button>
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
  appEnv: PropTypes.string.isRequired,
  appTitle: PropTypes.string.isRequired,
  rootUrl: PropTypes.string.isRequired,
};

Index.getInitialProps = () => {
  const { publicRuntimeConfig } = getConfig();
  return {
    appEnv: publicRuntimeConfig.APP_ENV,
    appTitle: publicRuntimeConfig.TITLE,
    rootUrl: publicRuntimeConfig.ROOT_URL,
  };
};

export default Index;
