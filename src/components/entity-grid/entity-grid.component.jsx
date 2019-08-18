import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import Image from '../image/image.component';
import Group from '../group/group.component';
import EntityType from '../../utils/constants';
import EntityGridStyles from './entity-grid.styles';

const useStyles = makeStyles(EntityGridStyles);

const EntityGrid = (props) => {
  const classes = useStyles();
  const { entityType, data } = props;

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {data.map(item => (
            (() => {
              switch (entityType) {
                case EntityType.IMAGE: return (
                  <Grid
                    key={item.id}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={2}
                    xl={2}
                    className={classes.grid}
                  >
                    <Image
                      id={item.id}
                      title={item.title}
                      imageUrl={item.imageUrl}
                    />
                  </Grid>
                );
                case EntityType.GROUP: return (
                  <Grid
                    key={item.id}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={2}
                    xl={2}
                    className={classes.grid}
                  >
                    <Group
                      id={item.id}
                      title={item.title}
                      imageUrl={item.imageUrl}
                    />
                  </Grid>
                );
                default: return 'Error';
              }
            })()
          ))}
        </Grid>
      </div>
    </Fragment>
  );
};

EntityGrid.propTypes = {
  entityType: PropTypes.oneOf([EntityType.IMAGE, EntityType.GROUP]).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
  })),
};

EntityGrid.defaultProps = {
  data: [],
};

export default EntityGrid;
