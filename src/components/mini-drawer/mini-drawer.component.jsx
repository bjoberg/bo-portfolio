import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer, Typography, List,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

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
        <NavLink key={item.identifier} exact activeClassName={classes.linkIsActive} to={item.route}>
          <MiniDrawerListItem item={item} />
        </NavLink>
      ))}
    </Drawer>
  );
};

MiniDrawer.propTypes = {
  items: PropTypes.array,
};

MiniDrawer.defaultProps = {
  items: NavigationItems,
};

export default MiniDrawer;
