import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField } from '@material-ui/core';

import GroupPageHeaderStyles from './group-page-header.styles';

const useStyles = makeStyles(GroupPageHeaderStyles);

const GroupPageHeader = (props) => {
  const classes = useStyles();
  const { title, isEditable } = props;

  return (
    <Fragment>
      <TextField
        fullWidth
        multiline
        defaultValue={title}
        disabled={!isEditable}
        InputProps={{
          disableUnderline: !isEditable,
          classes: {
            disabled: classes.textField,
            input: classes.textField,
          },
        }}
      />
    </Fragment>
  );
};

GroupPageHeader.propTypes = {
  title: PropTypes.string,
  isEditable: PropTypes.bool,
};

GroupPageHeader.defaultProps = {
  title: '',
  isEditable: false,
};

export default GroupPageHeader;
