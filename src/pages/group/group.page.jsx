import React, {
  Fragment, useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import httpStatus from 'http-status';
import { LinearProgress, Grid } from '@material-ui/core';

import ErrorPage from '../error/error.page';
import GroupPageActionBar from './components/group-page-action-bar/group-page-action-bar.component';
import GroupPageHeader from './components/group-page-header/group-page-header.component';
import GroupPageGrid from './components/group-page-grid/group-page-grid.component';
import GroupService from '../../services/group.service';
import ImageService from '../../services/image.service';

const groupService = new GroupService();
const imageService = new ImageService();

const GroupPage = (props) => {
  const { match, openSnackbar, isEditable } = props;

  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [pageHasError, setPageHasError] = useState(false);
  const [pageError, setPageError] = useState();
  const [groupDetails, setGroupDetails] = useState();
  const [groupImages, setGroupImages] = useState();
  const [groupSelectedImages, setGroupSelectedImages] = useState([]);

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
      const groupInfo = await groupService.getGroup(match.params.id);
      setGroupDetails(groupInfo);
    } catch (error) {
      const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const defaultStatusMessage = 'Unknown error has occured while getting group details';
      displayPageError(defaultStatusCode, defaultStatusMessage, error);
    }
  }, [match.params.id]);

  /**
   * Make request to retrieve group images
   */
  const getGroupImages = useCallback(async () => {
    try {
      const images = await imageService.getImagesForGroup(30, 0, match.params.id);
      setGroupImages(images.data);
    } catch (error) {
      const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const defaultStatusMessage = 'Unknown error has occured while getting group images';
      displayPageError(defaultStatusCode, defaultStatusMessage, error);
    }
  }, [match.params.id]);

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
  const resetSelectedImages = () => {
    setGroupSelectedImages([]);
  };

  useEffect(() => {
    const loadPageData = async () => {
      await getGroupData();
      await getGroupImages();
      setPageIsLoaded(true);
    };
    loadPageData();
  }, [getGroupData, getGroupImages]);

  if (pageHasError) {
    return (
      <ErrorPage
        title={pageError.title}
        details={pageError.details}
        actionButtonLink="/groups"
        actionButtonTitle="View all groups"
      />
    );
  }

  if (!pageIsLoaded) {
    return <LinearProgress />;
  }

  return (
    <Fragment>
      {groupSelectedImages && groupSelectedImages.length > 0 && (
        <GroupPageActionBar
          selectedItems={groupSelectedImages}
          handleClose={resetSelectedImages}
        />
      )}
      <Grid container spacing={2} direction="column">
        <Grid item>
          <GroupPageHeader
            title={groupDetails.title}
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
  openSnackbar: PropTypes.func,
  isEditable: PropTypes.bool,
};

GroupPage.defaultProps = {
  openSnackbar: () => { },
  isEditable: false,
};

export default GroupPage;
