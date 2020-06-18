import React, {
  createRef, Fragment, useState, useCallback,
} from 'react';
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
import { isAtEnd, goBack } from '../../../src/utils/helpers';
import { useInfiniteScroll } from '../../../src/hooks';

const useStyles = makeStyles(GroupStyles);

const Group = (props) => {
  const classes = useStyles();
  const imageGridRef = createRef();
  const {
    appTitle, appEnv, rootUrl, group, hasError, images,
  } = props;
  const {
    id, title, description, thumbnailUrl,
  } = group;
  const {
    totalItems,
    limit,
    page,
    rows,
  } = images;
  const hasMoreData = isAtEnd(totalItems, limit, page + 1);

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

  const actionBarOptions = {
    elevateOnScroll: true,
    showBackButton: true,
    handleBack: () => goBack('/groups'),
  };

  /**
   * Request next page of images
   * @param {Function} isFetching set the status of the fetching state
   */
  const handlePaginateImages = useCallback((isFetching) => {
    const paginateImages = async () => {
      const next = currImagePage + 1;
      const result = await fetch(`/api/group/${id}/images?limit=${limit}&page=${next}`);
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
  }, [currImagePage, id, limit]);

  const [isLoadingImages] = useInfiniteScroll(
    handlePaginateImages,
    isAtEndOfImageList,
    pageHasError,
    imageGridRef,
  );

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
  const { publicRuntimeConfig } = getConfig();
  const { groupId } = query;
  let hasError = false;
  let group;
  let images;
  try {
    group = await getGroup(groupId);
    images = await getGroupImages(groupId);
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
  };
};

export default Group;
