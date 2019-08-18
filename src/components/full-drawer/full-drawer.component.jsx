import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List } from '@material-ui/core';

import NavigationItems from '../../utils/navigation-items';
import FullDrawerListItem from '../full-drawer-list-item/full-drawer-list-item.component';
import FullDrawerStyles from './full-drawer.styles';
import FullDrawerHeader from '../full-drawer-header/full-drawer-header.component';

const useStyles = makeStyles(FullDrawerStyles);

const FullDrawer = (props) => {
  const classes = useStyles();
  const { items, isOpen } = props;

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <FullDrawerHeader />
      <List className={classes.list}>
        {items.map(item => (
          <FullDrawerListItem key={item.identifier} item={item} />
        ))}
      </List>
    </Drawer>
  );
};

FullDrawer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    identifer: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.element,
    route: PropTypes.string,
  })),
  isOpen: PropTypes.bool,
};

FullDrawer.defaultProps = {
  items: NavigationItems,
  isOpen: false,
};

export default FullDrawer;
