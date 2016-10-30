/* @flow */

import React from 'react';
import { Match } from 'react-router';

import Header from '../../components/Header';
import Home from '../../components/Home';
import Create from '../../components/Create';

type Props = {
  store: Array<any>, // eslint-disable-line flowtype/no-weak-types
};

export default ({ store }: Props) => (
  <div>
    <Header />
    {console.log(store.teas)}
    <Match exactly pattern="/" component={Home} />
    <Match pattern="/create" component={Create} />
  </div>
);
