import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer, Typography, List,
} from '@material-ui/core';

import MiniDrawerListItemStyles from './mini-drawer-list-item.styles';

const useStyles = makeStyles(MiniDrawerListItemStyles);

const MiniDrawerListItem = (props) => {
  const classes = useStyles();
  const { item } = props;

  return (
    <div className={classes.root}>
      <item.icon />
      <Typography variant="body2">
        {item.text}
      </Typography>
    </div>
  );
};

export default MiniDrawerListItem;
