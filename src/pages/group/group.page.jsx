import React, {
  Fragment, useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';

import ErrorPage from '../error/error.page';
import GroupService from '../../services/group.service';
import GroupPageHeader from './components/group-page-header/group-page-header.component';
import GroupPageGrid from './components/group-page-grid/group-page-grid.component';
import ImageService from '../../services/image.service';

const groupService = new GroupService();
const imageService = new ImageService();

const GroupPage = (props) => {
  const { match, openSnackbar, isEditable } = props;

  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [pageHasError, setPageHasError] = useState(false);
  const [groupDetails, setGroupDetails] = useState();
  const [groupImages, setGroupImages] = useState();

  /**
   * Make request to retrieve group data
   */
  const getGroupData = useCallback(async () => {
    try {
      const groupInfo = await groupService.getGroup(match.params.id);
      // TODO: Make this better
      const images = await imageService.getImages(30, 0, match.params.id);
      setGroupDetails(groupInfo);
      setGroupImages(images.data);
      setPageIsLoaded(true);
    } catch (error) {
      setPageHasError(true);
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

  useEffect(() => { getGroupData(); }, [getGroupData]);

  if (pageHasError) return <ErrorPage title="Error" details={`Unable to retrieve group: ${match.params.id}`} />;
  if (!pageIsLoaded) return <LinearProgress />;

  return (
    <Fragment>
      <GroupPageHeader
        title={groupDetails.title}
        isEditable={isEditable}
        handleUpdate={updateGroupTitle}
      />
      <GroupPageGrid images={groupImages} />
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
