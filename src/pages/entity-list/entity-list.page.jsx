import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import EntityList from '../../components/entity-list/entity-list.component';
import SnackbarContentWrapper from '../../components/snackbar-content/snackbar-content.component';
import ImageService from '../../services/image.service';
import EntityListStyles from './entity-list.styles';

const imageService = new ImageService();
const useStyles = makeStyles(EntityListStyles);

const EntityListPage = (props) => {
  const classes = useStyles();
  const { type } = props;

  // Entity data to be displayed
  const [entityData, setEntityData] = useState([{}]);

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
        setEntityData(await imageService.getImages());
      } catch (error) {
        openSnackbar('error', error.message);
      } finally {
        setPageIsLoaded(true);
      }
    }
    if (type === 'image') {
      getImagesAsync();
    }
  }, [type]);

  if (!pageIsLoaded) {
    return (
      <div className={classes.progressBarContainer}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.container}>
        <EntityList type={type} data={entityData} />
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
};

EntityListPage.propTypes = {
  type: PropTypes.oneOf(['image', 'group']).isRequired,
};

export default EntityListPage;
