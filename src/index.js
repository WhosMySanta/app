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
  static paramDefinitions = {
    // By setting `required` to true, `ProfileRoute` will throw if a `userID`
    // is not supplied when instantiated.
    raffleID: { required: true },
  };
  static queries = {
    raffleGroup: (Component) => Relay.QL`
      query RaffleGroupQuery {
        raffleGroup(id: $raffleID) { ${Component.getFragment('raffleGroup')} },
      }
    `,
  };
}

ReactDOM.render(
  <BrowserRouter>
    <Relay.RootContainer
      Component={App}
      route={new AppRoute({ raffleID: '123a' })}
    />
  </BrowserRouter>,
  document.getElementById('root'),
);
