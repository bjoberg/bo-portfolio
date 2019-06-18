import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ImageService } from '../../services';
import { ImageFormStyles } from './image-form.styles';

const imageService = new ImageService();
const useStyles = makeStyles(ImageFormStyles);

/**
 * Form for manipulating a single image
 * @param {Object} props properties to render the component 
 */
const ImageForm = ({imageId}) => {
  const [image, setImage] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(true);
  const [error, setError] = useState(undefined);
  const classes = useStyles();

  /**
   * Update the image data when the imageId prop is modified
   */
  useEffect(() => {
    async function getImage() {
      let data = await imageService.getImage(imageId);
      if (data) {
        setImage(data);
        setError(undefined);
        setHasError(false);
      } else {
        setError(`Error Loading image: ${imageId}`);
        setHasError(true);
      }
      setIsLoaded(true);
    };
    getImage();
  }, [imageId]);

  if (isLoaded && !hasError) {
    return (
      <Fragment>
        <div className={classes.container}>
          <div className={classes.main}>
            <img id="image" className={classes.photo} src={image.imageUrl} alt="img" />
            <img id="thumbnail" className={classes.photo} src={image.thumbnailUrl} alt="thumbnail" />
          </div>
          <form className={classes.details} autoComplete="off">
            <TextField id="id" label="id" value={image.id} margin="normal" variant="outlined" disabled />      
            <TextField id="thumbnail-url" label="Thumbnail url" value={image.thumbnailUrl} margin="normal" variant="outlined" />
            <TextField id="image-url" label="Image url" value={image.imageUrl} margin="normal" variant="outlined" />
            <TextField id="title" label="Title" value={image.title} margin="normal" variant="outlined" />
            <TextField id="description" label="Description" value={image.description} margin="normal" variant="outlined" multiline rows="4" />
            <TextField id="location" label="location" value={image.location} margin="normal" variant="outlined" />
          </form>
        </div>
      </Fragment>
    );
  } else if (isLoaded && hasError) {
    return (
      <div className={classes.container}>
        <p>{error}</p>
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <CircularProgress />
      </div>
    );
  }
};

export default ImageForm;