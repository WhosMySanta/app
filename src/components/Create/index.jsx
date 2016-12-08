/* @flow */

import kebabCase from 'lodash.kebabcase';
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
  showEditId: boolean,
};

export type OnChangeEventFn = (event: Event) => void;
type OnChangeFn = (property: string) => OnChangeEventFn;
type OnChangeFriendFn = (params: {property: string, id: string}) => OnChangeEventFn;
type OnChangeTitleFn = OnChangeEventFn;
type OnClickEditIdFn = () => void;

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
    id: '',
    title: '',
    description: '',
    friends: [
      createFriend('0'),
    ],
    error: null,
    showEditId: false,
  }

  onChange: OnChangeFn = (property) => ({target: {value}}) => {
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

  onChangeTitle: OnChangeTitleFn = ({target: {value}}) => {
    this.setState({
      id: kebabCase(value),
      title: value,
    });
  }

  onClickEditId: OnClickEditIdFn = () => {
    this.setState({
      showEditId: true,
    });
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
      onChangeTitle,
      onClickEditId,
      onSubmit,
    } = this;

    const {
      id,
      title,
      description,
      friends,
      error,
      showEditId,
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
              onChange={onChangeTitle}
            />
          </div>

          {id &&
            <p style={{fontSize: '12px'}}>
              URL: https://whosmysanta.com/group/{id}
              <span style={{float: 'right'}}>
                <button style={{padding: 0, background: 'transparent', color: 'white', cursor: 'pointer'}} onClick={onClickEditId}>
                  Change
                </button>
              </span>
            </p>
          }

          {showEditId &&
            <div>
              <label htmlFor="id">URL</label>

              <input
                type="text"
                id="id"
                value={id}
                onChange={onChange('id')}
              />
            </div>
          }

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
          {friends.map(({name, email, ...friend}) => (
            <div key={friend.id}>
              <TextField
                id={`friend-name-${friend.id}`}
                label="Name"
                value={name}
                onChange={onChangeFriend({property: 'name', id: friend.id})}
              />
              <TextField
                id={`friend-email-${friend.id}`}
                label="Email"
                value={email}
                onChange={onChangeFriend({property: 'email', id: friend.id})}
              />
              <hr />
            </div>
          ))}
          <button onClick={addFriend}>➕</button>
        </section>

        <Link to={`/group/${id}`}>
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
