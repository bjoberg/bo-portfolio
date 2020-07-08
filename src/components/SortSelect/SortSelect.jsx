import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';

const SortSelect = (props) => {
  const { handleChange, defaultSort, sortOptions } = props;
  const label = 'Sort';

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        onChange={handleChange}
        label={label}
        defaultValue={defaultSort.id}
      >
        {sortOptions.map(option => (
          <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SortSelect.propTypes = {
  defaultSort: PropTypes.shape({
    id: PropTypes.string,
    query: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  sortOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    query: PropTypes.string,
    value: PropTypes.string,
  })),
  handleChange: PropTypes.func,
};

SortSelect.defaultProps = {
  handleChange: () => { },
  sortOptions: [],
};

export default SortSelect;
