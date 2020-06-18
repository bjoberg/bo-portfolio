import React, {
  createRef, Fragment, useCallback, useState,
} from 'react';
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
import { GroupGrid } from '../src/components/GroupGrid';
import { GroupsStyles } from '../src/styles';
import { isAtEnd } from '../src/utils/helpers';
import { useInfiniteScroll } from '../src/hooks';

const useStyles = makeStyles(GroupsStyles);
const pageTitle = 'Groups';
const pageSubtitle = 'Collections of different images curated to display my best work, favorite moments, and photographic style.';

const Groups = (props) => {
  const classes = useStyles();
  const groupGridRef = createRef();
  const {
    appTitle, appEnv, rootUrl, groups,
  } = props;
  const {
    totalItems,
    limit,
    page,
    hasError,
    rows,
  } = groups;
  const hasMoreData = isAtEnd(totalItems, limit, page + 1);

  // configure seo properties
  const url = `${rootUrl}/groups`;
  const seoTitle = `${pageTitle} - ${appTitle}`;
  const noIndex = SeoConfig.isNoIndexNoFollow(appEnv, hasError);
  const noFollow = SeoConfig.isNoIndexNoFollow(appEnv, hasError);
  const seoConfig = new SeoConfig(noIndex, noFollow, seoTitle, pageSubtitle, url);
  seoConfig.pushOpenGraphImage('/media/og/groups.jpg', 1200, 675, 'Brett Oberg Groups');

  // page state
  const [pageHasError, setPageHasError] = useState(hasError);
  const [isAtEndOfGroupList, setIsAtEndOfGroupList] = useState(hasMoreData);
  const [currGroupPage, setCurrGroupPage] = useState(page);
  const [groupItems, setGroupItems] = useState(rows);

  const actionBarOptions = {
    title: appTitle,
    elevateOnScroll: true,
    showMenuButton: true,
    routes: Routes,
  };

  /**
   * Request next page of groups
   * @param {Function} isFetching set the status of the fetching state
   */
  const paginateGroupList = useCallback((isFetching) => {
    const paginateGroups = async () => {
      const next = currGroupPage + 1;
      const result = await fetch(`/api/groups?limit=${limit}&page=${next}`);
      if (result.status === httpStatus.OK) {
        const json = await result.json();
        setGroupItems(prevState => [...prevState, ...json.rows]);
        setIsAtEndOfGroupList(isAtEnd(json.totalItems, json.limit, next + 1));
        isFetching(false);
        setCurrGroupPage(next);
      } else {
        setPageHasError(true);
        isFetching(false);
      }
    };
    paginateGroups();
  }, [currGroupPage, limit]);

  const [isLoadingGroups] = useInfiniteScroll(
    paginateGroupList,
    isAtEndOfGroupList,
    pageHasError,
    groupGridRef,
  );

  return (
    <Fragment>
      <NextSeo {...seoConfig.getConfig()} />
      <AppContainer actionBarOptions={actionBarOptions} title={appTitle}>
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h1" gutterBottom>{pageTitle}</Typography>
            <Typography variant="subtitle1">{pageSubtitle}</Typography>
          </Grid>
          <Grid item xs={12}>
            <GroupGrid
              domRef={groupGridRef}
              groups={groupItems}
              isLoading={isLoadingGroups}
              hasError={pageHasError}
            />
          </Grid>
        </Grid>
      </AppContainer>
    </Fragment>
  );
};

Groups.propTypes = {
  appEnv: PropTypes.string.isRequired,
  appTitle: PropTypes.string.isRequired,
  rootUrl: PropTypes.string.isRequired,
  groups: PropTypes.shape({
    hasError: PropTypes.bool,
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
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    })),
  }).isRequired,
};

Groups.getInitialProps = async () => {
  const { publicRuntimeConfig } = getConfig();

  const paginationQuery = `limit=${30}&page=${0}`;
  const route = `${publicRuntimeConfig.BO_API_ENDPOINT}/groups?${paginationQuery}`;
  const res = await fetch(route);

  let groups = { hasError: true };
  if (res.status === httpStatus.OK) {
    const data = await res.json();
    groups = {
      hasError: false,
      limit: data.limit,
      page: data.page,
      totalItems: data.totalItems,
      pageCount: data.pageCount,
      rows: data.rows,
    };
  }

  return {
    appEnv: publicRuntimeConfig.APP_ENV,
    appTitle: publicRuntimeConfig.TITLE,
    rootUrl: publicRuntimeConfig.ROOT_URL,
    groups,
  };
};

export default Groups;
