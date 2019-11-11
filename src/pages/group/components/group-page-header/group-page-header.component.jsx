import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField } from '@material-ui/core';

import GroupPageHeaderStyles from './group-page-header.styles';

const useStyles = makeStyles(GroupPageHeaderStyles);

const GroupPageHeader = (props) => {
  const classes = useStyles();
  const { title, isEditable, handleUpdate } = props;

  const [groupTitle, setGroupTitle] = useState({ previous: title, current: title });

  /**
   * Update the group's title when the textfield is blurred
   */
  const handleOnBlur = () => {
    if (groupTitle.current !== groupTitle.previous) handleUpdate(groupTitle.current);
  };

  /**
   * Update the group title after textfield input
   *
   * @param {Object} e event triggered by the textfield change
   */
  const handleOnChange = (e) => {
    const { value } = e.target;
    setGroupTitle(prevState => ({
      previous: prevState.current,
      current: value,
    }));
  };

  return (
    <Fragment>
      <TextField
        fullWidth
        multiline
        value={groupTitle.current}
        disabled={!isEditable}
        onBlur={() => handleOnBlur()}
        onChange={e => handleOnChange(e)}
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
  handleUpdate: PropTypes.func,
};

GroupPageHeader.defaultProps = {
  title: '',
  isEditable: false,
  handleUpdate: () => { },
};

export default GroupPageHeader;
