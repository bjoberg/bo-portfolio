import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';

import GroupItemStyles from './group-item.styles';

const useStyles = makeStyles(GroupItemStyles);

const GroupItem = (props) => {
  const classes = useStyles();
  const {
    id, imageUrl, title, isRemovable,
  } = props;

  return (
    <Fragment>
      <div className={classes.root}>
        {isRemovable && (
          <div className={classes.actionBar}>
            <IconButton color="secondary" aria-label="remove group">
              <DeleteIcon />
            </IconButton>
          </div>
        )}
        <Link to={`/group/${id}`} className={classes.link}>
          <div className={classes.imgContainer}>
            <img
              id={id}
              src={imageUrl}
              alt={title}
              className={classes.img}
            />
          </div>
        </Link>
      </div>
      <div className={classes.textContainer}>
        <Typography variant="body1">
          {title}
        </Typography>
      </div>
    </Fragment>
  );
};

GroupItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isRemovable: PropTypes.bool,
};

GroupItem.defaultProps = {
  isRemovable: false,
};

export default GroupItem;
