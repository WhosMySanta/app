/* @flow */

import React from 'react';
import {Link} from 'react-router';


const Header = () => (
  <header>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
    </nav>
  </header>
);


export default Header;
