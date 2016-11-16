/* @flow */

import React from 'react';
import { Match } from 'react-router';
import Relay, { RootContainer, Route } from 'react-relay';

import Header from '../../components/Header';
import Home from '../../components/Home';
import Create from '../../components/Create';
import Wish from '../../components/Wish';


class AppRoute extends Route {
  static routeName = 'AppRoute';
  static paramDefinitions = {
    groupId: { required: true },
  };
  static queries = {
    group: ({ getFragment }) => Relay.QL`
      query {
        group(id: $groupId) { ${getFragment('group')} },
      }
    `,
  };
}

// class AppCreateRoute extends Route {
//   static routeName = 'AppCreateRoute';
//   static paramDefinitions = {
//     groupId: {  },
//   };
//   static queries = {
//     group: ({ getFragment }) => Relay.QL`
//       query {
//         group(id: $groupId) { ${getFragment('group')} },
//       }
//     `,
//   };
// }

const App = () => (
  <div>
    <Header />
    <Match exactly pattern="/" component={Home} />
    <Match exactly pattern="/create" component={Create} />
    {/* <Match
      pattern="/create"
      render={() => (
        <RootContainer
          Component={Create}
          route={new AppCreateRoute()}
        />
      )}
    />*/}
    <Match
      pattern="/group/:groupId"
      render={({ params: { groupId } }) => (
        <RootContainer
          Component={Wish}
          route={new AppRoute({ groupId })}
        />
      )}
    />
  </div>
);


export default App;
