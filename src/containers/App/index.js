/* @flow */

import React, { Component } from 'react';
import { Match } from 'react-router';

import Header from '../../components/Header';
import Home from '../../containers/Home';
import Create from '../../containers/Create';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Match exactly pattern="/" component={Home} />
        <Match pattern="/create" component={Create} />
      </div>
    );
  }
}

export default App;
