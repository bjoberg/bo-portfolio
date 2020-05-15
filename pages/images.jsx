import React, { Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NextSeo } from 'next-seo';

import SEO from '../next-seo.config';
import SeoConfig from '../src/models/SeoConfig';
import AppContainer from '../src/components/AppContainer';
import Routes from '../src/constants/Routes';
import { getImages } from '../src/services/image';
import { ImagesStyles } from '../src/styles';
import { ImageGrid } from '../src/components/ImageGrid';

const { publicRuntimeConfig } = getConfig();
const useStyles = makeStyles(ImagesStyles);

const Images = (props) => {
  const classes = useStyles();
  const imageGridRef = createRef();
  const { hasError, images } = props;
  const pageTitle = 'Images';
  const pageSubtitle = 'Unfiltered list of all my favorite images.';
  const seoTitle = `${pageTitle} - ${SEO.title}`;
  const url = `${publicRuntimeConfig.ROOT_URL}/groups`;
  const seoConfig = new SeoConfig(hasError, hasError, seoTitle, pageSubtitle, url);
  seoConfig.pushOpenGraphImage('/media/og/images.jpg', 1200, 675, 'Brett Oberg Groups');

  const actionBarOptions = {
    title: SEO.title,
    elevateOnScroll: true,
    showAvatar: true,
    showMenuButton: true,
    routes: Routes,
  };

  return (
    <Fragment>
      <NextSeo {...seoConfig.getConfig()} />
      <AppContainer actionBarOptions={actionBarOptions}>
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h1" gutterBottom>{pageTitle}</Typography>
            <Typography variant="subtitle1">{pageSubtitle}</Typography>
          </Grid>
          <Grid item xs={12}>
            <ImageGrid
              domRef={imageGridRef}
              images={images.rows}
              routeBase="/image/"
            />
          </Grid>
        </Grid>
      </AppContainer>
    </Fragment>
  );
};

Images.propTypes = {
  hasError: PropTypes.bool,
  images: PropTypes.shape({
    limit: PropTypes.number,
    page: PropTypes.number,
    totalItems: PropTypes.number,
    pageCount: PropTypes.number,
    rows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      thumbnailUrl: PropTypes.string,
      imageUrl: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    })),
  }).isRequired,
};

Images.defaultProps = {
  hasError: false,
};

Images.getInitialProps = async () => {
  let hasError = false;
  let images;
  try {
    images = await getImages();
  } catch (error) {
    hasError = true;
  }
  return { hasError, images };
};

export default Images;
