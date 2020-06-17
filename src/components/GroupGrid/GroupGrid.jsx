import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, RootRef, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GroupItem from './components/GroupItem';
import GroupGridStyles from './GroupGrid.styles';

const useStyles = makeStyles(GroupGridStyles);

const GroupGrid = (props) => {
  const {
    domRef, groups, showActionMenu, isRemovable, handleRemoveOnClick, isLoading, hasError,
  } = props;
  const classes = useStyles();

  if (!hasError && groups.length === 0) {
    return (<Typography>No groups to display.</Typography>);
  }

  return (
    <Fragment>
      <RootRef rootRef={domRef}>
        <Grid container spacing={3}>
          {groups.map(item => (
            <Grid
              key={item.id}
              item
              xs={12}
              md={6}
            >
              <GroupItem
                id={item.id}
                title={item.title}
                imageUrl={item.thumbnailUrl}
                showActionMenu={showActionMenu}
                isRemovable={isRemovable}
                handleRemoveOnClick={handleRemoveOnClick}
              />
            </Grid>
          ))}
        </Grid>
      </RootRef>
      {hasError && (
        <div className={classes.errorContainer}>
          <Typography>
            There was an error loading the groups! Please refresh to try again.
          </Typography>
        </div>
      )}
      {isLoading && (
        <div className={classes.circularProgressContainer}>
          <CircularProgress />
        </div>
      )}
    </Fragment>
  );
};

GroupGrid.propTypes = {
  domRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  })),
  hasError: PropTypes.bool,
  showActionMenu: PropTypes.bool,
  isRemovable: PropTypes.bool,
  handleRemoveOnClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

GroupGrid.defaultProps = {
  domRef: null,
  groups: [],
  showActionMenu: false,
  isRemovable: false,
  handleRemoveOnClick: () => { },
  isLoading: false,
  hasError: false,
};

export default GroupGrid;
