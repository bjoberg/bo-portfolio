import React, {
  Fragment, createRef, useCallback, useState,
} from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';
import httpStatus from 'http-status';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NextSeo } from 'next-seo';

import AppContainer from '../src/components/AppContainer';
import Routes from '../src/constants/Routes';
import SeoConfig from '../src/models/SeoConfig';
import { ImageGrid } from '../src/components/ImageGrid';
import { ImagesStyles } from '../src/styles';
import { getImages } from '../src/services/image';
import { SortController, isAtEnd, getQueryString } from '../src/utils/helpers';
import { SortMappings } from '../src/constants';
import { useInfiniteScroll } from '../src/hooks';
import { SortSelect } from '../src/components/SortSelect';

const useStyles = makeStyles(ImagesStyles);
const pageTitle = 'Images';
const pageSubtitle = 'Unfiltered list of all my favorite images.';

/**
 * Fetch a list of images.
 *
 * @param {string} sortQuery sort field and direction of request
 * @param {number} limitQuery limit number of pagination request
 * @param {number} pageQuery offset number of pagination request
 */
const fetchImages = async (sortQuery, limitQuery, pageQuery) => {
  const queryDict = { sort: sortQuery, page: pageQuery, limit: limitQuery };
  const route = `/api/images?${getQueryString(queryDict)}`;
  const res = await fetch(route);
  return res;
};

const Images = (props) => {
  const classes = useStyles();
  const imageGridRef = createRef();
  const {
    appTitle,
    appEnv,
    rootUrl,
    hasError,
    sortOptions,
    defaultSort,
    images,
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
  const [sortQuery, setSortQuery] = useState(defaultSort.query);

  const handlePaginateImages = useCallback((isFetching) => {
    const paginateImages = async () => {
      const next = currImagePage + 1;
      const result = await fetchImages(sortQuery, limit, next);
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
  }, [currImagePage, limit, sortQuery]);

  const [isLoadingImages] = useInfiniteScroll(
    handlePaginateImages,
    isAtEndOfImageList,
    pageHasError,
    imageGridRef,
  );

  /**
   * Update the UI based on sort select change.
   *
   * @param {Event} e Event that triggered the change
   */
  const handleSortSelectChange = async (e) => {
    const { value } = e.target;
    const sortObj = SortController.getSortById(value);
    setSortQuery(sortObj.query);

    // Update the url
    Router.push(
      { pathname: '/images', query: { sort: sortObj.query } },
      undefined,
      { shallow: true },
    );

    // Request new data
    const res = await fetchImages(sortObj.query, limit, 0);
    if (res.status === httpStatus.OK) {
      const json = await res.json();
      setImageItems(json.rows);
      setIsAtEndOfImageList(isAtEnd(json.totalItems, json.limit, 0));
      setCurrImagePage(0);
    } else {
      setPageHasError(true);
    }
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
          <Grid item xs={12} className={classes.filters}>
            <Grid container direction="row-reverse">
              <Grid item>
                <SortSelect
                  handleChange={handleSortSelectChange}
                  sortOptions={sortOptions}
                  defaultSort={defaultSort}
                />
              </Grid>
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
  defaultSort: PropTypes.shape({
    id: PropTypes.string,
    query: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
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

Images.getInitialProps = async (req) => {
  let hasError = false;
  let images = null;
  const { publicRuntimeConfig } = getConfig();
  const sortOptions = [
    SortMappings.captureDateDesc,
    SortMappings.captureDateAsc,
    SortMappings.createdAtDesc,
    SortMappings.createdAtAsc,
  ];
  const fallBackSortQuery = SortMappings.captureDateDesc.query;
  const sortQuery = SortController.getSortQuery(req.query.sort, fallBackSortQuery, sortOptions);

  try {
    images = await getImages(sortQuery);
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
    defaultSort: SortController.getSortByQuery(sortQuery),
  };
};

export default Images;
