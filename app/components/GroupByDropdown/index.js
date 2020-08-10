import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import Styled from './style';

function GroupByDropdown({ groupByKey, onChnageGroupBy }) {
  const handleChange = e => {
    const {
      target: { value },
    } = e;
    onChnageGroupBy(value);
  };
  return (
    <Styled.Form>
      <InputLabel shrink id="groupby-dropdown-label">
        Group By
      </InputLabel>
      <Select
        labelId="groupby-dropdown-label"
        value={groupByKey}
        onChange={handleChange}
        displayEmpty
        autoWidth
        labelWidth={50}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="createdAt">Created On</MenuItem>
        <MenuItem value="dueDate">Pending On</MenuItem>
        <MenuItem value="priority">Priority</MenuItem>
      </Select>
    </Styled.Form>
  );
}

GroupByDropdown.propTypes = {
  groupByKey: PropTypes.string,
  onChnageGroupBy: PropTypes.func,
};

export default GroupByDropdown;
