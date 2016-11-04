/* eslint-disable react/jsx-filename-extension */

import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { BrowserRouter } from 'react-router';

import App from './components/App';

import './style.css';

class AppRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    raffleGroup: Component => Relay.QL`
      query RaffleGroupQuery {
        raffleGroup { ${Component.getFragment('raffleGroup')} },
      }
    `,
  };
}

ReactDOM.render(
  <BrowserRouter>
    <Relay.RootContainer
      Component={App}
      route={new AppRoute()}
    />
  </BrowserRouter>,
  document.getElementById('root'),
);
