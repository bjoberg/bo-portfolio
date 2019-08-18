import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

import NavigationItems from '../../utils/navigation-items';
import MiniDrawerListItem from '../mini-drawer-list-item/mini-drawer-list-item.component';
import MiniDrawerStyles from './mini-drawer.styles';

const useStyles = makeStyles(MiniDrawerStyles);

const MiniDrawer = (props) => {
  const classes = useStyles();
  const { items } = props;

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader} />
      {items.map(item => (
        <MiniDrawerListItem key={item.identifier} item={item} />
      ))}
    </Drawer>
  );
};

MiniDrawer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    identifier: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.element,
    route: PropTypes.string,
  })),
};

MiniDrawer.defaultProps = {
  items: NavigationItems,
};

export default MiniDrawer;
