import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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

MiniDrawerListItem.propTypes = {
  item: PropTypes.shape({
    identifer: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.element,
    route: PropTypes.string,
  }).isRequired,
};

export default MiniDrawerListItem;
