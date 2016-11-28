/* @flow */

import React, {Component} from 'react';
import Relay, {createContainer} from 'react-relay';

import TextField from '../TextField';


type Props = {
  app: {
    group: {
      title: string,
      description: string,
    },
  },
};

type State = {
  email: string,
  wish: string,
};

// class WishMutation extends Mutation {
//   static fragments = {
//     app: () => Relay.QL`
//       fragment on App {
//         id,
//       },
//     `,
//   }
//   getMutation() {
//     return Relay.QL`
//       mutation { updateWish },
//     `;
//   }
//   getVariables() {
//     const {email, wish} = this.props.friend;
//
//     return {
//       email,
//       wish,
//     };
//   }
//   getFatQuery() {
//     return Relay.QL`
//       fragment on UpdateWishPayload {
//         app {
//           group(id: $groupId) {
//             friends,
//           }
//         }
//       },
//     `;
//   }
//   getConfigs() {
//     return [
//       {
//         type: 'FIELDS_CHANGE',
//         fieldIDs: {app: this.props.app.id},
//       },
//     ];
//   }
// }

class Wish extends Component {
  state: State = {
    email: '',
    wish: '',
  }

  props: Props
  render() {
    const {app: {group: {title, description}}} = this.props;
    const {email, wish} = this.state;

    return (
      <main>
        <h1>{title}</h1>

        <hr />

        <p>{description}</p>

        <section>
          <div>
            <TextField
              label="Email"
              type="email"
              id="email"
              value={email}
            />
            <label htmlFor="wish">What would you like?</label>
            <textarea id="wish" name="wish" placeholder="New iPhone, Home Decoration, Electronics">
              {wish}
            </textarea>
          </div>
        </section>

        <button type="button">Send</button>
      </main>
    );
  }
}

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
          friends,
        }
      }
    `,
  },
});
