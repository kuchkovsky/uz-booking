import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import {
  fetchStations,
  fetchHotDirections,
  changeFromDirection,
  changeToDestination,
  changeHotFromStations,
  changeHotToStations,
  fetchHotStations,
  changeDepartureDate,
  changeDepartureTime,
  fetchPredefinedDepartureDates,
  fetchPredefinedDepartureTime,
  changeCaptchaDialogOpen,
  changeCaptchaError,
  changeCaptchaCode,
  fetchTrainList,
  changePending,
  changeEmptyFieldsDialogOpen,
} from '../actions/content';
import Content from '../components/Content';
import * as contentSelectors from '../selectors/content';

const mapStateToProps = state => ({
  hotDirections: contentSelectors.getHotDirections(state),
  fromDirection: contentSelectors.getFromDirection(state),
  toDestination: contentSelectors.getToDestination(state),
  stations: contentSelectors.getStations(state),
  hotFromStations: contentSelectors.getHotFromStations(state),
  hotToStations: contentSelectors.getHotToStations(state),
  departureDate: contentSelectors.getDepartureDate(state),
  departureTime: contentSelectors.getDepartureTime(state),
  predefinedDepartureDates: contentSelectors.getPredefinedDepartureDates(state),
  predefinedDepartureTime: contentSelectors.getPredefinedDepartureTime(state),
  isCaptchaDialogOpen: contentSelectors.getCaptchaDialogOpen(state),
  isCaptchaError: contentSelectors.getCaptchaError(state),
  captchaCode: contentSelectors.getCaptchaCode(state),
  captchaHash: contentSelectors.getCaptchaHash(state),
  trainList: contentSelectors.getTrainList(state),
  isPending: contentSelectors.getPending(state),
  isEmptyFieldsDialogOpen: contentSelectors.getEmptyFieldsDialogOpen(state),
});

const mapDispatchToProps = dispatch => ({
  changeStations: query => dispatch(fetchStations(query)),
  loadHotDirections: () => dispatch(fetchHotDirections()),
  changeFromDirection: value => dispatch(changeFromDirection(value)),
  changeToDestination: value => dispatch(changeToDestination(value)),
  loadHotStations: () => {
    dispatch(fetchHotStations('from', changeHotFromStations));
    dispatch(fetchHotStations('to', changeHotToStations));
  },
  changeDepartureDate: value => dispatch(changeDepartureDate(value)),
  changeDepartureTime: value => dispatch(changeDepartureTime(value)),
  loadPredefinedDepartureDates: () => dispatch(fetchPredefinedDepartureDates()),
  loadPredefinedDepartureTime: () => dispatch(fetchPredefinedDepartureTime()),
  changeCaptchaDialogOpen: value => dispatch(changeCaptchaDialogOpen(value)),
  changeCaptchaError: value => dispatch(changeCaptchaError(value)),
  changeCaptchaCode: value => dispatch(changeCaptchaCode(value)),
  loadTrainList: () => dispatch(fetchTrainList()),
  changePending: value => dispatch(changePending(value)),
  changeEmptyFieldsDialogOpen: value => dispatch(changeEmptyFieldsDialogOpen(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withImmutablePropsToJS(Content));
