import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GroupItemStyles from './GroupItem.styles';
// import ActionMenu from '../../../ActionMenu';

const useStyles = makeStyles(GroupItemStyles);

const GroupItem = (props) => {
  const classes = useStyles();
  const {
    id, imageUrl, title, isRemovable, handleRemoveOnClick,
  } = props;
  const [options, setOptions] = useState([]);

  /**
   * Build the options menu based on provided props
   */
  const constructOptions = useCallback(() => {
    const values = [];
    if (isRemovable) {
      values.push({
        id: 0,
        value: 'Delete group',
        handleOnClick: handleRemoveOnClick,
      });
    }
    setOptions(values);
  }, [handleRemoveOnClick, isRemovable]);

  useEffect(() => {
    constructOptions();
  }, [constructOptions]);

  return (
    <div className={classes.root}>
      <div className={classes.actionBar}>
        {/* <ActionMenu parentId={id} options={options} /> */}
      </div>
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
              <Typography variant="h3">{title}</Typography>
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
  isRemovable: PropTypes.bool,
  handleRemoveOnClick: PropTypes.func,
};

GroupItem.defaultProps = {
  isRemovable: false,
  handleRemoveOnClick: () => { },
};

export default GroupItem;
