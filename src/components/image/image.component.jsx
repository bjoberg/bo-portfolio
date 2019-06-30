import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Image = (props) => {
  const {
    id,
    imageUrl,
    title,
  } = props;

  return (
    <Fragment>
      <Link to={`/dashboard/image/${id}`}>
        <img
          id={id}
          src={imageUrl}
          alt={title}
        />
      </Link>
    </Fragment>
  );
};

Image.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Image;
