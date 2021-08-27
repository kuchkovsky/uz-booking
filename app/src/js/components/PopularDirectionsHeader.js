import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import trainImg from '../../img/train.jpg';

const PopularDirectionsHeader = ({ hotDirections, loadHotDirections, changeFromDirection, changeToDestination }) => {

  useEffect(() => {
    loadHotDirections();
  }, []);

  return (
    <Card>
      <CardMedia
        image={trainImg}
        title="Train Station"
        style = {{ height: 0, paddingTop: '40%'}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Travel to popular destinations
        </Typography>
        <Grid container justify="space-between">
          { hotDirections.map(d => (
            <Grid item key={`${d.from.title}-${d.to.title}`}>
              <Button
                size="medium"
                color="primary"
                variant="outlined"
                onClick={() => {
                  changeFromDirection(d.from);
                  changeToDestination(d.to);
                }}
              >
                { `${d.from.title} \u27f7 ${d.to.title}`}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

PopularDirectionsHeader.propTypes = {
  hotDirections: PropTypes.array.isRequired,
  loadHotDirections: PropTypes.func.isRequired,
  changeFromDirection: PropTypes.func.isRequired,
  changeToDestination: PropTypes.func.isRequired,
};

export default PopularDirectionsHeader;
