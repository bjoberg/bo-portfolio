import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import GroupService from '../../services/group.service';
import Group from '../../components/group/group.component';
import GroupListPageStyles from './group-list.styles';

const groupService = new GroupService();
const useStyles = makeStyles(GroupListPageStyles);

const GroupListPage = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [groups, setGroups] = useState([{}]);
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  useEffect(() => {
    async function getGroupsAsync() {
      try {
        setPageIsLoaded(false);
        setGroups(await groupService.getGroups());
      } catch (error) {
        history.push('/error');
      } finally {
        setPageIsLoaded(true);
      }
    }
    getGroupsAsync();
  }, [history]);

  if (!pageIsLoaded) {
    return (
      <div className={classes.progressBarContainer}>
        <LinearProgress />
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
