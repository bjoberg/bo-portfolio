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

const useStyles = makeStyles(GroupPageAddImagesDialogStyles);
const imageService = new ImageService();

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const GroupPageAddImagesDialog = (props) => {
  const classes = useStyles();
  const {
    groupId, groupImages, isOpen, handleClose, isEditable, getGroupImages,
  } = props;

  const [dialogIsLoaded, setDialogIsLoaded] = useState(false);
  const [dialogHasError, setDialogHasError] = useState(false);
  const [dialogError, setDialogError] = useState();
  const [images, setImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

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

  /**
   * Add / Remove item from select image array
   *
   * @param {string} selectedImageId id of image that was selected
   */
  const handleImageSelect = (selectedImageId) => {
    const imageIsSelected = selectedImages.find(el => el === selectedImageId);
    if (imageIsSelected) {
      const temp = selectedImages;
      temp.splice(temp.indexOf(selectedImageId), 1);
      setSelectedImages([...temp]);
    } else {
      setSelectedImages([...selectedImages, selectedImageId]);
    }
  };

  /**
   * Add images to the specified group
   */
  const handleAddImagesToGroup = async () => {
    try {
      setIsLoadingImages(true);
      await imageService.addImagesToGroup(groupId, selectedImages);
      await getGroupImages();
      handleClose();
    } catch (error) {
      const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const defaultStatusMessage = 'Unknown error has occured while adding images to group';
      displayDialogError(defaultStatusCode, defaultStatusMessage, error);
    } finally {
      setIsLoadingImages(false);
    }
  };

  /**
   * Retrieve image data
   */
  useEffect(() => {
    const loadDialogData = async () => { await getImages(); };
    if (isEditable) {
      setIsLoadingImages(true);
      loadDialogData();
      setDialogIsLoaded(true);
      setIsLoadingImages(false);
    }
  }, [getImages, isEditable, groupImages]);

  /**
   * When the dialog is toggled, clear the selected items
   */
  useEffect(() => { setSelectedImages([]); }, [isOpen]);

  return (
    <Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
      <ActionBar
        handleClose={() => handleClose()}
        actionButtonColor="secondary"
        showSave
        handleSave={handleAddImagesToGroup}
        isDisabled={isLoadingImages}
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
              isLoading={isLoadingImages}
              selectedImages={selectedImages}
              handleImageSelect={handleImageSelect}
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

GroupPageAddImagesDialog.propTypes = {
  groupId: PropTypes.string.isRequired,
  groupImages: PropTypes.arrayOf(PropTypes.object),
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  isEditable: PropTypes.bool,
  getGroupImages: PropTypes.func,
};

GroupPageAddImagesDialog.defaultProps = {
  isOpen: false,
  groupImages: [],
  handleClose: () => { },
  isEditable: false,
  getGroupImages: () => { },
};

export default GroupPageAddImagesDialog;
