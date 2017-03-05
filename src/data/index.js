import {
  connect,
  Promise, // eslint-disable-line no-unused-vars
} from 'mongoose';
import {
  mongoHost,
  mongoDatabase,
  mongoUser,
  mongoPassword,
} from '../constants';

// Use node version of Promise for mongoose
Promise = global.Promise;

const host = encodeURIComponent(mongoHost);
const database = encodeURIComponent(mongoDatabase);
const user = encodeURIComponent(mongoUser);
const password = encodeURIComponent(mongoPassword);

// Connect to mlab database
export const connectDatabase = connect(
  `mongodb://${user}:${password}@${host}/${database}`,
);

export default null;
