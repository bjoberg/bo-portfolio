import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Image from '../image/image.component';
import SnackbarContentWrapper from '../snackbar-content/snackbar-content.component';
import ImageService from '../../services/image.service';
import ImageListStyles from './image-list.styles';

const imageService = new ImageService();
const useStyles = makeStyles(ImageListStyles);

function ImageList() {
  const classes = useStyles();
  const [images, setImages] = useState([{}]);

  // Page loading status
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  // Status of the snackbar
  const [snackbarStatus, setSnackbarStatus] = useState('success');

  // Content of the snackbar
  const [snackbarContent, setSnackbarContent] = useState('');

  // Visibility state of the snackbar
  const [snackbarIsOpen, setSnackBarIsOpen] = useState(false);

  /**
   * Open the snackbar as a notification
   * @param {string} variant of the snackbar to display
   * @param {string} message to display in the snackbar
   */
  const openSnackbar = (variant, message) => {
    setSnackbarStatus(variant);
    setSnackbarContent(message);
    setSnackBarIsOpen(true);
  };

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
          {images.map(image => (
            <div
              className={classes.imageItem}
              key={image.id}
            >
              <Image
                id={image.id}
                imageUrl={image.imageUrl}
                title={image.title}
              />
            </div>
          ))}
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={snackbarIsOpen}
        >
          <SnackbarContentWrapper
            className={classes.snackbarMargin}
            onClose={() => setSnackBarIsOpen(false)}
            variant={snackbarStatus}
            message={snackbarContent}
          />
        </Snackbar>
      </Fragment>
    );
  }
  return (
    <div className={classes.progressBarContainer}>
      <LinearProgress />
    </div>
  );
}

export default ImageList;
