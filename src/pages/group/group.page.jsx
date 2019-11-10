import React, {
  Fragment, useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';

import GroupPageHeader from './components/group-page-header/group-page-header.component';
import ErrorPage from '../error/error.page';
import GroupService from '../../services/group.service';

const groupService = new GroupService();

const GroupPage = (props) => {
  const { match, isEditable } = props;

  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [pageHasError, setPageHasError] = useState(false);
  const [groupDetails, setGroupDetails] = useState();

  const getGroupDetails = useCallback(async () => {
    try {
      const response = await groupService.getGroup(match.params.id);
      setGroupDetails(response);
      setPageIsLoaded(true);
    } catch (error) {
      setPageHasError(true);
    }
  }, [match.params.id]);

  useEffect(() => { getGroupDetails(); }, [getGroupDetails]);

  if (pageHasError) return <ErrorPage title="Error" details={`Unable to retrieve group: ${match.params.id}`} />;
  if (!pageIsLoaded) return <LinearProgress />;

  return (
    <Fragment>
      <GroupPageHeader title={groupDetails.title} isEditable={isEditable} />
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
  isEditable: PropTypes.bool,
};

GroupPage.defaultProps = {
  isEditable: false,
};

export default GroupPage;
