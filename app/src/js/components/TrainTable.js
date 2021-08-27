import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  date: {
    width: 220,
  },
  divider: {
    width: 220,
    marginTop: 10,
    marginBottom: 10,
  },
  waitingTime: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const TrainTable = props => {
  const classes = useStyles();

  const { trainList } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Train number</TableCell>
            <TableCell>From / To</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Departure / Arrival</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Seats available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainList.map((row) => (
            <TableRow key={`${row.departure.num}:${row.arrival.num}`}>
              <TableCell component="th" scope="row">
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      { row.departure.num }
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      { row.arrival.num }
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2" gutterBottom>
                      { row.departure.from.station }
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid item>
                      <Typography variant="body2">
                        { row.departure.to.station }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption" display="block" gutterBottom>
                        Transfer station
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" gutterBottom>
                      { row.arrival.to.station }
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container className={classes.date}>
                  <Grid container direction="row" justify="space-between">
                    <Grid item>
                      Departure
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">
                        { row.departure.from.date }
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justify="space-between">
                    <Grid item>
                      Arrival
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">
                        { row.departure.to.date }
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.divider}>
                    <Divider/>
                  </Grid>
                  <Grid container direction="row" justify="space-between">
                    <Grid item>
                      Departure
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">
                        { row.arrival.from.date }
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justify="space-between">
                    <Grid item>
                      Arrival
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">
                        { row.arrival.to.date }
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h6">
                      { row.departure.from.time }
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      { row.departure.to.time }
                    </Typography>
                  </Grid>
                  <Grid item className={classes.waitingTime}>
                    <Typography variant="caption" display="block">
                      { `Waiting time ${row.interchangeDuration}` }
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      { row.arrival.from.time }
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      { row.arrival.to.time }
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  { row.travelTime }
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" display="block">
                  No seats available
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TrainTable.propTypes = {
  trainList: PropTypes.array.isRequired,
};

export default TrainTable;
