import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
  const { id, imageUrl, title } = props;

  return (
    <img
      id={id}
      src={imageUrl}
      alt={title}
    />
  );
};

Image.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Image;
