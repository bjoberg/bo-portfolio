import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide } from '@material-ui/core';

import ActionBar from '../../../../components/action-bar';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const GroupPageAddImagesDialog = (props) => {
  const { isOpen, handleClose } = props;

  return (
    <Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
      <ActionBar handleClose={() => handleClose()} />
    </Dialog>
  );
};

GroupPageAddImagesDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

GroupPageAddImagesDialog.defaultProps = {
  isOpen: false,
  handleClose: () => { },
};

export default GroupPageAddImagesDialog;
