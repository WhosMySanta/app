/* @flow */

import React, {Component} from 'react';
import Relay, {Mutation, Store} from 'react-relay';


type Props = {
  app: {},
};

type Event = {
  target: {
    value: string,
  },
};

type Friend = {
  id: number,
  name: string,
  email: string,
};

type State = {
  id: string,
  title: string,
  description: string,
  friends: Array<Friend>,
};

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
    return {
      id: this.props.group.id,
      title: this.props.group.title,
      description: this.props.group.description,
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

class Create extends Component {
  state: State = {
    id: 'someRandomId',
    title: '',
    description: '',
    friends: [
      {id: 0, name: '', email: ''},
      {id: 1, name: '', email: ''},
      {id: 2, name: '', email: ''},
    ],
  }

  props: Props

  handleChange = (property: string) => ({target: {value}}: Event) => {
    this.setState({[property]: value});
  }

  handleChangeFriend = ({property, id}: {property: string, id: number}) => ({target: {value}}: Event) => {
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

  handleSubmit = () => {
    const {title, description} = this.state;

    Store.commitUpdate(
      new CreateGroupMutation({
        app: this.props.app,
        group: {
          id: '',
          title,
          description,
        },
      }),
    );
  }

  // handleChangeDescription = ({target: {value}}: Event) => {
  //   this.setState({description: value});
  // }

  // handleChangeName = ({target: {value}}: Event) => {}
  // handleChangeEmail = ({target: {value}}: Event) => {}

  render() {
    const {
      handleChange,
      handleChangeFriend,
      handleSubmit,
    } = this;

    const {
      title,
      description,
      friends,
    } = this.state;

    return (
      <main>
        {console.log(friends)}
        <h1>Create</h1>
        <hr />
        <section>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleChange('title')}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={handleChange('description')}
            />
          </div>
        </section>
        <section>
          <h3>Friends</h3>
          {friends.map(({id, name, email}) => (
            <div key={id}>
              <label htmlFor={`friend-name-${id}`}>Name</label>
              <input
                type="text"
                id={`friend-name-${id}`}
                value={name}
                onChange={handleChangeFriend({property: 'name', id})}
              />

              <label htmlFor={`friend-email-${id}`}>Email</label>
              <input
                type="email"
                id={`friend-email-${id}`}
                value={email}
                onChange={handleChangeFriend({property: 'email', id})}
              />
              <hr />
            </div>
          ))}
        </section>
        <button type="button" onClick={handleSubmit}>Send</button>
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
