import mongoose from 'mongoose';
import {
  mongoHost,
  mongoDatabase,
  mongoUser,
  mongoPassword,
} from '../constants';

// Use node version of Promise for mongoose
mongoose.Promise = global.Promise;

const host = mongoHost;
const database = encodeURIComponent(mongoDatabase);
const user = encodeURIComponent(mongoUser);
const password = encodeURIComponent(mongoPassword);

// Connect to mlab database
export const connectDatabase = () =>
  mongoose.connect(`mongodb://${user}:${password}@${host}/${database}`);

export default null;
