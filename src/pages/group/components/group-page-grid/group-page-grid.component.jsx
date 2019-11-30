import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ImageGrid } from '../../../../components/image-grid';

const GroupPageGrid = (props) => {
  const { images, isEditable } = props;
  const [selectedImages, setSelectedImages] = useState([]);

  /**
   * Add / Remove item from select image arrayd
   *
   * @param {string} selectedImageId id of image that was selected
   */
  const handleImageSelect = (selectedImageId) => {
    const imageIsSelected = selectedImages.find(el => el === selectedImageId);
    if (imageIsSelected) {
      const temp = selectedImages;
      temp.splice(temp.indexOf(selectedImageId), 1);
      setSelectedImages([...temp]);
    } else {
      setSelectedImages([...selectedImages, selectedImageId]);
    }
  };

  return (
    <ImageGrid
      images={images}
      selectedImages={selectedImages}
      isLoading={false}
      isEditable={isEditable}
      onImageSelect={handleImageSelect}
    />
  );
};

GroupPageGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  isEditable: PropTypes.bool,
};

GroupPageGrid.defaultProps = {
  images: [],
  isEditable: false,
};

export default GroupPageGrid;
