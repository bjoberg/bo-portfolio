import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { NextSeo } from 'next-seo';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SEO from '../../next-seo.config';
import AppContainer from '../../src/components/AppContainer';
import { Group as GroupModel } from '../../src/models';
import { GroupStyles } from '../../src/styles';
import { User } from '../../src/models';
import { getGroup, getGroupImages } from '../../src/services/group';

const { publicRuntimeConfig } = getConfig();
const useStyles = makeStyles(GroupStyles);

const Group = (props) => {
  const classes = useStyles();
  const { user, hasError, group } = props;

  const actionBarOptions = {
    elevateOnScroll: true,
    showAvatar: true,
    actionButtons: {
      showAddPhoto: user.isAdmin,
      showAddGroup: user.isAdmin,
    },
  };

  // TODO: What if group is undefined?
  const seoTitle = `${group.title} - ${SEO.title}`;
  const url = `${publicRuntimeConfig.ROOT_URL}/group/${group.id}`;

  return (
    <Fragment>
      <NextSeo
        noindex={hasError}
        nofollow={hasError}
        title={seoTitle}
        description={group.description}
        canonical={url}
        openGraph={{
          url,
          title: seoTitle,
          description: group.description,
          images: [
            {
              url: group.thumbnailUrl,
              alt: `${group.title} Brett Oberg Group`,
            },
          ],
        }}
      />
      <AppContainer user={user} actionBarOptions={actionBarOptions}>
        <div className={classes.root}>
          <div className={classes.container}>
            <Typography variant="h1" gutterBottom>{group.title}</Typography>
            <Typography variant="subtitle1">{group.description}</Typography>
          </div>
        </div>
      </AppContainer>
    </Fragment>
  );
};

Group.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.instanceOf(User),
    isFetching: PropTypes.bool,
    isAdmin: PropTypes.bool,
  }),
  hasError: PropTypes.bool,
  group: PropTypes.instanceOf(GroupModel).isRequired
};

Group.defaultProps = {
  user: undefined,
  hasError: false,
};

Group.getInitialProps = async ({ query }) => {
  const { id } = query;
  let hasError = false;
  let group;
  try {
    group = await getGroup(id);
    group.images = await getGroupImages(id);
  } catch (error) {
    hasError = true;
  }
  return { hasError, group };
};

export default Group;