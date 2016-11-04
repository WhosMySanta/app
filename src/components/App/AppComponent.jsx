/* @flow */

import React from 'react';
import { Match } from 'react-router';

import Header from '../../components/Header';
import Home from '../../components/Home';
import Create from '../../components/Create';

type Props = {
  raffleGroup: {
    title: string,
    description: string,
    suggestions: {
      currency: string,
      minLimit: number,
      maxLimit: number,
    },
  },
};

export default ({ raffleGroup }: Props) => (
  <div>
    <Header />
    {raffleGroup.title}
    <Match exactly pattern="/" component={Home} />
    <Match pattern="/create" component={Create} />
  </div>
);
