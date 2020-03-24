import React from 'react';
import { Grid } from '@material-ui/core';
import { faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import FontAwesomeIconButton from '../../../components/FontAwesomeIconButton';

const SocialButtons = () => (
  <Grid container>
    <Grid item>
      <FontAwesomeIconButton
        title="Instagram"
        label="instagram"
        icon={faInstagram}
        href="https://www.instagram.com/brett.oberg/"
      />
    </Grid>
    <Grid item>
      <FontAwesomeIconButton
        title="Github"
        label="github"
        icon={faGithub}
        href="https://github.com/bjoberg"
      />
    </Grid>
    <Grid item>
      <FontAwesomeIconButton
        title="LinkedIn"
        label="linkedin"
        icon={faLinkedin}
        href="https://www.linkedin.com/in/brettoberg/"
      />
    </Grid>
  </Grid>
);

export default SocialButtons;
