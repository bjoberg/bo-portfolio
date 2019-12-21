import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import GroupStyles from './group.styles';

const useStyles = makeStyles(GroupStyles);

const Group = (props) => {
  const classes = useStyles();
  const { id, imageUrl, title } = props;

  return (
    <Link to={`/group/${id}`} className={classes.link}>
      <div className={classes.imgContainer}>
        <img
          id={id}
          src={imageUrl}
          alt={title}
          className={classes.img}
        />
      </div>
      <div className={classes.textContainer}>
        <Typography variant="body1">
          {title}
        </Typography>
      </div>
    </Link>
  );
};

Group.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Group;
