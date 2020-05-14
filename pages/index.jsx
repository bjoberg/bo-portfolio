import React, { Fragment } from 'react';
import {
  makeStyles, Grid, Avatar, Typography, Button,
} from '@material-ui/core';
import getConfig from 'next/config';
import { NextSeo } from 'next-seo';

import SEO from '../next-seo.config';
import AppContainer from '../src/components/AppContainer';
import Routes from '../src/constants/Routes';
import { IndexStyles } from '../src/styles';
import { PersonalData } from '../src/constants';
import { SocialButtons, BodyContent } from '../src/containers/Index';

const { publicRuntimeConfig } = getConfig();
const useStyles = makeStyles(IndexStyles);
const seoTitle = SEO.title;
const url = `${publicRuntimeConfig.ROOT_URL}`;

const Index = () => {
  const classes = useStyles();
  const {
    firstName,
    lastName,
    bio,
    avatar,
  } = PersonalData;
  const fullName = `${firstName} ${lastName}`;

  const actionBarOptions = {
    title: SEO.title,
    elevateOnScroll: true,
    showAvatar: true,
    showMenuButton: true,
    routes: Routes,
  };

  return (
    <Fragment>
      <NextSeo
        title={seoTitle}
        openGraph={{
          url,
          title: seoTitle,
          description: bio,
          images: [
            {
              url: '/media/og/about.jpg',
              width: 1200,
              height: 900,
              alt: 'About Brett Oberg',
            },
          ],
        }}
      />
      <AppContainer actionBarOptions={actionBarOptions}>
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
                  <Button href="/groups" variant="outlined" color="primary">Portfolio</Button>
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

export default Index;
