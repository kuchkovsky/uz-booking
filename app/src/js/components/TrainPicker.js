import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import AutocompleteTextField from './AutocompleteTextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import LinkButton from './shared/LinkButton';
import ReduxDatePicker from './shared/ReduxDatePicker';
import { today } from '../reducers/content';
import ReduxDropdown from './shared/ReduxDropdown';
import Button from '@material-ui/core/Button';

const styles = {
  paddedRow: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchButton: {
    padding: 15,
    width: 200,
  },
};

const TrainPicker = ({
  classes,
  stations,
  hotFromStations,
  hotToStations,
  loadHotStations,
  fromDirection,
  toDestination,
  changeStations,
  changeFromDirection,
  changeToDestination,
  departureDate,
  departureTime,
  changeDepartureDate,
  changeDepartureTime,
  predefinedDepartureDates,
  predefinedDepartureTime,
  loadPredefinedDepartureDates,
  loadPredefinedDepartureTime,
  loadTrainList,
}) => {

  useEffect(() => {
    loadHotStations();
    loadPredefinedDepartureDates();
    loadPredefinedDepartureTime();
  }, []);

  return (
    <Grid container direction="row" justify="space-between">
      <Grid item xs={6}>
        <Grid item>
          <Grid item>
            <AutocompleteTextField
              label="From"
              value={fromDirection}
              options={stations}
              changeOptions={changeStations}
              changeValue={changeFromDirection}
            />
          </Grid>
          <Grid item>
            {
              hotFromStations.map(s => (
                <LinkButton key={s.title} text={s.title} onClick={() => changeFromDirection(s) }/>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid item>
          <Grid item>
            <AutocompleteTextField
              label="To"
              value={toDestination}
              options={stations}
              changeOptions={changeStations}
              changeValue={changeToDestination}
            />
          </Grid>
          <Grid item>
            {
              hotToStations.map(s => (
                <LinkButton key={s.title} text={s.title} onClick={() => changeToDestination(s) }/>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.paddedRow}>
        <Grid item>
          <Grid item>
            <ReduxDatePicker
              className={classes.datePicker}
              label="Departure date"
              format="DD.MM.YYYY"
              selectedDate={departureDate}
              changeSelectedDate={changeDepartureDate}
            />
          </Grid>
          <Grid item>
            {
              predefinedDepartureDates.map(s => (
                <LinkButton
                  key={s.title}
                  text={s.title}
                  onClick={() => changeDepartureDate(dayjs(today).add(s.value, 'day').toDate()) }
                />
              ))
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.paddedRow}>
        <Button
         size="large"
         color="primary"
         variant="contained"
         className={classes.searchButton}
         onClick={() => loadTrainList()}
         >
           Search for trains
         </Button>
      </Grid>
      <Grid item className={classes.paddedRow}>
        <ReduxDropdown
          label="Departure time from"
          labelWidth={200}
          selectedOption={departureTime}
          options={predefinedDepartureTime}
          changeSelectedOption={changeDepartureTime}
        />
      </Grid>
    </Grid>
  );
};

TrainPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  changeStations: PropTypes.func.isRequired,
  changeFromDirection: PropTypes.func.isRequired,
  changeToDestination: PropTypes.func.isRequired,
  fromDirection: PropTypes.object,
  toDestination: PropTypes.object,
  stations: PropTypes.array.isRequired,
  hotFromStations: PropTypes.array.isRequired,
  hotToStations: PropTypes.array.isRequired,
  loadHotStations: PropTypes.func.isRequired,
  departureDate: PropTypes.object,
  departureTime: PropTypes.string.isRequired,
  changeDepartureDate: PropTypes.func.isRequired,
  changeDepartureTime: PropTypes.func.isRequired,
  predefinedDepartureDates: PropTypes.array.isRequired,
  predefinedDepartureTime: PropTypes.array.isRequired,
  loadPredefinedDepartureDates: PropTypes.func.isRequired,
  loadPredefinedDepartureTime: PropTypes.func.isRequired,
  loadTrainList: PropTypes.func.isRequired,
};

export default withStyles(styles)(TrainPicker);
