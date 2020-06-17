import React, {
  Fragment, createRef, useCallback, useState,
} from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';
import httpStatus from 'http-status';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NextSeo } from 'next-seo';

import SeoConfig from '../src/models/SeoConfig';
import AppContainer from '../src/components/AppContainer';
import Routes from '../src/constants/Routes';
import { getImages } from '../src/services/image';
import { ImagesStyles } from '../src/styles';
import { ImageGrid } from '../src/components/ImageGrid';
import { isAtEnd } from '../src/utils/helpers';
import { useInfiniteScroll } from '../src/hooks';

const { publicRuntimeConfig } = getConfig();
const useStyles = makeStyles(ImagesStyles);

const Images = (props) => {
  const classes = useStyles();
  const imageGridRef = createRef();
  const { hasError, images } = props;
  const {
    totalItems,
    limit,
    page,
    rows,
  } = images;
  const pageTitle = 'Images';
  const pageSubtitle = 'Unfiltered list of all my favorite images.';
  const seoTitle = `${pageTitle} - ${publicRuntimeConfig.TITLE}`;
  const url = `${publicRuntimeConfig.ROOT_URL}/images`;
  const seoConfig = new SeoConfig(hasError, hasError, seoTitle, pageSubtitle, url);
  seoConfig.pushOpenGraphImage('/media/og/images.jpg', 1200, 675, 'Brett Oberg Images');
  const hasMoreData = isAtEnd(totalItems, limit, page + 1);

  const [pageHasError, setPageHasError] = useState(hasError);
  const [isAtEndOfImageList, setIsAtEndOfImageList] = useState(hasMoreData);
  const [currImagePage, setCurrImagePage] = useState(page);
  const [imageItems, setImageItems] = useState(rows);

  const actionBarOptions = {
    title: publicRuntimeConfig.TITLE,
    elevateOnScroll: true,
    showMenuButton: true,
    routes: Routes,
  };

  const handlePaginateImages = useCallback((isFetching) => {
    const paginateImages = async () => {
      const next = currImagePage + 1;
      const result = await fetch(`/api/images?limit=${limit}&page=${next}`);
      if (result.status === httpStatus.OK) {
        const json = await result.json();
        setImageItems(prevState => [...prevState, ...json.rows]);
        setIsAtEndOfImageList(isAtEnd(json.totalItems, json.limit, next + 1));
        isFetching(false);
        setCurrImagePage(next);
      } else {
        setPageHasError(true);
        isFetching(false);
      }
    };
    paginateImages();
  }, [currImagePage, limit]);

  const [isLoadingImages] = useInfiniteScroll(
    handlePaginateImages,
    isAtEndOfImageList,
    pageHasError,
    imageGridRef,
  );

  return (
    <Fragment>
      <NextSeo {...seoConfig.getConfig()} />
      <AppContainer actionBarOptions={actionBarOptions}>
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h1">{pageTitle}</Typography>
            <Typography variant="subtitle2">
              {`${totalItems} images`}
            </Typography>
            <div className={classes.subheader}>
              <Typography>{pageSubtitle}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <ImageGrid
              domRef={imageGridRef}
              images={imageItems}
              isLoading={isLoadingImages}
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
