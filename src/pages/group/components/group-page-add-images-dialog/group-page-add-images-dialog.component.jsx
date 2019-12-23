import React, {
  Fragment, useState, useEffect, useCallback, forwardRef, createRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, Slide, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import httpStatus from 'http-status';

import GroupPageAddImagesDialogStyles from './group-page-add-images-dialog.styles';
import ActionBar from '../../../../components/action-bar';
import ImageService from '../../../../services/image.service';
import { ImageGrid } from '../../../../components/image-grid';
import ErrorPage from '../../../error/error.page';
import { isAtEnd, useInfiniteScroll } from '../../../../hooks/infinite-scroll';

const useStyles = makeStyles(GroupPageAddImagesDialogStyles);
const imageService = new ImageService();

const Transition = forwardRef((props, ref) => (<Slide direction="up" ref={ref} {...props} />));

const GroupPageAddImagesDialog = (props) => {
  const classes = useStyles();
  const {
    groupId, isOpen, handleClose, isEditable, getGroupImages,
  } = props;
  const limit = 30;

  const imageGridRef = createRef();
  const containerRef = createRef();

  const [dialogIsLoaded, setDialogIsLoaded] = useState(false);
  const [dialogHasError, setDialogHasError] = useState(false);
  const [dialogError, setDialogError] = useState();
  const [images, setImages] = useState([]);
  const [imagesPage, setImagesPage] = useState(0);
  const [isEndOfImages, setIsEndOfImages] = useState(false);
  const [hasErrorFetchingImages, setHasErrorFetchingImages] = useState(false);

  /**
   * Request next page of images
   *
   * @param {boolean} isFetching status of the image request
   */
  const handlePaginateImages = useCallback((isFetching) => {
    const paginateImages = async () => {
      try {
        const next = imagesPage + 1;
        const result = await imageService.getImagesNotForGroup(limit, next, groupId);
        setImages(prevState => [...prevState, ...result.data]);
        setIsEndOfImages(isAtEnd(result.totalItems, limit, next + 1));
        isFetching(false);
        setImagesPage(next);
      } catch (error) {
        setHasErrorFetchingImages(true);
        isFetching(false);
      }
    };
    paginateImages();
  }, [groupId, imagesPage]);

  const [isLoadingImages] = useInfiniteScroll(handlePaginateImages, isEndOfImages,
    hasErrorFetchingImages, imageGridRef, containerRef);
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
      await imageService.addImagesToGroup(groupId, selectedImages);
      await getGroupImages();
      handleClose();
    } catch (error) {
      const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const defaultStatusMessage = 'Unknown error has occured while adding images to group';
      displayDialogError(defaultStatusCode, defaultStatusMessage, error);
    }
  };

  /**
   * Retrieve image data
   */
  useEffect(() => {
    const loadDialogData = async () => { await getImages(); };
    if (isEditable && isOpen) {
      loadDialogData();
      setDialogIsLoaded(true);
    }
  }, [getImages, isEditable, isOpen]);

  /**
   * When the dialog is toggled, clear the selected items
   */
  useEffect(() => {
    if (!isOpen) {
      setImages([]);
      setImagesPage(0);
      setIsEndOfImages(false);
      setHasErrorFetchingImages(false);
      setSelectedImages([]);
    }
  }, [isOpen]);

  return (
    <Dialog
      fullScreen
      open={isOpen}
      TransitionComponent={Transition}
    >
      <ActionBar
        handleClose={() => handleClose()}
        actionButtonColor="secondary"
        showSave
        handleSave={handleAddImagesToGroup}
        isDisabled={isLoadingImages || selectedImages <= 0}
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
        <Fragment>
          <div className={classes.toolbar} />
          <div ref={containerRef} className={classes.dialogContentContainer}>
            <div className={classes.dialogContent}>
              <ImageGrid
                domRef={imageGridRef}
                images={images}
                isEditable
                isLoading={isLoadingImages}
                selectedImages={selectedImages}
                handleImageSelect={handleImageSelect}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Dialog>
  );
};

GroupPageAddImagesDialog.propTypes = {
  groupId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  isEditable: PropTypes.bool,
  getGroupImages: PropTypes.func,
};

GroupPageAddImagesDialog.defaultProps = {
  isOpen: false,
  handleClose: () => { },
  isEditable: false,
  getGroupImages: () => { },
};

export default GroupPageAddImagesDialog;
