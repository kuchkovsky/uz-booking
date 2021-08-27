import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ReduxDropdown = ({ label, labelWidth, selectedOption, options, changeSelectedOption }) => (
  <FormControl variant="outlined" style={{ minWidth: 300}}> 
    <InputLabel width={labelWidth}>{label}</InputLabel>
    <Select
      value={selectedOption}
      onChange={e => changeSelectedOption(e.target.value)}
      label={label}
    >
      { options.map(o => <MenuItem key={o.value} value={o.value}>{o.title}</MenuItem>)}
    </Select>
  </FormControl>
);

ReduxDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  labelWidth: PropTypes.number.isRequired,
  selectedOption: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  changeSelectedOption: PropTypes.func.isRequired,
}

export default ReduxDropdown;
