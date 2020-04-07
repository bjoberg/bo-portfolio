import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { NextSeo } from 'next-seo';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SEO from '../../next-seo.config';
import AppContainer from '../../src/components/AppContainer';
import { GroupStyles } from '../../src/styles';
import { User } from '../../src/models';
import { getGroup, getGroupImages } from '../../src/services/group';

const { publicRuntimeConfig } = getConfig();
const useStyles = makeStyles(GroupStyles);

/**
 * Get the seo config based on the provided group
 * 
 * @param {{id: string, title: string, description: string}} group 
 * @returns {{ seoUrl: string, seoTitle: string, seoDescription: string }} seo config variables
 */
const getSeoConfig = (group) => {
  const seoUrl = `${publicRuntimeConfig.ROOT_URL}/group/${group.id}`;
  let seoTitle = SEO.title;
  let seoDescription = SEO.description;
  if (group.title) seoTitle = `${group.title} - ${SEO.title}`;
  if (group.description) seoDescription = group.description;
  return { seoUrl, seoTitle, seoDescription };
}

const Group = (props) => {
  const classes = useStyles();
  const { user, hasError, group, images } = props;
  const { seoUrl, seoTitle, seoDescription } = getSeoConfig(group);

  const actionBarOptions = {
    elevateOnScroll: true,
    showAvatar: true,
    actionButtons: {
      showAddPhoto: user.isAdmin,
      showAddGroup: user.isAdmin,
    },
  };

  return (
    <Fragment>
      <NextSeo
        noindex={hasError}
        nofollow={hasError}
        title={seoTitle}
        description={seoDescription}
        canonical={seoUrl}
        openGraph={{
          url: seoUrl,
          title: seoTitle,
          description: seoDescription,
          // TODO: Add this to the export config
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
  group: PropTypes.shape({
    id: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
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
    }))
  }),
};

Group.defaultProps = {
  user: undefined,
  hasError: false,
};

Group.getInitialProps = async ({ query }) => {
  const { id } = query;
  let hasError = false;
  let group;
  let images;
  try {
    group = await getGroup(id);
    images = await getGroupImages(id);
  } catch (error) {
    hasError = true;
  }
  return { hasError, group, images };
};

export default Group;