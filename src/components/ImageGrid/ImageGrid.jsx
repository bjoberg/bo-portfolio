import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  RootRef, CircularProgress, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Gallery from 'react-photo-gallery';

import ImageGridStyles from './ImageGrid.styles';

const useStyles = makeStyles(ImageGridStyles);

const ImageGrid = (props) => {
  const classes = useStyles();
  const { domRef, images, isLoading } = props;

  /**
   * Get all text for provided image.
   *
   * @param {string} title title of the image
   * @param {string} description description of the image
   * @returns {String} alt text for image
   */
  const getAltText = ({ title, description }) => {
    const alt = [];
    if (title && title !== null) alt.push(title);
    if (description && description !== null) alt.push(description);
    if (alt.length === 0) alt.push('Brett Oberg Photography');
    return alt.join(' ');
  };

  /**
   * Convert images into the format required by the Gallery.
   *
   * @returns {[object]} list of images formatted for the Gallery.
   */
  const getPhotos = () => {
    const photos = [];
    images.forEach((el) => {
      photos.push({
        src: el.thumbnailUrl,
        height: el.height,
        width: el.width,
        alt: getAltText(el),
      });
    });
    return photos;
  };

  if (images.length === 0) {
    return (<Typography>No images to display.</Typography>);
  }

  return (
    <Fragment>
      <RootRef rootRef={domRef}>
        <Gallery photos={getPhotos()} />
      </RootRef>
      {isLoading && (
        <div className={classes.circularProgressContainer}>
          <CircularProgress />
        </div>
      )}
    </Fragment>
  );
};

ImageGrid.propTypes = {
  domRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  })),
  isLoading: PropTypes.bool,
};

ImageGrid.defaultProps = {
  domRef: null,
  images: [],
  isLoading: false,
};

export default ImageGrid;
