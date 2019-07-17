import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import EntityGrid from '../../components/entity-grid/entity-grid.component';
import SnackbarContentWrapper from '../../components/snackbar-content/snackbar-content.component';
import ImageService from '../../services/image.service';
import GroupService from '../../services/group.service';
import EntityType from '../../utils/enums/entity-type.enum';
import EntityListStyles from './entity-list.styles';

const imageService = new ImageService();
const groupService = new GroupService();
const useStyles = makeStyles(EntityListStyles);

const EntityListPage = (props) => {
  const classes = useStyles();
  const { entityType } = props;

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

  useEffect(() => {
    /**
     * 1. Start loading the page
     * 2. Get a list of images
     * 3. Load the page
     */
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

    /**
     * 1. Start loading the page
     * 2. Get a list of groups
     * 3. Load the page
     */
    async function getGroupsAsync() {
      try {
        setPageIsLoaded(false);
        setEntityData(await groupService.getGroups());
      } catch (error) {
        openSnackbar('error', error.message);
      } finally {
        setPageIsLoaded(true);
      }
    }

    switch (entityType) {
      case EntityType.IMAGE:
        getImagesAsync();
        break;
      case EntityType.GROUP:
        getGroupsAsync();
        break;
      default:
        openSnackbar('error', `${entityType} is an invalid entityType.`);
        break;
    }
  }, [entityType]);

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
        <EntityGrid
          entityType={entityType}
          data={entityData}
        />
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
  entityType: PropTypes.oneOf([EntityType.IMAGE, EntityType.GROUP]).isRequired,
};

export default EntityListPage;
