import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContentWrapper } from '../index';
import { ImageService } from '../../services';
import { ImageFormStyles } from './image-form.styles';
import { Image } from '../../models';

const imageService = new ImageService();
const routeBase = '/dashboard/image/';
const useStyles = makeStyles(ImageFormStyles);

/**
 * Form for manipulating a single image
 * @param {Object} props properties to render in the component 
 */
const ImageForm = ({routeHistory, imageId}) => {
  const classes = useStyles();
  const [image, setImage] = useState(new Image()); // Image object being displayed
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
      image.reset();
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
   * Update the image object based on a change of a specific input field's value
   * @param {SyntheticEvent} e event triggered by user input
   */
  const handleUpdateImage = async (e) => {
    console.log(e);
    setImage({
      ...image,
      [e.target.id]: e.target.value
    });
  }

  /**
   * Save the image based on the values in the input fields
   */
  const handleSaveAsync = async () => {
    console.log(image);
  }

  if (pageIsLoaded) {
    return (
      <Fragment>
        <div className={classes.container}>
          <div className={classes.main}>
            <img 
              id="image" 
              className={classes.photo} 
              src={image.imageUrl} 
              alt="img" />
            <img 
              id="thumbnail" 
              className={classes.photo} 
              src={image.thumbnailUrl} 
              alt="thumbnail" />
          </div>
          <form className={classes.details} autoComplete="off">
            <TextField 
              id="id" 
              label="id" 
              value={image.id}
              margin="normal" 
              variant="outlined" 
              disabled />      
            <TextField 
              id="thumbnailUrl" 
              label="Thumbnail url" 
              value={image.thumbnailUrl}
              margin="normal" 
              variant="outlined"
              onChange={handleUpdateImage}
              disabled={inputIsDisabled} />
            <TextField 
              id="imageUrl" 
              label="Image url" 
              value={image.imageUrl} 
              margin="normal" 
              variant="outlined"
              onChange={handleUpdateImage}
              disabled={inputIsDisabled} />
            <TextField 
              id="title" 
              label="Title" 
              value={image.title} 
              margin="normal" 
              variant="outlined"
              onChange={handleUpdateImage}
              disabled={inputIsDisabled} />
            <TextField 
              id="description" 
              label="Description" 
              value={image.description} 
              margin="normal" 
              variant="outlined" 
              multiline 
              rows="4"
              onChange={handleUpdateImage}
              disabled={inputIsDisabled} />
            <TextField 
              id="location" 
              label="location" 
              value={image.location} 
              margin="normal" 
              variant="outlined"
              onChange={handleUpdateImage}
              disabled={inputIsDisabled} />
            <div className={classes.inputButtonGroup}>
              {isValidImage ? <Button
                  id="btn-delete"
                  variant="contained" 
                  color="secondary" 
                  className={classes.button} 
                  onClick={handleDeleteAsync}
                  disabled={inputIsDisabled}
                  hidden>
                  Delete
                </Button> : undefined
              }
              <Button
                id="btn-update"
                variant="contained" 
                className={classes.button}
                onClick={handleSaveAsync}
                disabled={inputIsDisabled}>
                Update
              </Button>
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