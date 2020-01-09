import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import GroupItem from './components/group-item/group-item.component';

const GroupGrid = (props) => {
  const { groups } = props;

  return (
    <Grid container spacing={3}>
      {groups.map(item => (
        <Grid
          key={item.id}
          item
          xs={6}
          sm={4}
          md={3}
          lg={2}
          xl={2}
        >
          <GroupItem
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
          />
        </Grid>
      ))}
    </Grid>
  );
};

GroupGrid.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  })),
};

GroupGrid.defaultProps = {
  groups: [],
};

export default GroupGrid;
