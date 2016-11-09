/* eslint-disable global-require, no-console */

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// TODO: Probably want to run `npm run update-schema` before this.
require('./graphql').default({ app });

if (process.env.NODE_ENV !== 'production') {
  require('./config.dev').default({ app, port });
} else {
  require('./config.prod').default({ app, port });
}
