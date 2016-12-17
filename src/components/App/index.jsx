/* @flow */

import React from 'react';
import { Match } from 'react-router';
import Relay, { RootContainer, Route } from 'react-relay';

import Header from '../../components/Header';
import Home from '../../components/Home';
import Create from '../../components/Create';
import Wish from '../../components/Wish';

import styles from './index.scss';

class AppRoute extends Route {
  static routeName = 'AppRoute';
  static paramDefinitions = {
    groupId: { required: true },
  };
  static queries = {
    app: ({ getFragment }, { groupId }) => Relay.QL`
      query {
        app { ${getFragment('app', { groupId })} },
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

export default class App extends React.Component {
  state = {
    loaded: false,
  };

  componentWillMount() {
    this.setState({
      showIntro: true,
      loaded: true,
    });

    setTimeout(() => {
      this.setState({
        showIntro: false,
      });
    }, 3000);
  }

  render() {
    const { showIntro, loaded } = this.state;

    return (
      <div>
        {
          showIntro &&
            <div className={styles.present}>
              <div className={styles.background} />
              <span className={styles.ribbon} />
              <span className={styles.ribbon} />
            </div>
        }

        <Header />
        <div className={`container ${styles.container} ${styles[loaded ? 'done' : 'loading']}`}>
          <main>
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
              render={({ params: { groupId } }) => (
                <RootContainer
                  Component={Wish}
                  route={new AppRoute({ groupId })}
                />
              )}
            />
          </main>
        </div>
      </div>
    );
  }
}
