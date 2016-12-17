/* @flow */

import 'normalize.css';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';

import './styles.scss';

injectTapEventPlugin();

render(
  <BrowserRouter>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);


if (module.hot && typeof module.hot.accept === 'function') {
  // Enable webpack HMR and just rerun this module
  module.hot.accept();
}
