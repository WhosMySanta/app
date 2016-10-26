/* @flow */

import React, { Component } from 'react';
import { codes } from 'currency-codes';

class Home extends Component {
  render() {
    return (
      <main>
        <h1>Create</h1>
        <hr/>
        <section>
          <h3></h3>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" />
          </div>

          <div>
            <fieldset>
              <legend>Suggestions</legend>
              <label htmlFor="currency">Currency</label>
              <select id="currency" name="currency">
                {codes().map(code => (
                  <option
                    key={code.toLowerCase()}
                    selected={code === 'EUR'}
                    value={code.toLowerCase()}
                  >{code}</option>
                ))}
                <option value="usd">USD</option>
              </select>
              <label htmlFor="min">Minimum</label>
              <input type="number" id="min" name="min" />
              <label htmlFor="max">Maximum</label>
              <input type="number" id="max" name="max" />
            </fieldset>
          </div>
        </section>
        <section>
          <h3>Friend</h3>
          {['friend-1', 'friend-2', 'friend-3', 'friend-4', 'friend-5'].map(friend => (
            <div key={friend}>
              <label htmlFor="description">Name</label>
              <input type="text" id={`${friend}-name`} name={`${friend}-name`} />
              <label htmlFor="description">Email</label>
              <input type="email" id={`${friend}-email`} name={`${friend}-email`} />
            </div>
          ))}
        </section>
        <button type="button">Send</button>
      </main>
    );
  }
}

export default Home;
