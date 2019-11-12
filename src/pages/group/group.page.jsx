import React, {
  Fragment, useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';

import ErrorPage from '../error/error.page';
import GroupService from '../../services/group.service';
import GroupPageHeader from './components/group-page-header/group-page-header.component';
import GroupPageImageList from './components/group-page-grid/group-page-grid.component';

const groupService = new GroupService();

const GroupPage = (props) => {
  const { match, openSnackbar, isEditable } = props;

  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [pageHasError, setPageHasError] = useState(false);
  const [groupDetails, setGroupDetails] = useState({});

  /**
   * Make request to retrieve group details
   */
  const getGroupDetails = useCallback(async () => {
    try {
      const response = await groupService.getGroup(match.params.id);
      setGroupDetails(response);
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

  useEffect(() => {
    getGroupDetails();
  }, [getGroupDetails]);

  if (pageHasError) {
    return (
      <ErrorPage
        title="Unable to retrieve group"
        details="The group that was requested has been removed or does not exist."
        actionButtonLink="/groups"
        actionButtonTitle="View all groups"
      />
    );
  }
  if (!pageIsLoaded) return <LinearProgress />;

  return (
    <Fragment>
      <GroupPageHeader
        title={groupDetails.title}
        isEditable={isEditable}
        handleUpdate={updateGroupTitle}
      />
      <GroupPageImageList />
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
