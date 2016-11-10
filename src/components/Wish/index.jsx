/* @flow */

import React from 'react';
import Relay, { createContainer } from 'react-relay';


type Props = {
  groupId: string,
};

const Wish = ({ groupId }: Props) => (
  <main>
    <h1>{groupId}</h1>

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


export default createContainer(Wish, {
  fragments: {
    group: () => Relay.QL`
      fragment on Group {
        id,
        title,
        description,
      },
    `,
  },
});
