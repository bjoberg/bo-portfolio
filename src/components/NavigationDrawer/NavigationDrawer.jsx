import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List } from '@material-ui/core';

import NavigationDrawerStyles from './NavigationDrawer.styles';
import NavigationDrawerListItem from './components/NavigationDrawerListItem';
import NavigationDrawerHeader from './components/NavigationDrawerHeader';

const useStyles = makeStyles(NavigationDrawerStyles);

const NavigationDrawer = (props) => {
  const classes = useStyles();
  const {
    title, email, items, isOpen, handleClose,
  } = props;

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <NavigationDrawerHeader title={title} email={email} />
      <List className={classes.list}>
        {items.map(item => (
          <NavigationDrawerListItem key={item.id} item={item} handleClose={handleClose} />
        ))}
      </List>
    </Drawer>
  );
};

NavigationDrawer.propTypes = {
  title: PropTypes.string,
  email: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.element,
    route: PropTypes.string,
  })),
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

NavigationDrawer.defaultProps = {
  title: '',
  email: '',
  items: [],
  isOpen: false,
  handleClose: () => { },
};

export default NavigationDrawer;
