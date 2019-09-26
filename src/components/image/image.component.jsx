import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

import ImageStyles from './image.styles';

const useStyles = makeStyles(ImageStyles);

const Image = (props) => {
  const classes = useStyles();
  const { id, imageUrl, title } = props;

  return (
    <div className={classes.thumbnail}>
      <img
        id={id}
        src={imageUrl}
        alt={title}
        className={classes.img}
      />
    </div>
  );
};

Image.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Image.defaultProps = {
  title: '',
};

export default Image;
