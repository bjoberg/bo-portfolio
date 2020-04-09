import React, { createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AppContainer from '../../src/components/AppContainer';
import { ImageGrid } from '../../src/components/ImageGrid';
import { GroupStyles } from '../../src/styles';
import { User } from '../../src/models';
import { getGroup, getGroupImages } from '../../src/services/group';
import { getSEOConfigForGroup } from '../../src/utils/seo';

const useStyles = makeStyles(GroupStyles);

/**
 * Navigate on page back in history
 */
const goBack = () => {
  try {
    const url = new URL(document.referrer);
    if (!url || url.pathname !== '/groups') window.location.replace('/groups');
    else window.history.back();
  } catch (error) {
    window.location.replace('/groups');
  }
};

const Group = (props) => {
  const classes = useStyles();
  const imageGridRef = createRef();
  const {
    user,
    hasError,
    group,
    images,
  } = props;
  const {
    seoUrl,
    seoTitle,
    seoDescription,
    seoImages,
  } = getSEOConfigForGroup(group);
  const actionBarOptions = {
    elevateOnScroll: true,
    showAvatar: true,
    showBackButton: true,
    handleBack: goBack,
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
          images: seoImages,
        }}
      />
      <AppContainer user={user} actionBarOptions={actionBarOptions}>
        <div className={classes.root}>
          <div className={classes.container}>
            <Typography variant="h1">{group.title}</Typography>
            <Typography variant="subtitle2">
              {images.totalItems}
              {' '}
              images
            </Typography>
            <div className={classes.subheader}>
              <Typography>{group.description}</Typography>
            </div>
            <div className={classes.imageGridContainer}>
              <ImageGrid
                domRef={imageGridRef}
                images={images.rows}
              />
            </div>
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
