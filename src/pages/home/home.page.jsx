import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

import HomePageStyles from './home.styles.js';

const useStyles = makeStyles(HomePageStyles);

const HomePage = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.media} />
      <div className={classes.content}>
        <Typography variant="h3">Software Engineer. Photographer. Outdoor Enthusiast.</Typography>
        <Typography variant="body1">Heyyooo 👋🏼, thanks for taking the time to visit my photography portfolio. My name is Brett Oberg, and in my spare time I take photos. I am inspired by nature and I use photography as an excuse to experience its beauty. Photography has helped give direction and purpose to my life, and I hope my images inspire you to go out and find what is special for you.</Typography>
        <Typography variant="body1">Aside from photography, I spend my time developing software (like this website 😜), cycling, golfing, playing tennis, and spening time with family.</Typography>
        <Typography variant="body1">I hope you enjoy my work and, please, if you would like to collaborate on a project or chat over coffee ☕️, please email me at [brett.oberg8@gmail.com](mailto:brett.oberg8@gmail.com).</Typography>
      </div>
    </div>
  );
};

export default HomePage;
