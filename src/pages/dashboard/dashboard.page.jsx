import React from 'react';
import { ImageForm } from '../../components';

/**
 * Page for interacting with portfolio data
 * @param {Object} props properties to render the page
 */
function DashboardPage({history, match}) {
  return (
    <ImageForm 
      routeHistory={history}
      imageId={match.params.id} />
  );
};

export default DashboardPage;