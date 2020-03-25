import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';

const ActionBarIconButton = (props) => {
  const {
    title,
    color,
    handleOnClick,
    isDisabled,
    icon,
  } = props;

  return (
    <Tooltip title={title}>
      <IconButton
        color={color}
        onClick={handleOnClick}
        disabled={isDisabled}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

ActionBarIconButton.propTypes = {
  title: PropTypes.string,
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  handleOnClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  icon: PropTypes.element.isRequired,
};

ActionBarIconButton.defaultProps = {
  title: '',
  color: 'default',
  handleOnClick: () => { },
  isDisabled: false,
};

export default ActionBarIconButton;
