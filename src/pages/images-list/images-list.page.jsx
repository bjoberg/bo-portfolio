import React from 'react';
import { ImageList } from '../../components';

/**
 * Page for interacting with a list of images
 * @param {Object} props properties to render the page
 */
function ImagesListPage({history, match}) {
  return (
    <ImageList />
  );
};

export default ImagesListPage;