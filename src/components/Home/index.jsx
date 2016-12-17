/* @flow */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { RaisedButton } from 'material-ui';

import styles from './index.scss';
import hat from './santa-hat.svg';

const Home = () => (
  <ReactCSSTransitionGroup
    transitionName="fadeIn"
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}
    transitionAppear
    transitionLeave
    transitionAppearTimeout={500}
  >
    <section>
      <div className={styles.santaHat}>
        <img src={hat} alt="Santa's hat" />
      </div>
      <h1 className={`fancy ${styles.title}`}>
        Secret Santa
      </h1>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <div className="text-center margin-top">
        <Link to="/create">
          <RaisedButton
            backgroundColor="#F85659"
            fullWidth
            labelColor="#ffffff"
            linkButton
            label="Create a new list"
          />
        </Link>
      </div>
    </section>

    <div className={styles.footer}>
      <a href="http://www.freepik.com">Images from Freepik</a>
    </div>
  </ReactCSSTransitionGroup>
);


export default Home;
