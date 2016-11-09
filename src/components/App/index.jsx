/* @flow */

import React from 'react';
import { Match } from 'react-router';
import Relay from 'react-relay';

import Header from '../../components/Header';
import Home from '../../components/Home';
import Create from '../../components/Create';
import Wish from '../../components/Wish';

class AppRoute extends Relay.Route {
  static routeName = 'Home';
  static paramDefinitions = {
    // By setting `required` to true, `ProfileRoute` will throw if a `userID`
    // is not supplied when instantiated.
    groupId: { required: true },
  };
  static queries = {
    group: (Component) => Relay.QL`
      query GroupQuery {
        group(id: $groupId) { ${Component.getFragment('group')} },
      }
    `,
  };
}

export default () => (
  <div>
    <Header />
    <Match exactly pattern="/" component={Home} />
    <Match pattern="/create" component={Create} />
    <Match
      pattern="/:groupId"
      render={({ params: { groupId } }) =>
        <Relay.RootContainer
          Component={Wish}
          route={new AppRoute({ groupId })}
        />
      }
    />
  </div>
);
