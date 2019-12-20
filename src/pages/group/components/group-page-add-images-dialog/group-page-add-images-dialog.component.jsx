import React, {
  Fragment, useState, useEffect, useCallback, useRef, forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  RootRef, makeStyles, Dialog, Slide, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import httpStatus from 'http-status';

import GroupPageAddImagesDialogStyles from './group-page-add-images-dialog.styles';
import ActionBar from '../../../../components/action-bar';
import ImageService from '../../../../services/image.service';
import { ImageGrid } from '../../../../components/image-grid';
import ErrorPage from '../../../error/error.page';
import useInfiniteScrollModal from '../../../../hooks/infinite-scroll-modal.hook';

const useStyles = makeStyles(GroupPageAddImagesDialogStyles);
const imageService = new ImageService();
const evaluateIsEnd = (total, offset, nextPage) => (total / offset) <= nextPage;

const Transition = forwardRef((props, ref) => (<Slide direction="up" ref={ref} {...props} />));

const GroupPageAddImagesDialog = (props) => {
  const classes = useStyles();
  const {
    groupId, isOpen, handleClose, isEditable, getGroupImages,
  } = props;
  const limit = 30;

  const imageGridRef = React.createRef();
  const containerRef = React.createRef();

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
        setIsEndOfImages(evaluateIsEnd(result.totalItems, limit, next + 1));
        isFetching(false);
        setImagesPage(next);
      } catch (error) {
        setHasErrorFetchingImages(true);
        isFetching(false);
      }
    };
    paginateImages();
  }, [groupId, imagesPage]);

  const [isLoadingImages] = useInfiniteScrollModal(handlePaginateImages, isEndOfImages,
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
      // setIsLoadingImages(true);
      await imageService.addImagesToGroup(groupId, selectedImages);
      await getGroupImages();
      handleClose();
    } catch (error) {
      const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const defaultStatusMessage = 'Unknown error has occured while adding images to group';
      displayDialogError(defaultStatusCode, defaultStatusMessage, error);
    } finally {
      // setIsLoadingImages(false);
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
  useEffect(() => { setSelectedImages([]); }, [isOpen]);

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
        <div ref={containerRef} className={classes.dialogContentContainer}>
          <div className={classes.dialogContent}>
            <div className={classes.toolbar} />
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
