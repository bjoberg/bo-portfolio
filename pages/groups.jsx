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

const { publicRuntimeConfig } = getConfig();
const useStyles = makeStyles(GroupsStyles);

const Groups = (props) => {
  const classes = useStyles();
  const groupGridRef = createRef();
  const { groups } = props;
  const pageTitle = 'Groups';
  const pageSubtitle = 'Collections of different images curated to display my best work, favorite moments, and photographic style.';
  const seoTitle = `${pageTitle} - ${publicRuntimeConfig.title}`;
  const url = `${publicRuntimeConfig.ROOT_URL}/groups`;
  const {
    totalItems,
    limit,
    page,
    hasError,
    rows,
  } = groups;
  const hasMoreData = isAtEnd(totalItems, limit, page + 1);
  const seoConfig = new SeoConfig(hasError, hasError, seoTitle, pageSubtitle, url);
  seoConfig.pushOpenGraphImage('/media/og/groups.jpg', 1200, 675, 'Brett Oberg Groups');

  const [pageHasError, setPageHasError] = useState(hasError);
  const [isAtEndOfGroupList, setIsAtEndOfGroupList] = useState(hasMoreData);
  const [currGroupPage, setCurrGroupPage] = useState(page);
  const [groupItems, setGroupItems] = useState(rows);

  const actionBarOptions = {
    title: publicRuntimeConfig.title,
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
      <AppContainer actionBarOptions={actionBarOptions}>
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
  const paginationQuery = `limit=${30}&page=${0}`;
  const route = `${publicRuntimeConfig.BO_API_ENDPOINT}/groups?${paginationQuery}`;
  const res = await fetch(route);
  if (res.status === httpStatus.OK) {
    const data = await res.json();
    const {
      limit, page, totalItems, pageCount, rows,
    } = data;
    return {
      groups: {
        hasError: false,
        limit,
        page,
        totalItems,
        pageCount,
        rows,
      },
    };
  }

  return { groups: { hasError: true } };
};

export default Groups;
