import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ImageFormStyles } from './image-form.styles';

const useStyles = makeStyles(ImageFormStyles);

function ImageForm() {
  const classes = useStyles();
  return (
    <form className={classes.container} autoComplete="off">
      <TextField id="id" label="id" value="" margin="normal" variant="outlined" disabled />      
      <TextField id="thumbnail-url" label="Thumbnail url" value="" margin="normal" variant="outlined" />
      <TextField id="image-url" label="Image url" value="" margin="normal" variant="outlined" />
      <TextField id="title" label="Title" value="" margin="normal" variant="outlined" />
      <TextField id="description" label="Description" margin="normal" variant="outlined" multiline rows="4" />
      <TextField id="location" label="location" value="" margin="normal" variant="outlined" />
      <Button variant="contained" color="secondary">
        Delete
      </Button>    
    </form>
  );
};

export default ImageForm;