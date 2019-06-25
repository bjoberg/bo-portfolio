import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { ImageFormContent, ImageFormActions, SnackbarContentWrapper } from '../index';
import { ImageService } from '../../services';
import { ImageFormStyles } from './image-form.styles';

const imageService = new ImageService();
const routeBase = '/dashboard/image/';
const ImageObj = {
  id: "",
  thumbnailUrl: "",
  imageUrl: "",
  title: "",
  description: "",
  location: ""
};
const useStyles = makeStyles(ImageFormStyles);

/**
 * Form for manipulating a single image
 * @param {Object} props properties to render in the component 
 */
const ImageForm = ({routeHistory, imageId}) => {
  const classes = useStyles();
  const [image, setImage] = useState(ImageObj); // Image object being displayed
  const [isValidImage, setIsValidImage] = useState(false);  // Are we creating a new image, or modifying an existing one?
  const [pageIsLoaded, setPageIsLoaded] = useState(false);  // Page loading status
  const [inputIsDisabled, setInputIsDisabled] = useState(false);  // Should input buttons be disabled?
  const [snackbarStatus, setSnackbarStatus] = useState('success');  // Status of the snackbar
  const [snackbarContent, setSnackbarContent] = useState(''); // Content of the snackbar
  const [snackbarIsOpen, setSnackBarIsOpen] = useState(false);  // Visibility state of the snackbar

  /**
   * Open the snackbar as a notification
   * @param {string} variant of the snackbar to display
   * @param {string} message to display in the snackbar
   */
  const openSnackbar = (variant, message) => {
    setSnackbarStatus(variant);
    setSnackbarContent(message);
    setSnackBarIsOpen(true);
  }

  /**
   * Update the image data when the imageId prop is modified
   */
  useEffect(() => {
    async function getImageAsync() {
      if (imageId) {
        try {
          setPageIsLoaded(false);
          setImage(await imageService.getImage(imageId));
          setIsValidImage(true);
        } catch (error) {
          setIsValidImage(false);
          routeHistory.push(routeBase);
          openSnackbar('error', error.message);
        }
      }
      setPageIsLoaded(true);
    };
    getImageAsync();
  }, [imageId, routeHistory]);

  /**
   * Delete the current image
   */
  const handleDeleteAsync = async () => {
    try {
      setInputIsDisabled(true);
      const result = await imageService.deleteImage(imageId);
      setImage(ImageObj);
      setIsValidImage(false);
      routeHistory.push(routeBase);
      openSnackbar('success', `Deleted ${result.data} image(s): ${imageId}`);
    } catch (error) {
      openSnackbar('error', error.message);
    } finally {
      setInputIsDisabled(false);
    }
  };

  /**
   * Update the image object state based on a change of a specific input field's value
   * @param {SyntheticEvent} e event triggered by user input
   */
  const handleTextFieldChange = (e) => {
    setImage({
      ...image,
      [e.target.id]: e.target.value
    });
  }

  /**
   * Update the image based on the values in the input fields
   */
  const handleUpdateAsync = async () => {
    try {
      setInputIsDisabled(true);
      const result = await imageService.updateImage(image);
      const updateCount = result.count;
      const id = result.data.id;
      setIsValidImage(true);
      openSnackbar('success', `Updated ${updateCount} image(s): ${id}`);
    } catch (error) {
      openSnackbar('error', error.message);
    } finally {
      setInputIsDisabled(false);
    }
  }

  if (pageIsLoaded) {
    return (
      <Fragment>
        <div className={classes.container}>
          <div className={classes.main}>
            <img 
              id="thumbnail" 
              className={classes.photo} 
              src={image.thumbnailUrl} 
              alt="thumbnail" />         
            <img
              id="image"
              className={classes.photo}
              src={image.imageUrl}
              alt="img" />
          </div>
          <form className={classes.details} autoComplete="off">
            <ImageFormContent 
              image={image}
              isDisabled={inputIsDisabled}
              textFieldHandler={handleTextFieldChange} />
            <div className={classes.inputButtonGroup}>
              <ImageFormActions
                imageExists={isValidImage}
                isDisabled={inputIsDisabled}
                handleDelete={handleDeleteAsync}
                handleUpdate={handleUpdateAsync} />
            </div>
          </form>
        </div>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          open={snackbarIsOpen}>
          <SnackbarContentWrapper
            className={classes.snackbarMargin}
            onClose={() => setSnackBarIsOpen(false)}
            variant={snackbarStatus}
            message={snackbarContent}/>
        </Snackbar>
      </Fragment>
    );
  } else {
    return (
      <div className={classes.progressBarContainer}>
        <LinearProgress />
      </div>
    );
  }
};

export default ImageForm;