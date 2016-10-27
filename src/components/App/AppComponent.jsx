/* @flow */

import React from 'react';
import { Match } from 'react-router';

import Header from '../../components/Header';
import Home from '../../components/Home';
import Create from '../../components/Create';

type Props = {
  teas: Array<any>,
};

export default ({ teas }: Props) => (
  <div>
    <Header />
    {console.log(teas)}
    <Match exactly pattern="/" component={Home} />
    <Match pattern="/create" component={Create} />
  </div>
);
