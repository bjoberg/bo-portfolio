import React, {
  Fragment, useState, useEffect, useCallback, useRef,
} from 'react';
import PropTypes from 'prop-types';
import httpStatus from 'http-status';
import {
  Grid, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import GroupPageStyles from './group.styles';
import GroupPageActionBar from './components/group-page-action-bar/group-page-action-bar.component';
import GroupPageHeader from './components/group-page-header/group-page-header.component';
import GroupPageGrid from './components/group-page-grid/group-page-grid.component';
import GroupPageAddImagesDialog from './components/group-page-add-images-dialog/group-page-add-images-dialog.component';
import ErrorPage from '../error/error.page';
import GroupService from '../../services/group.service';
import ImageService from '../../services/image.service';
import ActionBar from '../../components/action-bar';
import { isAtEnd, useInfiniteScroll } from '../../hooks/infinite-scroll';

const groupService = new GroupService();
const imageService = new ImageService();
const useStyles = makeStyles(GroupPageStyles);

const GroupPage = (props) => {
  const classes = useStyles();
  const {
    match, history, openSnackbar, isEditable,
  } = props;
  const limit = 30;
  const groupId = match.params.id;

  const groupImageGridRef = useRef(null);

  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [pageHasError, setPageHasError] = useState(false);
  const [pageError, setPageError] = useState();
  const [groupDetails, setGroupDetails] = useState();
  const [groupImages, setGroupImages] = useState();
  const [groupImagesPage, setGroupImagesPage] = useState(0);
  const [isEndOfGroupImages, setIsEndOfGroupImages] = useState(false);
  const [hasErrorFetchingGroupImages, setHasErrorFetchingGroupImages] = useState(false);
  const [totalGroupImages, setTotalGroupImages] = useState();
  const [groupSelectedImages, setGroupSelectedImages] = useState([]);
  const [groupActionIsPending, setGroupActionIsPending] = useState(false);
  const [addImagesDialogIsOpen, setAddImagesDialogIsOpen] = useState(false);

  /**
   * Request next page of images
   *
   * @param {boolean} isFetching status of the image request
   */
  const handlePaginateGroupImages = useCallback((isFetching) => {
    const paginateImages = async () => {
      try {
        const next = groupImagesPage + 1;
        const result = await imageService.getImagesForGroup(limit, next, groupId);
        setGroupImages(prevState => [...prevState, ...result.data]);
        setIsEndOfGroupImages(isAtEnd(result.totalItems, limit, next + 1));
        isFetching(false);
        setGroupImagesPage(next);
      } catch (error) {
        setHasErrorFetchingGroupImages(true);
        isFetching(false);
        openSnackbar('error', `${error.message} Refresh to try again.`);
      }
    };
    paginateImages();
  }, [groupId, groupImagesPage, openSnackbar]);

  const [isLoadingGroupImages] = useInfiniteScroll(handlePaginateGroupImages, isEndOfGroupImages,
    hasErrorFetchingGroupImages, groupImageGridRef);

  const resetSelectedImages = () => setGroupSelectedImages([]);
  const openAddImagesDialog = () => setAddImagesDialogIsOpen(true);
  const closeAddImagesDialog = () => setAddImagesDialogIsOpen(false);
  const handleGoBack = () => history.push('/groups');

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
      setIsEndOfGroupImages(isAtEnd(images.totalItems, limit, 1));
      setGroupImagesPage(0);
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
   * Remove the selected items from the group
   */
  const handleRemoveImages = async () => {
    try {
      setGroupActionIsPending(true);
      await imageService.deleteImagesFromGroup(groupId, groupSelectedImages);
      await getGroupImages();
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
        <ActionBar
          handleClose={() => handleGoBack()}
          elevateOnScroll
          closeButton={<ArrowBackIcon />}
          showInfo
          showAddPhoto={isEditable}
          handleAddPhoto={openAddImagesDialog}
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
      {(!pageHasError && !pageIsLoaded) && (
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
                domRef={groupImageGridRef}
                images={groupImages}
                selectedImages={groupSelectedImages}
                isEditable={isEditable}
                isLoading={isLoadingGroupImages}
                handleImageSelect={handleImageSelect}
              />
            </Grid>
          </Grid>
          <GroupPageAddImagesDialog
            groupId={groupId}
            getGroupImages={getGroupImages}
            isOpen={addImagesDialogIsOpen}
            handleClose={closeAddImagesDialog}
            isEditable={isEditable}
          />
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
