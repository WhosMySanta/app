/* @flow */

import React, { Component } from 'react';
import Relay, { Mutation, Store } from 'react-relay';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TextField, Paper, RaisedButton } from 'material-ui';

import styles from './index.scss';
import santaHead from './santa-head.svg';
import santaBody from './santa-body.svg';

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
      <ReactCSSTransitionGroup
        transitionName="fadeIn"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
        transitionAppear
        transitionLeave
        transitionAppearTimeout={500}
      >
        <section className={styles.wrapper}>
          <div className={styles.santa}>
            <img className={styles.head} src={santaHead} alt="Santa head" />
            <img clasName={styles.body} src={santaBody} alt="Santa body" />
          </div>
          <Paper zDepth="3" style={{ padding: 20, color: 'indianRed' }}>
            <div className={styles.container}>
              <h1 className={styles.title}>Create</h1>

              <TextField
                hintText="My list"
                floatingLabelText="Title"
                floatingLabelStyle={{ top: 20 }}
                underlineFocusStyle={{ borderColor: 'indianRed' }}
                floatingLabelFocusStyle={{ color: 'indianRed' }}
                fullWidth
                value={title}
                onChange={handleChangeTitle}
              />
              <br />

              <TextField
                multiLine
                hintText="My list"
                floatingLabelText="Description"
                underlineFocusStyle={{ borderColor: 'indianRed' }}
                floatingLabelStyle={{ top: 20 }}
                floatingLabelFocusStyle={{ color: 'indianRed' }}
                fullWidth
                value={description}
                onChange={handleChangeDescription}
              />
              <br />

              <div className="text-center margin-top">
                <RaisedButton
                  label="Create a new list"
                  fullWidth
                  labelColor="indianRed"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </Paper>
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
      </ReactCSSTransitionGroup>
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
