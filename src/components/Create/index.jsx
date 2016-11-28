/* @flow */

import React, {Component} from 'react';
import Relay, {Mutation, Store} from 'react-relay';

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

  onSubmit = () => {
    const {app} = this.props;
    const {id, title, description, friends} = this.state;

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
        <button type="button" onClick={onSubmit}>Send</button>
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
