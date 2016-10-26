/* eslint-disable react/jsx-filename-extension */

import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router';

import App from './components/App';

import './style.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
