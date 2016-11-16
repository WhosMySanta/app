/* @flow */

import React from 'react';
import Relay, { createContainer } from 'react-relay';


type Props = {
  app: {
    group: {
      title: string,
      description: string,
    },
  },
};

const Wish = (props: Props) => (
  <main>
    <h1>{props.app.group.title}</h1>

    <hr />

    <p>{props.app.group.description}</p>

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
  initialVariables: {
    groupId: null,
  },

  fragments: {
    app: () => Relay.QL`
      fragment on App {
        group(id: $groupId) {
          title,
          description,
        }
      }
    `,
    group: () => Relay.QL`
      fragment on Group {
        id,
        title,
        description,
      },
    `,
  },
});
