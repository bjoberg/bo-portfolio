import React from 'react';
import PhotoIcon from '@material-ui/icons/Photo';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const Routes = [
  {
    id: 'images',
    title: 'Images',
    route: 'images',
    icon: <PhotoIcon />,
  },
  {
    id: 'groups',
    title: 'Groups',
    route: 'groups',
    icon: <PhotoLibraryIcon />,
  },
];

export default Routes;
