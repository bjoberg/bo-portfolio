import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Group = (props) => {
  const { id, imageUrl, title } = props;

  return (
    <Fragment>
      <img
        id={id}
        src={imageUrl}
        alt={title}
      />
      <Typography variant="body1">
        {title}
      </Typography>
    </Fragment>
  );
};

Group.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Group;
