import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EntityListStyles from './entity-list.styles';

const useStyles = makeStyles(EntityListStyles);

const EntityList = (props) => {
  const classes = useStyles();
  const { type, data } = props;

  return (
    <Fragment>
      <div className={classes.container}>
        {data.map(item => (
          <div
            className={classes.entityItem}
            key={item.id}
          >
            <Link to={`/dashboard/${type}/${item.id}`}>
              <img
                id={item.id}
                src={item.imageUrl}
                alt={item.title}
              />
            </Link>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

EntityList.propTypes = {
  type: PropTypes.oneOf(['image', 'group']).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
  })),
};

EntityList.defaultProps = {
  data: [],
};

export default EntityList;
