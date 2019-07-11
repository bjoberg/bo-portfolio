import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Image from '../image/image.component';
import Group from '../group/group.component';
import EntityType from '../../utils/enums/entity-type.enum';
import EntityListStyles from './entity-grid.styles';

const useStyles = makeStyles(EntityListStyles);

const EntityGrid = (props) => {
  const classes = useStyles();
  const { entityType, data } = props;

  return (
    <Fragment>
      <div className={classes.container}>
        {data.map(item => (
          <div
            className={classes.entityItem}
            key={item.id}
          >
            <Link to={`/dashboard/${entityType}/${item.id}`}>
              {(() => {
                switch (entityType) {
                  case EntityType.IMAGE: return (
                    <Image
                      id={item.id}
                      title={item.title}
                      imageUrl={item.imageUrl}
                    />
                  );
                  case EntityType.GROUP: return (
                    <Group
                      id={item.id}
                      title={item.title}
                      imageUrl={item.imageUrl}
                    />
                  );
                  default: return 'Error';
                }
              })()}
            </Link>
          </div>
        ))}
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
