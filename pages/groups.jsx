import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

import AppContainer from '../src/components/AppContainer';
import { GroupGrid } from '../src/components/GroupGrid';
import { User } from '../src/models';

const { publicRuntimeConfig } = getConfig();

const Groups = (props) => {
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
      <Fragment>
        <GroupGrid
          domRef={groupGridRef}
          groups={groups.rows}
          isRemovable={user.isAdmin}
        // handleRemoveOnClick={openDeleteDialog}
        // isLoading={isLoadingGroups}
        />
        {/* {groups.rows.length > 0 && groups.rows.map(group => (
          <div key={group.id}>{group.title}</div>
        ))} */}
      </Fragment>
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
