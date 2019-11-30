import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CircularProgress, makeStyles } from '@material-ui/core';

import ImageGridStyles from './image-grid.styles';
import Image from './components/image-grid-item/image-grid-item.component';

const useStyles = makeStyles(ImageGridStyles);

const ImageGrid = (props) => {
  const classes = useStyles();
  const { images, isLoading } = props;

  return (
    <Fragment>
      <div className={classes.root}>
        {images.map(item => (
          <Link key={item.id} to={`/image/${item.id}`} className={classes.link}>
            <Image
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              imageHeight={item.height}
              imageWidth={item.width}
            />
          </Link>
        ))}
      </div>
      {isLoading && (
        <div className={classes.circularProgressContainer}>
          <CircularProgress />
        </div>
      )}
    </Fragment>
  );
};

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  })),
  isLoading: PropTypes.bool,
};

ImageGrid.defaultProps = {
  images: [],
  isLoading: false,
};

export default ImageGrid;
