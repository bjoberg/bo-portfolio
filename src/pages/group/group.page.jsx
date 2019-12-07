import React, {
  Fragment, useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import httpStatus from 'http-status';
import { Grid, makeStyles, CircularProgress } from '@material-ui/core';

import ErrorPage from '../error/error.page';
import GroupPageActionBar from './components/group-page-action-bar/group-page-action-bar.component';
import GroupPageHeader from './components/group-page-header/group-page-header.component';
import GroupPageGrid from './components/group-page-grid/group-page-grid.component';
import GroupService from '../../services/group.service';
import ImageService from '../../services/image.service';
import GroupPageStyles from './group.styles';
import GroupPageAppBar from './components/group-page-app-bar/group-page-app-bar.component';

const groupService = new GroupService();
const imageService = new ImageService();
const useStyles = makeStyles(GroupPageStyles);

const GroupPage = (props) => {
  const classes = useStyles();
  const {
    match, history, openSnackbar, isEditable,
  } = props;
  const groupId = match.params.id;

  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [pageHasError, setPageHasError] = useState(false);
  const [pageError, setPageError] = useState();
  const [groupDetails, setGroupDetails] = useState();
  const [groupImages, setGroupImages] = useState();
  const [totalGroupImages, setTotalGroupImages] = useState();
  const [groupSelectedImages, setGroupSelectedImages] = useState([]);
  const [groupActionIsPending, setGroupActionIsPending] = useState(false);

  /**
   * Evaluate error a display status to user
   *
   * @param {number|string} defaultStatusCode error status code to display if error object does not
   * have status prop
   * @param {string} defaultStatusMessage error message details to display if error object does not
   * have message prop
   * @param {any} error error that was thrown
   */
  const displayPageError = (defaultStatusCode, defaultStatusMessage, error) => {
    const { status, message } = error;
    const title = `${status}` || `${defaultStatusCode}`;
    const details = message || defaultStatusMessage;
    setPageError({ title, details });
    setPageHasError(true);
  };

  /**
   * Make request to retrieve group data
   */
  const getGroupData = useCallback(async () => {
    try {
      const groupInfo = await groupService.getGroup(groupId);
      setGroupDetails(groupInfo);
    } catch (error) {
      const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const defaultStatusMessage = 'Unknown error has occured while getting group details';
      displayPageError(defaultStatusCode, defaultStatusMessage, error);
    }
  }, [groupId]);

  /**
   * Make request to retrieve group images
   */
  const getGroupImages = useCallback(async () => {
    try {
      const images = await imageService.getImagesForGroup(30, 0, groupId);
      setGroupImages(images.data);
      setTotalGroupImages(images.totalItems);
    } catch (error) {
      const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const defaultStatusMessage = 'Unknown error has occured while getting group images';
      displayPageError(defaultStatusCode, defaultStatusMessage, error);
    }
  }, [groupId]);

  /**
   * Update the title of the group
   *
   * @param {string} title value to set the group title to
   */
  const updateGroupTitle = async (title) => {
    try {
      const data = { id: groupDetails.id, title };
      await groupService.updateGroup(data);
    } catch (error) {
      openSnackbar('error', error.message);
    }
  };

  /**
   * Add / Remove item from select image array
   *
   * @param {string} selectedImageId id of image that was selected
   */
  const handleImageSelect = (selectedImageId) => {
    const imageIsSelected = groupSelectedImages.find(el => el === selectedImageId);
    if (imageIsSelected) {
      const temp = groupSelectedImages;
      temp.splice(temp.indexOf(selectedImageId), 1);
      setGroupSelectedImages([...temp]);
    } else {
      setGroupSelectedImages([...groupSelectedImages, selectedImageId]);
    }
  };

  /**
   * Clear all of the selected images
   */
  const resetSelectedImages = () => setGroupSelectedImages([]);

  /**
   * Navigate back to the groups page
   */
  const handleGoBack = () => history.push('/groups');

  /**
   * Remove images from groupImages list
   *
   * @param {string[]} imageIds list of ids to remove from groupImages list
   */
  const removeImagesFromGroup = (imageIds) => {
    const imageIdsToRemove = imageIds;
    const tempGroupImages = groupImages;

    imageIdsToRemove.forEach((id) => {
      tempGroupImages.forEach((image, i) => {
        if (image.id === id) {
          tempGroupImages.splice(i, 1);
        }
      });
    });

    setGroupImages(tempGroupImages);
  };

  /**
   * Remove the selected items from the group
   */
  const handleRemoveImages = async () => {
    try {
      setGroupActionIsPending(true);
      const result = await imageService.deleteImagesFromGroup(groupId, groupSelectedImages);
      const { success } = result.data;
      removeImagesFromGroup(success);
      setTotalGroupImages(totalGroupImages - success.length);
    } catch (error) {
      openSnackbar('error', error.message);
    } finally {
      resetSelectedImages();
      setGroupActionIsPending(false);
    }
  };

  /**
   * Get all of the groups data
   */
  useEffect(() => {
    const loadPageData = async () => {
      await getGroupData();
      await getGroupImages();
      setPageIsLoaded(true);
    };
    loadPageData();
  }, [getGroupData, getGroupImages]);

  return (
    <div className={classes.root}>
      {groupSelectedImages && groupSelectedImages.length > 0 && (
        <GroupPageActionBar
          selectedItems={groupSelectedImages}
          groupTitle={groupDetails.title}
          handleClose={resetSelectedImages}
          handleDelete={handleRemoveImages}
          isDisabled={groupActionIsPending}
        />
      )}
      {(!groupSelectedImages || groupSelectedImages.length === 0) && (
        <GroupPageAppBar
          handleClose={handleGoBack}
          isEditable={isEditable}
        />
      )}
      {pageHasError && (
        <Fragment>
          <div className={classes.toolbar} />
          <ErrorPage
            title={pageError.title}
            details={pageError.details}
            actionButtonLink="/groups"
            actionButtonTitle="View all groups"
          />
        </Fragment>
      )}
      {!pageIsLoaded && (
        <div className={classes.progressContainer}>
          <CircularProgress />
        </div>
      )}
      {(!pageHasError && pageIsLoaded) && (
        <Fragment>
          <div className={classes.toolbar} />
          <Grid container className={classes.gridContainer} pacing={2} direction="column">
            <Grid item>
              <GroupPageHeader
                title={groupDetails.title}
                totalImages={totalGroupImages}
                isEditable={isEditable}
                handleUpdate={updateGroupTitle}
              />
            </Grid>
            <Grid item>
              <GroupPageGrid
                images={groupImages}
                selectedImages={groupSelectedImages}
                isEditable={isEditable}
                handleImageSelect={handleImageSelect}
              />
            </Grid>
          </Grid>
        </Fragment>
      )}
    </div>
  );
};

GroupPage.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
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
  openSnackbar: PropTypes.func,
  isEditable: PropTypes.bool,
};

GroupPage.defaultProps = {
  openSnackbar: () => { },
  isEditable: false,
};

export default GroupPage;
