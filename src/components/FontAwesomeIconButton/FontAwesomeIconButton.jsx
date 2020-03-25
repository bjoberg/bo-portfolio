import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FontAwesomeIconButton = (props) => {
  const {
    icon,
    label,
    title,
    href,
    target,
  } = props;

  return (
    <Tooltip title={title}>
      <IconButton href={href} target={target} aria-label={label}>
        <FontAwesomeIcon icon={icon} />
      </IconButton>
    </Tooltip>
  );
};

FontAwesomeIconButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object.isRequired,
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
};

FontAwesomeIconButton.defaultProps = {
  label: '',
  href: undefined,
  target: '_blank',
};

export default FontAwesomeIconButton;
