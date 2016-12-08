/* eslint-disable */
/* @flow */

import React, {Component} from 'react';
import Relay, {createContainer, Mutation, Store} from 'react-relay';

import TextField from '../TextField';


type Props = {
  app: {
    group: {
      title: string,
      description: string,
      friend: {
        id: string,
        email: string,
      },
    },
  },
  groupId: string,
};

type State = {
  email: string,
  wish: string,
};

type OnChangeEmailFn = (event: {target: {value: string}}) => void;

type OnChangeWishFn = (event: {target: {value: string}}) => void;

type OnSubmitFn = () => void;

class UpdateFriendMutation extends Mutation {
  static fragments = {
    app: () => Relay.QL`
      fragment on App {
        id,
      },
    `,
  }
  getMutation() {
    return Relay.QL`
      mutation { updateFriend },
    `;
  }
  getVariables() {
    const {email, id, wish} = this.props.friend;

    return {
      groupId: this.props.groupId,
      id,
      email,
      wish,
    };
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UpdateFriendPayload {
        app {
          group (id: "${this.props.groupId}") {
            friend (hash: "${this.props.friendHash}") {
              id,
              wish,
            }
          }
        }
      },
    `;
  }
  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {app: this.props.app.id},
      },
    ];
  }
}

class Wish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.email,
      wish: props.app.group.friend.wish,
    }
  }
  state: State

  onChangeEmail: OnChangeEmailFn = ({target: {value}}) => {
    this.setState({email: value});
  }

  onChangeWish: OnChangeWishFn = ({target: {value}}) => {
    this.setState({wish: value});
  }

  onSubmit: OnSubmitFn = () => {
    const {app, app: {group: {friend: {id, email}}}, groupId} = this.props;
    const {wish} = this.state;

    Store.commitUpdate(
      new UpdateFriendMutation({
        app,
        groupId,
        friend: {
          id,
          email,
          wish,
        },
      }),
    );
  }

  props: Props

  render() {
    const {onChangeEmail, onChangeWish, onSubmit} = this;
    const {app: {group: {title, description, friend: {email}}}} = this.props;
    const {wish} = this.state;

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
              onChange={onChangeEmail}
            />
            <label htmlFor="wish">What would you like?</label>
            <textarea
              id="wish"
              name="wish"
              placeholder="New iPhone, Home Decoration, Electronics"
              value={wish}
              onChange={onChangeWish}
            />
          </div>
        </section>

        <button type="button" onClick={onSubmit}>Send</button>
      </main>
    );
  }
}

export default createContainer(Wish, {
  initialVariables: {
    groupId: null,
    friendHash: null,
  },

  fragments: {
    app: () => Relay.QL`
      fragment on App {
        group(id: $groupId) {
          title
          description
          friend (hash: $friendHash) {
            id
            email
            wish
            hash
          }
        },
        ${UpdateFriendMutation.getFragment('app')},
      }
    `,
  },
});
