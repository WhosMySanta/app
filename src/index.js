/* eslint-disable react/jsx-filename-extension */

import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { BrowserRouter, Match } from 'react-router';

import App from './components/App';

import './style.css';

class AppRoute extends Relay.Route {
  static routeName = 'Home';
  static paramDefinitions = {
    // By setting `required` to true, `ProfileRoute` will throw if a `userID`
    // is not supplied when instantiated.
    raffleId: { required: true },
  };
  static queries = {
    raffleGroup: (Component) => Relay.QL`
      query RaffleGroupQuery {
        raffleGroup(id: $raffleId) { ${Component.getFragment('raffleGroup')} },
      }
    `,
  };
}

ReactDOM.render(
  <BrowserRouter>
    <Match
      pattern="/raffle/:raffleId"
      render={({ params: { raffleId } }) =>
        <Relay.RootContainer
          Component={App}
          route={new AppRoute({ raffleId })}
        />
      }
    />
  </BrowserRouter>,
  document.getElementById('root'),
);
