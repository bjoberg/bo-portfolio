import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ImageForm } from '../../components';
import DashboardStyles from './dashboard.styles';

const useStyles = makeStyles(DashboardStyles);

/**
 * Page for interacting with portfolio data
 * @param {Object} props properties to render the page
 */
function DashboardPage({history, match}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ImageForm 
        routeHistory={history}
        imageId={match.params.id} />
    </div>
  );
};

export default DashboardPage;