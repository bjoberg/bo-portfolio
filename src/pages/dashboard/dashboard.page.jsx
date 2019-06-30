import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import ImageForm from '../../components/image-form/image-form.component';
import DashboardStyles from './dashboard.styles';

const useStyles = makeStyles(DashboardStyles);

const DashboardPage = (props) => {
  const classes = useStyles();
  const {
    history,
    match,
  } = props;

  return (
    <div className={classes.container}>
      <ImageForm
        routeHistory={history}
        imageId={match.params.id}
      />
    </div>
  );
};

DashboardPage.propTypes = {
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
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default DashboardPage;
