import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GroupService from '../../services/group.service';
import Group from '../../components/group/group.component';
import GroupListPageStyles from './group-list.styles';

const groupService = new GroupService();
const useStyles = makeStyles(GroupListPageStyles);

const GroupListPage = (props) => {
  const classes = useStyles();

  const { history } = props;

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
      history.push('/error');
    } finally {
      setPageIsLoaded(true);
    }
  }, [history]);

  /**
   * Load the group data when the page is loaded
   */
  useEffect(() => {
    const loadPageData = async () => getGroups();
    loadPageData();
  }, [getGroups]);

  if (!pageIsLoaded) {
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

GroupListPage.propTypes = {
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
};

export default GroupListPage;
