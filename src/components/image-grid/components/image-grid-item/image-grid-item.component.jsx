import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

import ImageGridItemStyles from './image-grid-item.styles';

const useStyles = makeStyles(ImageGridItemStyles);

const ImageGridItem = (props) => {
  const classes = useStyles();
  const { id, imageUrl, title } = props;

  return (
    <div className={classes.root}>
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
};

ImageGridItem.defaultProps = {
  title: '',
};

export default ImageGridItem;
