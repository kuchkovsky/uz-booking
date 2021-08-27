import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TrainPicker from './TrainPicker';
import PopularDirectionsHeader from './PopularDirectionsHeader';
import CaptchaDialog from './CaptchaDialog';
import TrainTable from './TrainTable';
import LinearProgress from '@material-ui/core/LinearProgress';
import EmptyFieldsDialog from './EmptyFieldsDialog';

const styles = {
  content: {
    padding: 10,
    width: '100%',
    maxWidth: 1000,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paper: {
    padding: 10,
  },
  submitStatus: {
    marginTop: 10,
  },
  textHint: {
    marginTop: 6,
    marginRight: 5,
  }
};

const Content = props => {
  const { classes, ...other } = props;

  const [completed, setCompleted] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progress = React.useRef(() => {});

  React.useEffect(() => {
    progress.current = () => {
      if (completed > 100) {
        setCompleted(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setCompleted(completed + diff);
        setBuffer(completed + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    function tick() {
      progress.current();
    }
    const timer = setInterval(tick, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.content}>
      <PopularDirectionsHeader {...other}/>
      <Paper className={classes.paper}>
        <TrainPicker {...other}/>
        { other.isPending &&
          <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
        }
      </Paper>
      { other.trainList.length ? <TrainTable {...other}/> : <div/>}
      <CaptchaDialog {...other}/>
      <EmptyFieldsDialog {...other}/>
    </div>
  )
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  isPending: PropTypes.bool.isRequired,
  trainList: PropTypes.array.isRequired,
};

export default withStyles(styles)(Content);
