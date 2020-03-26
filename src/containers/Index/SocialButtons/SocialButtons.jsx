import React from 'react';
import { Grid } from '@material-ui/core';
import { faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import FontAwesomeIconButton from '../../../components/FontAwesomeIconButton';
import { PersonalData } from '../../../constants';

const SocialButtons = () => {
  const { social } = PersonalData;
  return (
    <Grid container>
      <Grid item>
        <FontAwesomeIconButton
          title="Instagram"
          label="instagram"
          icon={faInstagram}
          href={social.instagram}
        />
      </Grid>
      <Grid item>
        <FontAwesomeIconButton
          title="Github"
          label="github"
          icon={faGithub}
          href={social.github}
        />
      </Grid>
      <Grid item>
        <FontAwesomeIconButton
          title="LinkedIn"
          label="linkedin"
          icon={faLinkedin}
          href={social.linkedin}
        />
      </Grid>
    </Grid>
  );
};

export default SocialButtons;
