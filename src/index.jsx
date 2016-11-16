/* @flow */

import 'normalize.css';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';

import App from './components/App';

import './styles.css';


render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);


if (module.hot && typeof module.hot.accept === 'function') {
  // Enable webpack HMR and just rerun this module
  module.hot.accept();
}
