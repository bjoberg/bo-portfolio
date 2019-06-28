import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { Image, SnackbarContentWrapper } from '../../components';
import { ImageService } from '../../services';
import { ImageListStyles } from './image-list.styles';

const imageService = new ImageService();
const useStyles = makeStyles(ImageListStyles);

/**
 * List for displaying a group of images
 */
function ImageList() {
  const classes = useStyles();
  const [images, setImages] = useState([{}]);
  const [pageIsLoaded, setPageIsLoaded] = useState(false);  // Page loading status
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
   * Get a list of images
   */
  useEffect(() => {
    async function getImagesAsync() {
      try {
        setPageIsLoaded(false);
        setImages(await imageService.getImages());
      } catch (error) {
        openSnackbar('error', error.message);
      } finally {
        setPageIsLoaded(true);
      }
    }
    getImagesAsync();
  }, []);

  if (pageIsLoaded) {
    return (
      <Fragment>
        <div className={classes.container}>
          {images.map((image, i) => {
            return (
              <div 
                className={classes.imageItem}
                key={i} >
                <Image
                  id={image.id}
                  imageUrl={image.imageUrl}
                  title={image.title} />
              </div>
            );
          })}
        </div>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          open={snackbarIsOpen}>
          <SnackbarContentWrapper
            className={classes.snackbarMargin}
            onClose={() => setSnackBarIsOpen(false)}
            variant={snackbarStatus}
            message={snackbarContent} />
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

export default ImageList;