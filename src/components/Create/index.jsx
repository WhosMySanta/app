/* @flow */

import React, {Component} from 'react';
import Relay, {Mutation, Store} from 'react-relay';
import {Link} from 'react-router';

import TextField from '../TextField';


type Props = {
  app: {},
};

type Event = {
  target: {
    value: string,
  },
};

type Friend = {
  id: string,
  name: string,
  email: string,
};

type State = {
  id: string,
  title: string,
  description: string,
  friends: Array<Friend>,
  error: ?Error,
};

export type OnChangeEvent = (event: Event) => void;
type OnChangeFn = (property: string) => OnChangeEvent;
type OnChangeFriendFn = (params: {property: string, id: string}) => OnChangeEvent;

class CreateGroupMutation extends Mutation {
  static fragments = {
    app: () => Relay.QL`
      fragment on App {
        id,
      },
    `,
  }
  getMutation() {
    return Relay.QL`
      mutation { createGroup },
    `;
  }
  getVariables() {
    const {id, title, description, friends} = this.props.group;

    return {
      id,
      title,
      description,
      friends,
    };
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CreateGroupPayload {
        app {
          groups,
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

const createFriend = (id) => ({id, name: '', email: ''});

class Create extends Component {
  state: State = {
    id: 'someRandomId',
    title: '',
    description: '',
    friends: [
      createFriend('0'),
    ],
    error: null,
  }

  onChange: OnChangeFn = (property: string) => ({target: {value}}) => {
    this.setState({[property]: value});
  }

  onChangeFriend: OnChangeFriendFn = ({property, id}) => ({target: {value}}) => {
    const friends = this.state.friends
      .map((friend) =>
        friend.id !== id ?
          friend :
          ({
            ...friend,
            [property]: value,
          }),
      );
    this.setState({friends});
  }

  onSubmitFailure = (transaction) => {
    this.setState({
      error: transaction.getError() || new Error('Mutation failed.'),
    });
  }

  onSubmit = (onClick) => (event) => {
    const {app} = this.props;
    const {id, title, description, friends} = this.state;

    event.persist();

    Store.commitUpdate(
      new CreateGroupMutation({
        app,
        group: {
          id,
          title,
          description,
          friends,
        },
      }),
      {
        onFailure: this.onSubmitFailure,
        onSuccess: () => onClick(event),
      },
    );
  }

  addFriend = () => {
    const {friends} = this.state;

    this.setState({friends: [
      ...friends,
      createFriend(String(friends.length)),
    ]});
  }

  props: Props

  render() {
    const {
      addFriend,
      onChange,
      onChangeFriend,
      onSubmit,
    } = this;

    const {
      title,
      description,
      friends,
      error,
    } = this.state;

    return (
      <main>
        <h1>Create</h1>

        <hr />

        <section>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={onChange('title')}
            />
          </div>

          <div>
            <label htmlFor="title">URL (https://whosmysanta.com/group/&lt;your url here&gt;)</label>

            <input
              type="text"
              id="title"
              value={title}
              onChange={onChange('title')}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={onChange('description')}
            />
          </div>
        </section>

        <section>
          <h3>Friends</h3>
          {friends.map(({id, name, email}) => (
            <div key={id}>
              <TextField
                id={`friend-name-${id}`}
                label="Name"
                value={name}
                onChange={onChangeFriend({property: 'name', id})}
              />
              <TextField
                id={`friend-email-${id}`}
                label="Email"
                value={email}
                onChange={onChangeFriend({property: 'email', id})}
              />
              <hr />
            </div>
          ))}
          <button onClick={addFriend}>➕</button>
        </section>

        <Link to="/group/">
          {({onClick}) =>
            <button type="button" onClick={onSubmit(onClick)}>Send</button>
          }
        </Link>

        <div>{error && error.toString()}</div>
      </main>
    );
  }
}


export default Relay.createContainer(Create, {
  fragments: {
    app: () => Relay.QL`
      fragment on App {
        groups,
        ${CreateGroupMutation.getFragment('app')},
      }
    `,
  },
});
