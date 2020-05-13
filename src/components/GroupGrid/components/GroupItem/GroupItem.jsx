import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GroupItemStyles from './GroupItem.styles';

const useStyles = makeStyles(GroupItemStyles);

const GroupItem = (props) => {
  const classes = useStyles();
  const {
    id, imageUrl, title,
  } = props;

  return (
    <div className={classes.root}>
      <div className={classes.imgContainer}>
        <img
          id={id}
          src={imageUrl}
          alt={title}
          className={classes.img}
        />
      </div>
      <div className={classes.overlay} />
      <div className={classes.linkContainer}>
        <a href={`/group/${id}`} className={classes.link}>
          <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
            <Grid item>
              <Typography variant="h3" align="center">{title}</Typography>
            </Grid>
          </Grid>
        </a>
      </div>
    </div>
  );
};

GroupItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default GroupItem;
