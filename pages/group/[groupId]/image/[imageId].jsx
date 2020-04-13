import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { GroupImageStyles } from '../../../../src/styles';
import { getGroupImage } from '../../../../src/services/group';

const useStyles = makeStyles(GroupImageStyles);

const GroupImage = (props) => {
  const classes = useStyles();
  const { hasError, image } = props;
  console.log(hasError);
  console.log(image);
  // TODO: What to display when the image does not exist within the group?
  // TODO: Need api endpoint for group/groupId/image/{imageId}
  // TODO: Modify GET requests to have previous entity and next entity
  return (
    <div className={classes.root}>
      Test
    </div>
  );
};

GroupImage.getInitialProps = async ({ query }) => {
  const { groupId, imageId } = query;
  let hasError = false;
  let image;
  try {
    image = await getGroupImage(groupId, imageId);
  } catch (error) {
    hasError = true;
  }
  return { hasError, image };
};

export default GroupImage;
