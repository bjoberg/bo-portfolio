import HomeIcon from '@material-ui/icons/Home';
import PhotoIcon from '@material-ui/icons/Photo';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import NavigationItem from './navigation-item';

const home = new NavigationItem({
  identifier: 'home',
  text: 'home',
  icon: HomeIcon,
  route: '/',
});

const images = new NavigationItem({
  identifier: 'images',
  text: 'images',
  icon: PhotoIcon,
  route: '/images',
});

const groups = new NavigationItem({
  identifier: 'groups',
  text: 'groups',
  icon: PhotoLibraryIcon,
  route: '/groups',
});

const NavigationItems = [
  home,
  images,
  groups,
];

export default NavigationItems;
