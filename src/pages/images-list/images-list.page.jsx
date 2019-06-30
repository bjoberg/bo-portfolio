import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ImageList } from '../../components';
import ImageListStyles from './images-list.styles';

const useStyles = makeStyles(ImageListStyles);

/**
 * Page for interacting with a list of images
 * @param {Object} props properties to render the page
 */
function ImagesListPage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ImageList />
    </div>
  );
};

export default ImagesListPage;