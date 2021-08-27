import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';

const ReduxDatePicker = ({ label, format, selectedDate, changeSelectedDate }) => (
  <KeyboardDatePicker
    inputVariant="outlined"
    label={label}
    clearable
    value={selectedDate}
    placeholder={format}
    onChange={date => changeSelectedDate(date)}
    minDate={new Date()}
    format={format}
    style={{ minWidth: 300}}
  />
);

ReduxDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  selectedDate: PropTypes.object,
  changeSelectedDate: PropTypes.func.isRequired,
}

export default ReduxDatePicker;
