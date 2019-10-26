import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';


import HomePageStyles from './home.styles';
import src from '../../media/IMG_2623.png';
import content from '../../content/overview.md';
import Markdown from '../../components/markdown/markdown.component';

const useStyles = makeStyles(HomePageStyles);

const HomePage = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.media}>
        <img src={src} alt="test" className={classes.img} />
      </div>
      <div className={classes.content}>
        <Markdown content={content} />
      </div>
    </div>
  );
};

export default HomePage;
