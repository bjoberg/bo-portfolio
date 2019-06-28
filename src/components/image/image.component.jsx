import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'

/**
 * A singular image object
 * @param {Object} props properties that define a speicific image
 */
function Image(props) {
  const { id, imageUrl, title } = props

  return (
    <Fragment>
      <Link to={`/dashboard/image/${id}`}>
        <img
          id={id}
          src={imageUrl}
          alt={title} />
      </Link>
    </Fragment>
  );
};

export default Image;