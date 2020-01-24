import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import httpStatus from 'http-status';

import GroupService from '../../services/group.service';
import { displayPageError } from '../utils';
import ErrorPage from '../error/error.page';
import GroupListPageStyles from './group-list.styles';
import { GroupGrid } from '../../components/group-grid';

const groupService = new GroupService();
const useStyles = makeStyles(GroupListPageStyles);

const GroupListPage = (props) => {
  const classes = useStyles();

  const { isEditable, openSnackbar } = props;

  const [pageHasError, setPageHasError] = useState(false);
  const [pageError, setPageError] = useState();
  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [groups, setGroups] = useState();

  /**
   * Make request to get group data
   */
  const getGroups = useCallback(async () => {
    try {
      setPageIsLoaded(false);
      const result = await groupService.getGroups();
      setGroups(result);
    } catch (error) {
      const defaultStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
      const defaultStatusMessage = 'Unknown error has occured while getting groups';
      displayPageError(setPageError, setPageHasError, defaultStatusCode, defaultStatusMessage,
        error);
    } finally {
      setPageIsLoaded(true);
    }
  }, []);

  const removeGroup = async (groupId) => {
    try {
      await groupService.deleteGroup(groupId);
      const temp = groups;
      const index = temp.map(group => group.id).indexOf(groupId);
      temp.splice(index, 1);
      setGroups([...temp]);
    } catch (error) {
      openSnackbar('error', error.message);
    }
  };

  /**
   * Load the group data when the page is loaded
   */
  useEffect(() => {
    const loadPageData = async () => getGroups();
    loadPageData();
  }, [getGroups]);

  if (pageHasError) {
    return (
      <ErrorPage
        title={pageError.title}
        details={pageError.details}
        actionButtonLink="/"
        actionButtonTitle="Go Home"
      />
    );
  }

  if (!pageHasError && !pageIsLoaded) {
    return (
      <div className={classes.progressBarContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <GroupGrid
        groups={groups}
        isRemovable={isEditable}
        handleRemoveOnClick={removeGroup}
      />
    </div>
  );
};

GroupListPage.propTypes = {
  isEditable: PropTypes.bool,
  openSnackbar: PropTypes.func,
};

GroupListPage.defaultProps = {
  isEditable: false,
  openSnackbar: () => { },
};

export default GroupListPage;
