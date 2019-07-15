import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';

import AlertDialog from '../../components/alert-dialog/alert-dialog.component';
import SnackbarContentWrapper from '../../components/snackbar-content/snackbar-content.component';
import GroupFormContent from '../../components/group-form-content/group-form-content.component';
import ImageFormContent from '../../components/image-form-content/image-form-content.component';
import ImageFormActions from '../../components/image-form-actions/image-form-actions.component';
import EntityService from '../../services/entity.service';
import EntityType from '../../utils/enums/entity-type.enum';
import EntityDetailsStyles from './entity-details.styles';

const entityService = new EntityService();
const useStyles = makeStyles(EntityDetailsStyles);

const EntityDetailsPage = (props) => {
  const classes = useStyles();
  const { entityType, history, match } = props;
  const routeId = match.params.id;
  const routeBase = `/dashboard/${entityType}`;
  const [entity, setEntity] = useState(entityService.getNewEntityObject(entityType));
  const [isValidEntity, setIsValidEntity] = useState(false);
  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [inputIsDisabled, setInputIsDisabled] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState('success');
  const [snackbarContent, setSnackbarContent] = useState('');
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
     * Perform UI logic for getting the entity
     */
    const handleGetAsync = async (type, id) => {
      try {
        setPageIsLoaded(false);
        if (routeId) {
          setEntity(await entityService.getEntityAsync(type, id));
          setIsValidEntity(true);
        }
      } catch (error) {
        openSnackbar('error', error.message);
      } finally {
        setPageIsLoaded(true);
      }
    };

    handleGetAsync(entityType, routeId);
  }, [entityType, routeId]);

  const handleDeleteAsync = async () => {
    try {
      setInputIsDisabled(true);
      await entityService.deleteEntityAsync(entityType, routeId);
      history.push(routeBase);
    } catch (error) {
      openSnackbar('error', error.message);
    }
  };

  const handleUpdateAsync = async () => {
    try {
      setInputIsDisabled(true);
      const result = await entityService.updateEntityAsync(entityType, entity);
      const updateCount = result.count;
      const { id } = result.data;
      setIsValidEntity(true);
      openSnackbar('success', `Updated ${updateCount} image(s): ${id}`);
    } catch (error) {
      openSnackbar('error', error.message);
    } finally {
      setInputIsDisabled(false);
    }
  };

  const handleCreateAsync = async () => {
    try {
      setInputIsDisabled(true);
      const result = await entityService.createEntityAsync(entityType, entity);
      history.push(`${routeBase}/${result.id}`);
    } catch (error) {
      openSnackbar('error', error.message);
    }
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
          {(() => {
            switch (entityType) {
              case EntityType.IMAGE: return (
                <ImageFormContent
                  image={entity}
                  isDisabled={inputIsDisabled}
                  textFieldHandler={handleTextFieldChange}
                />
              );
              case EntityType.GROUP: return (
                <GroupFormContent
                  group={entity}
                  isDisabled={inputIsDisabled}
                  textFieldHandler={handleTextFieldChange}
                />
              );
              default: return 'Error';
            }
          })()}
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
        title={`Delete ${entityType}`}
        body={`You are about to delete this ${entityType}. Are you sure you want to continue?`}
        handleConfirm={handleDeleteAsync}
      />
    </Fragment>
  );
};

EntityDetailsPage.propTypes = {
  entityType: PropTypes.oneOf([EntityType.IMAGE, EntityType.GROUP]).isRequired,
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
