export const getHotDirections = state => state.getIn(['content', 'hotDirections']);

export const getStations = state => state.getIn(['content', 'stations']);

export const getFromDirection = state => state.getIn(['content', 'fromDirection']);

export const getToDestination = state => state.getIn(['content', 'toDestination']);

export const getHotFromStations = state => state.getIn(['content', 'hotFromStations']);

export const getHotToStations = state => state.getIn(['content', 'hotToStations']);

export const getDepartureDate = state => state.getIn(['content', 'departureDate']);

export const getDepartureTime = state => state.getIn(['content', 'departureTime']);

export const getPredefinedDepartureDates = state => state.getIn(['content', 'predefinedDepartureDates']);

export const getPredefinedDepartureTime = state => state.getIn(['content', 'predefinedDepartureTime']);

export const getCaptchaDialogOpen = state => state.getIn(['content', 'isCaptchaDialogOpen']);

export const getCaptchaError = state => state.getIn(['content', 'isCaptchaError']);

export const getCaptchaCode = state => state.getIn(['content', 'captchaCode']);

export const getCaptchaHash = state => state.getIn(['content', 'captchaHash']);

export const getTrainList = state => state.getIn(['content', 'trainList']);

export const getPending = state => state.getIn(['content', 'isPending']);

export const getEmptyFieldsDialogOpen = state => state.getIn(['content', 'isEmptyFieldsDialogOpen']);
