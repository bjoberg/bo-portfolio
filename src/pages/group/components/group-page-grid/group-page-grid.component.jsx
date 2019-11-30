import React from 'react';
import PropTypes from 'prop-types';

import { ImageGrid } from '../../../../components/image-grid';

const GroupPageGrid = (props) => {
  const { images } = props;
  return (<ImageGrid images={images} isLoading={false} />);
};

export default GroupPageGrid;
