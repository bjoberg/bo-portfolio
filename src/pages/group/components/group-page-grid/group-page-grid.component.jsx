import React from 'react';
import PropTypes from 'prop-types';

import { ImageGrid } from '../../../../components/image-grid';

const GroupPageGrid = (props) => {
  const {
    images, selectedImages, isEditable, isLoading, handleImageSelect,
  } = props;

  return (
    <ImageGrid
      images={images}
      selectedImages={selectedImages}
      isEditable={isEditable}
      isLoading={isLoading}
      handleImageSelect={handleImageSelect}
    />
  );
};

GroupPageGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  selectedImages: PropTypes.arrayOf(PropTypes.string),
  isEditable: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleImageSelect: PropTypes.func,
};

GroupPageGrid.defaultProps = {
  images: [],
  selectedImages: [],
  isEditable: false,
  isLoading: false,
  handleImageSelect: () => { },
};

export default GroupPageGrid;
