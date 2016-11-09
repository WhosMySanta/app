/* @flow */

import React from 'react';
import { Link } from 'react-router';

export default () => (
  <header>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
    </nav>
  </header>
);
