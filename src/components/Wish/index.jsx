/* @flow */

import React from 'react';
import Relay from 'react-relay';

const Wish = () => (
  <main>
    <h1>Enter your wish</h1>

    <hr />

    <section>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div>
        <label htmlFor="wish">What would you like?</label>
        <textarea id="wish" name="wish" placeholder="New iPhone, Home Decoration, Electronics" />
      </div>
    </section>

    <button type="button">Send</button>
  </main>
);

export default Relay.createContainer(Wish, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        title,
        description,
        suggestions {
          currency,
          minLimit,
          maxLimit,
        }
      },
    `,
  },
});
