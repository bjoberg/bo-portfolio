import React, { useState, useEffect, useCallback } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import httpStatus from 'http-status';

import GroupService from '../../services/group.service';
import { displayPageError } from '../utils';
import ErrorPage from '../error/error.page';
import Group from '../../components/group/group.component';
import GroupListPageStyles from './group-list.styles';

const groupService = new GroupService();
const useStyles = makeStyles(GroupListPageStyles);

const GroupListPage = () => {
  const classes = useStyles();

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
      <Grid container spacing={3}>
        {groups.map(item => (
          <Grid
            key={item.id}
            className={classes.grid}
            item
            xs={12}
            sm={6}
            md={6}
            lg={2}
            xl={2}
          >
            <Group
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GroupListPage;
