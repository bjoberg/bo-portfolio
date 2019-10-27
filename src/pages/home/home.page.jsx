import React from 'react';
import { makeStyles } from '@material-ui/core';

import Markdown from '../../components/markdown/markdown.component';
import HomePageStyles from './home.styles';
import src from '../../media/profile.png';
import content from '../../content/overview.md';

const useStyles = makeStyles(HomePageStyles);

const HomePage = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.media}>
        <img src={src} alt="brett oberg photography" className={classes.img} />
      </div>
      <div className={classes.content}>
        <Markdown content={content} />
      </div>
    </div>
  );
};

export default HomePage;
