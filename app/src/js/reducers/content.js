import { fromJS } from 'immutable';
import * as actions from '../actions/content';

export const today = new Date();

const generateHash = () => Math.random().toString(36).substring(7);

const initialState = fromJS({
  hotDirections: [],
  fromDirection: null,
  toDestination: null,
  stations: [],
  hotFromStations: [],
  hotToStations: [],
  departureDate: today,
  departureTime: '',
  predefinedDepartureDates: [],
  predefinedDepartureTime: [],
  isCaptchaDialogOpen: false,
  isCaptchaError: false,
  captchaCode: '',
  captchaHash: undefined,
  trainList: [],
  isPending: false,
  isEmptyFieldsDialogOpen: false,
});

const contentReducer = (state = initialState, action) => {
  switch (action.type) {

  case actions.CHANGE_HOT_DIRECTIONS:
    return state.set('hotDirections', fromJS(action.payload));

  case actions.CHANGE_FROM_DIRECTION:
    return state.set('fromDirection', fromJS(action.payload));

  case actions.CHANGE_TO_DESTINATION:
    return state.set('toDestination', fromJS(action.payload));

  case actions.CHANGE_STATIONS:
    return state.set('stations', fromJS(action.payload));

  case actions.CHANGE_HOT_FROM_STATIONS:
    return state.set('hotFromStations', fromJS(action.payload));

  case actions.CHANGE_HOT_TO_STATIONS:
    return state.set('hotToStations', fromJS(action.payload));

  case actions.CHANGE_DEPARTURE_DATE:
    return state.set('departureDate', action.payload);

  case actions.CHANGE_DEPARTURE_TIME:
    return state.set('departureTime', action.payload);

  case actions.CHANGE_PREDEFINED_DEPARTURE_DATES:
    return state.set('predefinedDepartureDates', fromJS(action.payload));

  case actions.CHANGE_PREDEFINED_DEPARTURE_TIME:
    return state.set('predefinedDepartureTime', fromJS(action.payload));

  case actions.CHANGE_CAPTCHA_DIALOG_OPEN:
    return state
      .set('captchaHash', generateHash())
      .set('isCaptchaDialogOpen', action.payload);

  case actions.CHANGE_CAPTCHA_ERROR:
    return state
      .set('captchaHash', generateHash())
      .set('isCaptchaError', action.payload);

  case actions.CHANGE_CAPTCHA_CODE:
    return state.set('captchaCode', action.payload);

  case actions.CHANGE_TRAIN_LIST:
    return state.set('trainList', fromJS(action.payload));

  case actions.CHANGE_PENDING:
    return state.set('isPending', action.payload);

  case actions.CHANGE_EMPTY_FIELDS_DIALOG_OPEN:
    return state.set('isEmptyFieldsDialogOpen', action.payload);

  default:
    return state;
  }
};

export default contentReducer;
