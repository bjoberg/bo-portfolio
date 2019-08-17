import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import capitalizeFirstLetter from '../../utils/helpers/string.helpers';
import EntityGrid from '../../components/entity-grid/entity-grid.component';
import ImageService from '../../services/image.service';
import GroupService from '../../services/group.service';
import EntityType from '../../utils/constants';
import EntityListStyles from './entity-list.styles';

const imageService = new ImageService();
const groupService = new GroupService();
const useStyles = makeStyles(EntityListStyles);

const EntityListPage = (props) => {
  const classes = useStyles();
  const { entityType, history, setTitle } = props;
  const [entityData, setEntityData] = useState([{}]);
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  setTitle(`${capitalizeFirstLetter(entityType)}s`);

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
        history.push('/error');
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
        history.push('/error');
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
        history.push('/error');
        break;
    }
  }, [history, entityType]);

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
    </Fragment>
  );
};

EntityListPage.propTypes = {
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
  setTitle: PropTypes.func.isRequired,
};

export default EntityListPage;
