import React, {
  Fragment, createRef, useCallback, useState,
} from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';
import httpStatus from 'http-status';
import {
  Typography, Grid, Select, FormControl, InputLabel, MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NextSeo } from 'next-seo';

import AppContainer from '../src/components/AppContainer';
import Routes from '../src/constants/Routes';
import SeoConfig from '../src/models/SeoConfig';
import { ImageGrid } from '../src/components/ImageGrid';
import { ImagesStyles } from '../src/styles';
import { getImages } from '../src/services/image';
import { isAtEnd } from '../src/utils/helpers';
import { SortMappings } from '../src/constants';
import { useInfiniteScroll } from '../src/hooks';

const useStyles = makeStyles(ImagesStyles);
const pageTitle = 'Images';
const pageSubtitle = 'Unfiltered list of all my favorite images.';

const Images = (props) => {
  const classes = useStyles();
  const imageGridRef = createRef();
  const {
    appTitle, appEnv, rootUrl, hasError, sortOptions, defaultSortId, images,
  } = props;
  const {
    totalItems,
    limit,
    page,
    rows,
  } = images;
  const hasMoreData = isAtEnd(totalItems, limit, page + 1);
  const actionBarOptions = {
    title: appTitle,
    elevateOnScroll: true,
    showMenuButton: true,
    routes: Routes,
  };

  // configure seo properties
  const url = `${rootUrl}/images`;
  const seoTitle = `${pageTitle} - ${appTitle}`;
  const noIndex = SeoConfig.isNoIndexNoFollow(appEnv, hasError);
  const noFollow = SeoConfig.isNoIndexNoFollow(appEnv, hasError);
  const seoConfig = new SeoConfig(noIndex, noFollow, seoTitle, pageSubtitle, url);
  seoConfig.pushOpenGraphImage('/media/og/images.jpg', 1200, 675, 'Brett Oberg Images');

  // page state
  const [pageHasError, setPageHasError] = useState(hasError);
  const [isAtEndOfImageList, setIsAtEndOfImageList] = useState(hasMoreData);
  const [currImagePage, setCurrImagePage] = useState(page);
  const [imageItems, setImageItems] = useState(rows);

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

  const handleChange = (e) => {
    const { value } = e.target;
    const sortItem = sortOptions.find(el => el.id === value);
    Router.push(
      { pathname: '/images', query: { sort: sortItem.query } },
      undefined,
      { shallow: true },
    );

    // TODO: Make request for more images
  };

  return (
    <Fragment>
      <NextSeo {...seoConfig.getConfig()} />
      <AppContainer actionBarOptions={actionBarOptions} title={appTitle}>
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
            <Grid container direction="row-reverse">
              <FormControl>
                <InputLabel>Sort</InputLabel>
                <Select
                  onChange={handleChange}
                  label="Sort"
                  defaultValue={defaultSortId}
                >
                  {sortOptions.map(option => (
                    <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
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
  appEnv: PropTypes.string.isRequired,
  appTitle: PropTypes.string.isRequired,
  rootUrl: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  sortOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    query: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  defaultSortId: PropTypes.string.isRequired,
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

// TODO: Make this generic and move it to the utils
const isValidSortQuery = (sortQuery, sortOptions) => {
  let isValid = false;
  sortOptions.forEach((option) => {
    if (option.query === sortQuery) isValid = true;
  });
  return isValid;
};

// TODO: Make this generic and move it to the utils
const getSortQuery = (requestedSortQuery, defaultSortQuery, sortOptions) => {
  let sortQuery = requestedSortQuery;
  if (!sortQuery || !isValidSortQuery(sortQuery, sortOptions)) sortQuery = defaultSortQuery;
  return sortQuery;
};

// TODO: Make this generic and move it to the utils
const getSortIdByQuery = (sortQuery) => {
  let id;
  Object.keys(SortMappings).forEach((key) => {
    if (SortMappings[key].query === sortQuery) ({ id } = SortMappings[key]);
  });
  return id;
};

Images.getInitialProps = async (req) => {
  let hasError = false;
  let images;

  const { publicRuntimeConfig } = getConfig();

  const { captureDateAsc, captureDateDesc } = SortMappings;
  const sortOptions = [captureDateDesc, captureDateAsc];
  const sort = getSortQuery(req.query.sort, SortMappings.captureDateDesc.query, sortOptions);
  const defaultSortId = getSortIdByQuery(sort);

  try {
    images = await getImages(sort);
  } catch (error) {
    hasError = true;
  }

  return {
    appEnv: publicRuntimeConfig.APP_ENV,
    appTitle: publicRuntimeConfig.TITLE,
    rootUrl: publicRuntimeConfig.ROOT_URL,
    hasError,
    images,
    sortOptions,
    defaultSortId,
  };
};

export default Images;
