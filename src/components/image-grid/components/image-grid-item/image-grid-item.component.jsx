import React from 'react';
import PropTypes from 'prop-types';
import { useTheme, makeStyles, useMediaQuery } from '@material-ui/core';

import ImageGridItemStyles from './image-grid-item.styles';

const useStyles = makeStyles(ImageGridItemStyles);

const ImageGridItem = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    id, imageUrl, title, imageHeight, imageWidth,
  } = props;

  let height = theme.image.height.large;
  if (isMobile) height = theme.image.height.small;
  const width = (height / imageHeight) * imageWidth;

  return (
    <div className={classes.root} style={{ width }}>
      <img
        className={classes.img}
        id={id}
        src={imageUrl}
        alt={title}
      />
    </div>
  );
};

ImageGridItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
};

ImageGridItem.defaultProps = {
  title: '',
  imageHeight: 100,
  imageWidth: 100,
};

export default ImageGridItem;
