import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Typography, Grid, IconButton, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { GroupImageStyles } from '../../../../src/styles';
import { getGroupImage } from '../../../../src/services/group';
import { useKeyPress } from '../../../../src/hooks';
import { goBack } from '../../../../src/utils/helpers';

const useStyles = makeStyles(GroupImageStyles);

const GroupImage = (props) => {
  const classes = useStyles();
  const { hasError, groupId, image } = props;
  const escPressed = useKeyPress(27);

  useEffect(() => {
    if (escPressed) goBack(`/group/${groupId}`);
  }, [escPressed, groupId]);

  if (hasError) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignContent="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <Typography className={classes.errorMessage}>
            Oops, the image you are looking for cannot be found.
          </Typography>
        </Grid>
        <Grid item>
          <Button
            component="a"
            href="/groups"
            variant="outlined"
          >
            View all Groups
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      alignItems="center"
      className={clsx(classes.root, classes.background)}
    >
      <Grid
        item
        className={clsx(classes.navIcon, classes.navIconLeft)}
      >
        <IconButton
          aria-label="back"
          className={classes.iconButton}
        >
          <ArrowBackIosIcon color="inherit" />
        </IconButton>
      </Grid>
      <Grid item>
        <img
          className={classes.image}
          src={image.imageUrl}
          alt={image.description}
        />
      </Grid>
      <Grid
        item
        className={clsx(classes.navIcon, classes.navIconRight)}
      >
        <IconButton
          aria-label="forward"
          className={classes.iconButton}
        >
          <ArrowForwardIosIcon color="inherit" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

GroupImage.propTypes = {
  hasError: PropTypes.bool,
  groupId: PropTypes.string.isRequired,
  image: PropTypes.shape({
    id: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

GroupImage.defaultProps = {
  hasError: false,
  image: undefined,
};

GroupImage.getInitialProps = async ({ query }) => {
  const { groupId, imageId } = query;
  let hasError = false;
  let image;
  try {
    image = await getGroupImage(groupId, imageId);
  } catch (error) {
    hasError = true;
  }
  return { hasError, groupId, image };
};

export default GroupImage;
