/* @flow */

import React from 'react';
import { Match } from 'react-router';

import Header from '../../components/Header';
import Home from '../../components/Home';
import Create from '../../components/Create';

type Props = {
  hello: string,
};

export default ({ hello }: Props) => (
  <div>
    <Header />
    {console.log(hello)}
    <Match exactly pattern="/" component={Home} />
    <Match pattern="/create" component={Create} />
  </div>
);
