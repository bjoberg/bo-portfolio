import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import capitalizeFirstLetter from '../../utils/helpers/string.helpers';
import AlertDialog from '../../components/alert-dialog/alert-dialog.component';
import GroupFormContent from '../../components/group-form-content/group-form-content.component';
import ImageFormContent from '../../components/image-form-content/image-form-content.component';
import EntityFormActionButtons from '../../components/entity-form-action-buttons/entity-form-action-buttons.component';
import EntityService from '../../services/entity.service';
import EntityType from '../../utils/constants';
import EntityDetailsStyles from './entity-details.styles';

const entityService = new EntityService();
const useStyles = makeStyles(EntityDetailsStyles);

const EntityDetailsPage = (props) => {
  const classes = useStyles();
  const {
    entityType, history, match, openSnackbar, setTitle,
  } = props;
  const routeBase = `/dashboard/${entityType}`;
  const [entity, setEntity] = useState(entityService.getNewEntityObject(entityType));
  const [isValidEntity, setIsValidEntity] = useState(false);
  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [inputIsDisabled, setInputIsDisabled] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);

  setTitle(`${capitalizeFirstLetter(entityType)} Details: ${entity.title}`);

  useEffect(() => {
    /**
     * Perform UI logic for getting the entity
     */
    const handleGetAsync = async (type, id) => {
      try {
        setPageIsLoaded(false);
        if (id) {
          setEntity(await entityService.getEntityAsync(type, id));
          setIsValidEntity(true);
        }
        setPageIsLoaded(true);
      } catch (error) {
        setPageIsLoaded(true);
        history.push('/error');
      }
    };
    handleGetAsync(entityType, match.params.id);
  }, [history, entityType, match.params.id]);

  const handleDeleteAsync = async () => {
    try {
      setAlertIsOpen(false);
      setInputIsDisabled(true);
      const result = await entityService.deleteEntityAsync(entityType, match.params.id);
      setInputIsDisabled(false);
      setIsValidEntity(false);
      setEntity(entityService.getNewEntityObject(entityType));
      history.push(routeBase);
      openSnackbar('success', `Deleted ${result.data} ${entityType}(s): ${match.params.id}`);
    } catch (error) {
      setInputIsDisabled(false);
      openSnackbar('error', error.message);
    }
  };

  const handleUpdateAsync = async () => {
    try {
      setInputIsDisabled(true);
      const result = await entityService.updateEntityAsync(entityType, entity);
      const updateCount = result.count;
      const { id } = result.data;
      openSnackbar('success', `Updated ${updateCount} ${entityType}(s): ${id}`);
    } catch (error) {
      openSnackbar('error', error.message);
    } finally {
      setIsValidEntity(true);
      setInputIsDisabled(false);
    }
  };

  const handleCreateAsync = async () => {
    try {
      setInputIsDisabled(true);
      const result = await entityService.createEntityAsync(entityType, entity);
      setInputIsDisabled(false);
      history.push(`${routeBase}/${result.id}`);
      openSnackbar('success', `Created ${entityType}: ${result.id}`);
    } catch (error) {
      setInputIsDisabled(false);
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
            <EntityFormActionButtons
              entityExists={isValidEntity}
              isDisabled={inputIsDisabled}
              handleDelete={() => setAlertIsOpen(true)}
              handleUpdate={handleUpdateAsync}
              handleCreate={handleCreateAsync}
            />
          </div>
        </form>
      </div>
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
  openSnackbar: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default EntityDetailsPage;
