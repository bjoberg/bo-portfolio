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
  const { user, group, images } = props;
  const { title, description } = group.group;
  const actionBarOptions = {
    elevateOnScroll: true,
    showAvatar: true,
    actionButtons: {
      showAddPhoto: user.isAdmin,
      showAddGroup: user.isAdmin,
    },
  };
  const seoTitle = `${group.title} - ${SEO.title}`;
  const url = `${publicRuntimeConfig.ROOT_URL}/group/${group.id}`;

  return (
    <Fragment>
      <NextSeo
        noindex={group.hasError}
        nofollow={group.hasError}
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
            <Typography variant="h1" gutterBottom>{title}</Typography>
            <Typography variant="subtitle1">{description}</Typography>
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
  group: PropTypes.shape({
    hasError: PropTypes.bool,
    group: PropTypes.instanceOf(GroupModel)
  }).isRequired,
};

Group.defaultProps = {
  user: undefined,
};

Group.getInitialProps = async ({ query }) => {
  const { id } = query;
  const group = await getGroup(id);
  const images = await getGroupImages(id);
  return { group, images };
};

export default Group;