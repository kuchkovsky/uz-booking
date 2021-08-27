import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AutocompleteTextField = ({ label, value, options, changeOptions, changeValue }) => (
  <Autocomplete
    value={value}
    style={{ width: 300 }}
    getOptionSelected={(option, value) => option.title === value.title}
    getOptionLabel={(option) => option.title || ''}
    options={options}
    loading={false}
    onChange={(_, v) => changeValue(v)}
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        variant="outlined"
        onChange={e => changeOptions(e.target.value)}
        InputProps={{
          ...params.InputProps,
          onFocus: () => {
            changeValue(null);
          },
          endAdornment: (
            <React.Fragment>
              {params.InputProps.endAdornment}
            </React.Fragment>
           ),
        }}
      />
    )}
  />
);

AutocompleteTextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.object,
  options: PropTypes.array.isRequired,
  changeOptions: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
}

export default AutocompleteTextField;
