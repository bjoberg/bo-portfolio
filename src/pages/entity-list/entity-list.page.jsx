import React from 'react';
import { makeStyles } from '@material-ui/core';
import ImageList from '../../components/image-list/image-list.component';
import EntityListStyles from './entity-list.styles';

const useStyles = makeStyles(EntityListStyles);

const EntityListPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ImageList />
    </div>
  );
};

export default EntityListPage;
