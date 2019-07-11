import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import AlertDialog from '../../components/alert-dialog/alert-dialog.component';
import SnackbarContentWrapper from '../../components/snackbar-content/snackbar-content.component';
import ImageFormContent from '../../components/image-form-content/image-form-content.component';
import ImageFormActions from '../../components/image-form-actions/image-form-actions.component';
import ImageService from '../../services/image.service';
import GroupService from '../../services/group.service';
import EntityDetailsStyles from './entity-details.styles';

const imageService = new ImageService();
const groupService = new GroupService();
const useStyles = makeStyles(EntityDetailsStyles);
const ImageObj = {
  id: '',
  thumbnailUrl: '',
  imageUrl: '',
  title: '',
  description: '',
  location: '',
};

const EntityDetailsPage = (props) => {
  const classes = useStyles();
  const { entityType, history, match } = props;
  const routeId = match.params.id;

  // Image object being displayed
  const [entity, setEntity] = useState(ImageObj);

  // Are we creating a new image, or modifying an existing one?
  const [isValidEntity, setIsValidEntity] = useState(false);

  // Page loading status
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  // Should input buttons be disabled?
  const [inputIsDisabled, setInputIsDisabled] = useState(false);

  // Visibility state of the alert dialog
  const [alertIsOpen, setAlertIsOpen] = useState(false);

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
    async function getImageAsync() {
      try {
        setPageIsLoaded(false);
        setEntity(await imageService.getImage(routeId));
      } catch (error) {
        openSnackbar('error', error.message);
      } finally {
        setPageIsLoaded(true);
      }
    }

    async function getGroupAsync() {
      try {
        setPageIsLoaded(false);
        setEntity(await groupService.getGroup(routeId));
      } catch (error) {
        openSnackbar('error', error.message);
      } finally {
        setPageIsLoaded(true);
      }
    }

    if (entityType === 'image') {
      getImageAsync();
    } else if (entityType === 'group') {
      getGroupAsync();
    } else {
      openSnackbar('error', `${entityType} is an invalid entityType.`);
    }
  }, [entityType]);

  const handleDeleteAsync = async () => {
    console.log('deleting...');
  };

  const handleUpdateAsync = async () => {
    console.log('updating...');
  };

  const handleCreateAsync = async () => {
    console.log('creating...');
  };

  const handleTextFieldChange = (e) => {
    setEntity({
      ...entity,
      [e.target.id]: e.target.value,
    });
  };

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
        <div className={classes.main}>
          <img
            id="thumbnail"
            className={classes.photo}
            src={entity.thumbnailUrl}
            alt="thumbnail"
          />
          <img
            id="image"
            className={classes.photo}
            src={entity.imageUrl}
            alt="img"
          />
        </div>
        <form className={classes.details} autoComplete="off">
          <ImageFormContent
            image={entity}
            isDisabled={inputIsDisabled}
            textFieldHandler={handleTextFieldChange}
          />
          <div className={classes.inputButtonGroup}>
            <ImageFormActions
              imageExists={isValidEntity}
              isDisabled={inputIsDisabled}
              handleDelete={() => setAlertIsOpen(true)}
              handleUpdate={handleUpdateAsync}
              handleCreate={handleCreateAsync}
            />
          </div>
        </form>
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
      <AlertDialog
        isOpen={alertIsOpen}
        handleClose={() => setAlertIsOpen(false)}
        title="Delete Image"
        body="You are about to delete this entity. Are you sure you want to continue?"
        handleConfirm={handleDeleteAsync}
      />
    </Fragment>
  );


  // TODO: Make network request for entity details

  // This page should build the form
  // Create form container
  // Left side is for imageUrl and thumbnailUrl
  // Right side is for content
  // Botton of right side is for action buttons
  // return (
  //   <div className={classes.container}>
  //     <ImageForm
  //       routeHistory={history}
  //       imageId={match.params.id}
  //     />
  //   </div>
  // );
};

EntityDetailsPage.propTypes = {
  entityType: PropTypes.oneOf(['image', 'group']).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.string,
      key: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default EntityDetailsPage;
