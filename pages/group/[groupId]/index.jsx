import React, {
  createRef, Fragment, useState, useCallback,
} from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';
import httpStatus from 'http-status';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NextSeo } from 'next-seo';

import AppContainer from '../../../src/components/AppContainer';
import SeoConfig from '../../../src/models/SeoConfig';
import { ImageGrid } from '../../../src/components/ImageGrid';
import { GroupStyles } from '../../../src/styles';
import { getGroup, getGroupImages } from '../../../src/services/group';
import {
  isAtEnd, goBack, getQueryString, SortController,
} from '../../../src/utils/helpers';
import { useInfiniteScroll } from '../../../src/hooks';
import { SortSelect } from '../../../src/components/SortSelect';
import { SortMappings } from '../../../src/constants';

const useStyles = makeStyles(GroupStyles);

/**
 * Fetch a list of images in a group.
 *
 * @param {string} groupId id of the group to fetch image for
 * @param {string} sortQuery sort field and direction of request
 * @param {number} limitQuery limit number of pagination request
 * @param {number} pageQuery limit number of pagination request
 */
const fetchGroupImages = async (groupId, sortQuery, limitQuery, pageQuery) => {
  const queryDict = { sort: sortQuery, page: pageQuery, limit: limitQuery };
  const route = `/api/group/${groupId}/images?${getQueryString(queryDict)}`;
  const res = await fetch(route);
  return res;
};

const Group = (props) => {
  const classes = useStyles();
  const imageGridRef = createRef();
  const {
    appTitle,
    appEnv,
    rootUrl,
    group,
    hasError,
    sortOptions,
    defaultSort,
    images,
  } = props;
  const {
    id,
    title,
    description,
    thumbnailUrl,
  } = group;
  const {
    totalItems,
    limit,
    page,
    rows,
  } = images;

  const hasMoreData = isAtEnd(totalItems, limit, page + 1);
  const actionBarOptions = {
    elevateOnScroll: true,
    showBackButton: true,
    handleBack: () => goBack('/groups'),
  };

  // configure seo properties
  const url = `${rootUrl}/group/${id}`;
  const seoTitle = `${title} - ${appTitle}`;
  const noIndex = SeoConfig.isNoIndexNoFollow(appEnv, hasError);
  const noFollow = SeoConfig.isNoIndexNoFollow(appEnv, hasError);
  const seoConfig = new SeoConfig(noIndex, noFollow, seoTitle, description, url);
  seoConfig.pushOpenGraphImage(thumbnailUrl, undefined, undefined, `Brett Oberg ${title}`);

  // page state
  const [pageHasError, setPageHasError] = useState(hasError);
  const [isAtEndOfImageList, setIsAtEndOfImageList] = useState(hasMoreData);
  const [currImagePage, setCurrImagePage] = useState(images.page);
  const [imageItems, setImageItems] = useState(rows);
  const [sortQuery, setSortQuery] = useState(defaultSort.query);

  /**
   * Request next page of images.
   *
   * @param {Function} isFetching set the status of the fetching state
   */
  const handlePaginateImages = useCallback((isFetching) => {
    const paginateImages = async () => {
      const next = currImagePage + 1;
      const result = await fetchGroupImages(id, sortQuery, limit, next);
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
  }, [currImagePage, id, limit, sortQuery]);

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

    // update the url
    const href = '/group/[groupId]';
    const as = `/group/${id}?${sortObj.query}`;
    const options = { shallow: true };
    Router.replace(href, as, options);

    // Request new data
    const res = await fetchGroupImages(id, sortObj.query, limit, 0);
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
            <Typography variant="h1">{title}</Typography>
            <Typography variant="subtitle2">
              {`${totalItems} images`}
            </Typography>
            <div className={classes.subheader}>
              <Typography>{description}</Typography>
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

Group.propTypes = {
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
  group: PropTypes.shape({
    id: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
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
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    })),
  }).isRequired,
};

Group.defaultProps = {
  hasError: false,
};

Group.getInitialProps = async ({ query }) => {
  let hasError = false;
  let group = null;
  let images = null;
  const { publicRuntimeConfig } = getConfig();
  const { groupId } = query;
  const sortOptions = [
    SortMappings.captureDateDesc,
    SortMappings.captureDateAsc,
    SortMappings.createdAtDesc,
    SortMappings.createdAtAsc,
  ];
  const fallBackSortQuery = SortMappings.captureDateDesc.query;
  const sortQuery = SortController.getSortQuery(query.sort, fallBackSortQuery, sortOptions);

  try {
    group = await getGroup(groupId);
    images = await getGroupImages(groupId, sortQuery);
  } catch (error) {
    hasError = true;
  }
  return {
    appEnv: publicRuntimeConfig.APP_ENV,
    appTitle: publicRuntimeConfig.TITLE,
    rootUrl: publicRuntimeConfig.ROOT_URL,
    hasError,
    group,
    images,
    sortOptions,
    defaultSort: SortController.getSortByQuery(sortQuery),
  };
};

export default Group;
