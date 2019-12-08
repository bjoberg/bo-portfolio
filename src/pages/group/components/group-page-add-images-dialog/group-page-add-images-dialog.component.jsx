import React, {
  Fragment, useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Dialog, Slide, CircularProgress,
} from '@material-ui/core';
import httpStatus from 'http-status';

import GroupPageAddImagesDialogStyles from './group-page-add-images-dialog.styles';
import ActionBar from '../../../../components/action-bar';
import ImageService from '../../../../services/image.service';
import { ImageGrid } from '../../../../components/image-grid';
import ErrorPage from '../../../error/error.page';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const imageService = new ImageService();
const useStyles = makeStyles(GroupPageAddImagesDialogStyles);

const GroupPageAddImagesDialog = (props) => {
  const classes = useStyles();
  const {
    groupId, isOpen, handleClose, isEditable,
  } = props;

  const [dialogIsLoaded, setDialogIsLoaded] = useState(false);
  const [dialogHasError, setDialogHasError] = useState(false);
  const [dialogError, setDialogError] = useState();
  const [images, setImages] = useState();

  /**
   * Evaluate error a display status to user
   *
   * @param {number|string} defaultStatusCode error status code to display if error object does not
   * have status prop
   * @param {string} defaultStatusMessage error message details to display if error object does not
   * have message prop
   * @param {any} error error that was thrown
   */
  const displayDialogError = (defaultStatusCode, defaultStatusMessage, error) => {
    const { status, message } = error;
    const title = `${status}` || `${defaultStatusCode}`;
    const details = message || defaultStatusMessage;
    setDialogError({ title, details });
    setDialogHasError(true);
  };

  /**
   * Make request to retrieve group images
   */
  const getImages = useCallback(async () => {
    try {
      const result = await imageService.getImagesNotForGroup(30, 0, groupId);
      setImages(result.data);
    } catch (error) {
      const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const defaultStatusMessage = 'Unknown error has occured while getting group images';
      displayDialogError(defaultStatusCode, defaultStatusMessage, error);
    }
  }, [groupId]);

  useEffect(() => {
    const loadDialogData = async () => {
      await getImages();
      setDialogIsLoaded(true);
    };
    if (isEditable) loadDialogData();
  }, [getImages, isEditable]);

  return (
    <Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
      <ActionBar
        handleClose={() => handleClose()}
        actionButtonColor="secondary"
        showSave
      />
      {dialogHasError && (
        <Fragment>
          <div className={classes.toolbar} />
          <ErrorPage
            title={dialogError.title}
            details={dialogError.details}
          />
        </Fragment>
      )}
      {(!dialogHasError && !dialogIsLoaded) && (
        <div className={classes.progressContainer}>
          <CircularProgress />
        </div>
      )}
      {(!dialogHasError && dialogIsLoaded) && (
        <div className={classes.dialogContentContainer}>
          <div className={classes.dialogContent}>
            <div className={classes.toolbar} />
            <ImageGrid
              images={images}
              isEditable
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

GroupPageAddImagesDialog.propTypes = {
  groupId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  isEditable: PropTypes.bool,
};

GroupPageAddImagesDialog.defaultProps = {
  isOpen: false,
  handleClose: () => { },
  isEditable: false,
};

export default GroupPageAddImagesDialog;
