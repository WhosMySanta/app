/* @flow */

import React, { Component } from 'react';
import Relay, { Mutation, Store } from 'react-relay';


type Props = {
  app: {},
};

type State = {
  id: string,
  title: string,
  description: string,
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
        fieldIDs: { app: this.props.app.id },
      },
    ];
  }
}

class Create extends Component {
  state: State = {
    id: 'someRandomId',
    title: '',
    description: '',
  }

  props: Props

  handleSubmit = () => {
    const { title, description } = this.state;

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

  handleChangeTitle = (event: { target: { value: string } }) => {
    this.setState({ title: event.target.value });
  }

  handleChangeDescription = (event: { target: { value: string } }) => {
    this.setState({ description: event.target.value });
  }

  render() {
    const {
      handleChangeDescription,
      handleChangeTitle,
      handleSubmit,
    } = this;
    const {
      title,
      description,
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
              onChange={handleChangeTitle}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={handleChangeDescription}
            />
          </div>
        </section>
        {/* <section>
          <h3>Friend</h3>
          {['friend-1', 'friend-2', 'friend-3', 'friend-4', 'friend-5'].map((friend) => (
            <div key={friend}>
              <label htmlFor="description">Name</label>
              <input type="text" id={`${friend}-name`} name={`${friend}-name`} />
              <label htmlFor="description">Email</label>
              <input type="email" id={`${friend}-email`} name={`${friend}-email`} />
              <hr />
            </div>
          ))}
        </section> */}
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
