import React from 'react';
import { makeStyles } from '@material-ui/core';
import ImageList from '../../components/image-list/image-list.component';
import ImageListStyles from './images-list.styles';

const useStyles = makeStyles(ImageListStyles);

const ImagesListPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ImageList />
    </div>
  );
};

export default ImagesListPage;
