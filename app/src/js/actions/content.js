import axios from 'axios';
import cheerio from 'cheerio';
import { createAction } from 'redux-actions';
import qs from 'querystring';
import dayjs from 'dayjs';
import {
  getCaptchaCode,
  getCaptchaError,
  getCaptchaDialogOpen,
  getFromDirection,
  getToDestination,
  getDepartureDate,
  getDepartureTime
} from '../selectors/content';
import {
  insertHotDirections,
  insertHotStations,
  insertTrainInterchange,
} from '../util/db';


export const CHANGE_STATIONS = 'CHANGE_STATIONS';
export const changeStations = createAction(CHANGE_STATIONS);

export const CHANGE_HOT_DIRECTIONS = 'CHANGE_HOT_DIRECTIONS';
export const changeHotDirections = createAction(CHANGE_HOT_DIRECTIONS);

export const CHANGE_FROM_DIRECTION = 'CHANGE_FROM_DIRECTION';
export const changeFromDirection = createAction(CHANGE_FROM_DIRECTION);

export const CHANGE_TO_DESTINATION = 'CHANGE_TO_DESTINATION';
export const changeToDestination = createAction(CHANGE_TO_DESTINATION);

export const CHANGE_HOT_FROM_STATIONS = 'CHANGE_HOT_FROM_STATIONS';
export const changeHotFromStations = createAction(CHANGE_HOT_FROM_STATIONS);

export const CHANGE_HOT_TO_STATIONS = 'CHANGE_HOT_TO_STATIONS';
export const changeHotToStations = createAction(CHANGE_HOT_TO_STATIONS);

export const CHANGE_DEPARTURE_DATE = 'CHANGE_DEPARTURE_DATE';
export const changeDepartureDate = createAction(CHANGE_DEPARTURE_DATE);

export const CHANGE_DEPARTURE_TIME = 'CHANGE_DEPARTURE_TIME';
export const changeDepartureTime = createAction(CHANGE_DEPARTURE_TIME);

export const CHANGE_PREDEFINED_DEPARTURE_DATES = 'CHANGE_PREDEFINED_DEPARTURE_DATES';
export const changePredefinedDepartureDates = createAction(CHANGE_PREDEFINED_DEPARTURE_DATES);

export const CHANGE_PREDEFINED_DEPARTURE_TIME = 'CHANGE_PREDEFINED_DEPARTURE_TIME';
export const changePredefinedDepartureTime = createAction(CHANGE_PREDEFINED_DEPARTURE_TIME);

export const CHANGE_CAPTCHA_DIALOG_OPEN = 'CHANGE_CAPTCHA_DIALOG_OPEN';
export const changeCaptchaDialogOpen = createAction(CHANGE_CAPTCHA_DIALOG_OPEN);

export const CHANGE_CAPTCHA_ERROR = 'CHANGE_CAPTCHA_ERROR';
export const changeCaptchaError = createAction(CHANGE_CAPTCHA_ERROR);

export const CHANGE_CAPTCHA_CODE = 'CHANGE_CAPTCHA_CODE';
export const changeCaptchaCode = createAction(CHANGE_CAPTCHA_CODE);

export const CHANGE_TRAIN_LIST = 'CHANGE_TRAIN_LIST';
export const changeTrainList = createAction(CHANGE_TRAIN_LIST);

export const CHANGE_PENDING = 'CHANGE_PENDING';
export const changePending = createAction(CHANGE_PENDING);

export const CHANGE_EMPTY_FIELDS_DIALOG_OPEN = 'CHANGE_EMPTY_FIELDS_DIALOG_OPEN';
export const changeEmptyFieldsDialogOpen = createAction(CHANGE_EMPTY_FIELDS_DIALOG_OPEN);

const cachedCheerio = new Promise(async (resolve, reject) =>
  axios.get('https://booking.uz.gov.ua/en/')
    .then(res => resolve(cheerio.load(res.data)))
    .catch(e => reject(e)));

export const fetchStations = title =>
  dispatch =>
    axios.get(`https://booking.uz.gov.ua/en/train_search/station/?term=${title}`)
      .then(res => dispatch(changeStations(res.data)));

export const fetchHotDirections = () =>
  dispatch =>
    cachedCheerio
      .then($ => {
        const hotDirections = [];
        $('.hot-direction .list > button').each((_, element) => {
          hotDirections.push({
            from: {
              title: element.childNodes[0].childNodes[0].data,
              region: null,
              value: parseInt(element.attribs['data-from-code']),
            },
            to: {
              title: element.childNodes[2].childNodes[0].data,
              region: null,
              value: parseInt(element.attribs['data-to-code']),
            },
          })
        });
        insertHotDirections(hotDirections);
        dispatch(changeHotDirections(hotDirections));
      });
    
export const fetchHotStations = (type, action) =>
  dispatch =>
    cachedCheerio
      .then($ => {
        const stations = [];
        $(`.hot-stations.${type} > a`).each((_, element) => {
          stations.push({
            title: element.children[0].data,
            region: null,
            value: parseInt(element.attribs['data-code'])
          })
        });
        insertHotStations(stations, type);
        dispatch(action(stations));
      });

export const fetchPredefinedDepartureDates = () =>
  dispatch =>
    cachedCheerio
      .then($ => {
        const departureDates = [];
        $(`.opt .date .link > a`).each((_, element) => {
          departureDates.push({
            title: element.children[0].data,
            value: parseInt(element.attribs['data-delta'])
           })
        });
        dispatch(changePredefinedDepartureDates(departureDates));
      });

export const fetchPredefinedDepartureTime = () =>
  dispatch =>
    cachedCheerio
      .then($ => {
        const departureTime = [];
        $('.search-block .time select > option').each((_, element) => {
          departureTime.push({
            title: element.children[0].data,
            value: element.attribs.value
          })
        });
        dispatch(changePredefinedDepartureTime(departureTime));
        dispatch(changeDepartureTime(departureTime[0].value));
      });

export const fetchTrainList = () =>
  (dispatch, getState) => {
    const state = getState();

    const fromDirection = getFromDirection(state);
    const toDestination = getToDestination(state);

    if (!fromDirection || !toDestination) {
      dispatch(changeEmptyFieldsDialogOpen(true));
      return;
    }

    dispatch(changeCaptchaDialogOpen(false));
    dispatch(changePending(true));

    const captchaDialogOpen = getCaptchaDialogOpen(state);
    const captchaCode = getCaptchaCode(state);
    const captchaError = getCaptchaError(state);

    const captcha = captchaCode ? { get_tpl: 1, captcha: captchaCode } : undefined;

    const data = {
      from: fromDirection.toJS().value,
      to: toDestination.toJS().value,
      date: dayjs(getDepartureDate(state)).format('YYYY-MM-DD'),
      time: getDepartureTime(state),
      ...captcha
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    axios.post('https://booking.uz.gov.ua/en/train_interchange/', qs.stringify(data), config)
      .then(res => {
        dispatch(changePending(false));
        const data = res.data;
        if (data.error === 1 && data.captcha === 'booking' && !data.data) {
          dispatch(changeCaptchaDialogOpen(true));
        } else if ((data.error === 1 && data.captcha === 'booking' && data.data)) {
          dispatch(changeCaptchaDialogOpen(true));
          dispatch(changeCaptchaError(true));
          dispatch(changeCaptchaCode(''));
        } else {
          if (captchaDialogOpen) {
            dispatch(changeCaptchaDialogOpen(false));
          }
          if (captchaError) {
            dispatch(changeCaptchaError(false));
          }
          if (captchaCode) {
            dispatch(changeCaptchaCode(''));
          }
          const list = data.data.list;
          insertTrainInterchange(list)
          dispatch(changeTrainList(list));
          window.scrollTo({
            top: 470,
            behavior: 'smooth'
          });
        }
      })
      .catch(e => {
        dispatch(changePending(false));
        console.error(e);
      });
  };
