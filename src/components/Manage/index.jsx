/* @flow */

import React from 'react';
import Relay, {createContainer} from 'react-relay';

type Friend = {
  id: number,
  name: string,
  email: string,
};

type Props = {
  app: {
    group: {
      title: string,
      description: string,
      friends: Array<Friend>,
    },
  },
};

const Manage = ({app: {group: {title, description, friends}}}: Props) =>
  <main>
    <h1>Manage</h1>
    <dl>
      <dt>Title</dt>
      <dd>{title}</dd>
      <dt>Description</dt>
      <dd>{description}</dd>
      <dt>Friends</dt>
      <dd>
        <ul>
          {friends.map(({name, email}: Friend) => (
            <li>
              Name: {name}<br />
              Email: {email}
            </li>
          ))}
        </ul>
      </dd>
      <dt>Response</dt>
      <dd>Didn't answer yet <-- don't hardcode this</dd>
    </dl>
  </main>;

export default createContainer(Manage, {
  initialVariables: {
    groupId: null,
  },

  fragments: {
    app: () => Relay.QL`
      fragment on App {
        group(id: $groupId) {
          title,
          description,
          friends {
            id,
            name,
            email,
          },
        }
      }
    `,
  },
});
