import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJSUtils from '@date-io/dayjs';
import App from './components/App';
import theme from './theme';
import store from './configs/redux';
import './util/db';

render((
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DayJSUtils}>
        <App/>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
