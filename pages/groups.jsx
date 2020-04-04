import React, {
  createRef, Fragment, useCallback, useState,
} from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';
import httpStatus from 'http-status';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NextSeo } from 'next-seo';

import SEO from '../next-seo.config';
import AppContainer from '../src/components/AppContainer';
import { GroupGrid } from '../src/components/GroupGrid';
import { User } from '../src/models';
import { GroupsStyles } from '../src/styles';
import { isAtEnd } from '../src/utils/helpers';
import { useInfiniteScroll } from '../src/hooks';

const { publicRuntimeConfig } = getConfig();
const useStyles = makeStyles(GroupsStyles);
const pageTitle = 'Groups';
const pageSubtitle = 'Collections of different images curated to display my best work, favorite moments, and photographic style.';
const seoTitle = `${pageTitle} - ${SEO.title}`;
const url = `${publicRuntimeConfig.ROOT_URL}/groups`;

const Groups = (props) => {
  const classes = useStyles();
  const groupGridRef = createRef();
  const { user, groups } = props;
  const hasMoreData = isAtEnd(groups.totalItems, groups.limit, groups.page + 1);

  const [hasError, setHasError] = useState(groups.hasError);
  const [isEnd, setIsEnd] = useState(hasMoreData);
  const [page, setPage] = useState(groups.page);
  const [items, setItems] = useState(groups.rows);

  const actionBarOptions = {
    title: SEO.title,
    elevateOnScroll: true,
    showAvatar: true,
    actionButtons: {
      showAddPhoto: user.isAdmin,
      showAddGroup: user.isAdmin,
    },
  };

  /**
   * Request next page of groups
   * @param {Function} isFetching set the status of the fetching state
   */
  const handlePaginateImages = useCallback((isFetching) => {
    const paginateGroups = async () => {
      const next = page + 1;
      const result = await fetch(`/api/groups?limit=${groups.limit}&page=${next}`);
      if (result.status === httpStatus.OK) {
        const json = await result.json();
        setItems(prevState => [...prevState, ...json.rows]);
        setIsEnd(isAtEnd(json.totalItems, json.limit, next + 1));
        isFetching(false);
        setPage(next);
      } else {
        setHasError(true);
        isFetching(false);
      }
    };
    paginateGroups();
  }, [groups.limit, page]);

  const [isLoadingGroups] = useInfiniteScroll(
    handlePaginateImages,
    isEnd,
    hasError,
    groupGridRef,
  );

  return (
    <Fragment>
      <NextSeo
        noindex={hasError}
        nofollow={hasError}
        title={seoTitle}
        description={pageSubtitle}
        canonical={url}
        openGraph={{
          url,
          title: seoTitle,
          description: pageSubtitle,
          images: [
            {
              url: '/media/og/groups.jpg',
              width: 1200,
              height: 675,
              alt: 'Brett Oberg Groups',
            },
          ],
        }}
      />
      <AppContainer user={user} actionBarOptions={actionBarOptions}>
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.title}>
              <Typography variant="h1" gutterBottom>{pageTitle}</Typography>
              <Typography variant="subtitle1">{pageSubtitle}</Typography>
            </div>
            <GroupGrid
              domRef={groupGridRef}
              groups={items}
              showActionMenu={user.isAdmin}
              isRemovable={user.isAdmin}
              isLoading={isLoadingGroups}
              hasError={hasError}
            />
          </div>
        </div>
      </AppContainer>
    </Fragment>
  );
};

Groups.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.instanceOf(User),
    isFetching: PropTypes.bool,
    isAdmin: PropTypes.bool,
  }),
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

Groups.defaultProps = {
  user: undefined,
};

Groups.getInitialProps = async () => {
  const route = `${publicRuntimeConfig.BO_API_ENDPOINT}/groups?limit=${30}&page=${0}`;
  const res = await fetch(route);
  let groups;
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
  } else {
    groups = {
      hasError: true,
    };
  }
  return { groups };
};

export default Groups;
