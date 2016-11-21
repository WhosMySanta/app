/* @flow */

import React from 'react';
import {Match} from 'react-router';
import Relay, {RootContainer, Route} from 'react-relay';

import Header from '../../components/Header';
import Home from '../../components/Home';
import Create from '../../components/Create';
import Wish from '../../components/Wish';


class AppRoute extends Route {
  static routeName = 'AppRoute';
  static paramDefinitions = {
    groupId: {required: true},
  };
  static queries = {
    app: ({getFragment}, {groupId}) => Relay.QL`
      query {
        app { ${getFragment('app', {groupId})} },
      },
    `,
  };
}

class AppCreateRoute extends Route {
  static routeName = 'AppCreateRoute';
  static paramDefinitions = {
  };
  static queries = {
    app: (Component) => Relay.QL`
      query {
        app { ${Component.getFragment('app')} }
      }
    `,
  };
}

const App = () => (
  <div>
    <Header />
    <Match exactly pattern="/" component={Home} />
    <Match
      pattern="/create"
      render={() => (
        <RootContainer
          Component={Create}
          route={new AppCreateRoute()}
        />
      )}
    />
    <Match
      pattern="/group/:groupId"
      render={({params: {groupId}}) => (
        <RootContainer
          Component={Wish}
          route={new AppRoute({groupId})}
        />
      )}
    />
  </div>
);


export default App;
