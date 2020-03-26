import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import Emoji from '../../../components/Emoji';

const BodyContent = () => (
  <Grid container spacing={4}>
    <Grid item>
      <Typography variant="body1" gutterBottom>
        Heyyooo
        <Emoji symbol=" 👋🏼" label="waving hand" />
        , thanks for taking the time to visit my photography portfolio.
        My name is Brett Oberg, and in my spare time I take photos.
        I am inspired by nature and I use photography as an excuse to experience its beauty.
        Photography has helped give direction and purpose to my life, and I hope my images
        inspire you to go out and find what is special for you.
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body1" gutterBottom>
        Aside from photography, I spend my time developing software (like this website
        <Emoji symbol=" 😜" label="winking face with stuck out tongue" />
        ), cycling, golfing, playing tennis, and spending time with family.
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body1" gutterBottom>
        I hope you enjoy my work and would like to collaborate on a project or chat over coffee
        <Emoji symbol=" ☕️" label="hot beverage" />
        , please email me at brett.oberg8@gmail.com.
      </Typography>
    </Grid>
  </Grid>
);

export default BodyContent;
