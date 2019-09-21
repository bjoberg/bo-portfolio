import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import ImageStyles from './image.styles';

const useStyles = makeStyles(ImageStyles);

const Image = (props) => {
  const classes = useStyles();
  const { id, imageUrl, title } = props;

  return (
    <Link to={`/image/${id}`} className={classes.link}>
      <div className={classes.imgContainer}>
        <img
          id={id}
          src={imageUrl}
          alt={title}
          className={classes.img}
        />
      </div>
    </Link>
  );
};

Image.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Image;
