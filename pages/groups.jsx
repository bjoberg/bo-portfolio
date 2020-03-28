import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';
import { makeStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
import AppContainer from '../src/components/AppContainer';
import { GroupGrid } from '../src/components/GroupGrid';
import { User } from '../src/models';
import { GroupsStyles } from '../src/styles';

const { publicRuntimeConfig } = getConfig();
const useStyles = makeStyles(GroupsStyles);

const Groups = (props) => {
  const classes = useStyles();
  const { user, groups } = props;
  const groupGridRef = useRef(null);

  const actionBarOptions = {
    elevateOnScroll: true,
    showAvatar: true,
    showAddPhoto: user.isAdmin,
    showAddGroup: user.isAdmin,
  };

  return (
    <AppContainer user={user} actionBarOptions={actionBarOptions}>
      <div className={classes.root}>
        <div className={classes.container}>
          <Typography variant="h1" className={classes.title}>Groups</Typography>
          <GroupGrid
            domRef={groupGridRef}
            groups={groups.rows}
            isRemovable={user.isAdmin}
          />
        </div>
      </div>
    </AppContainer>
  );
};

Groups.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.instanceOf(User),
    isFetching: PropTypes.bool,
    isAdmin: PropTypes.bool,
  }),
  groups: PropTypes.shape({
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
  const res = await fetch(`${publicRuntimeConfig.BO_API_ENDPOINT}/groups`);
  const data = await res.json();

  return {
    groups: {
      limit: data.limit,
      page: data.page,
      totalItems: data.totalItems,
      pageCount: data.pageCount,
      rows: data.rows,
    },
  };
};

export default Groups;
