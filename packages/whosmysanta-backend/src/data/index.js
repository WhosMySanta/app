import mongoose from 'mongoose';
import {mongoHost, mongoDatabase, mongoUser, mongoPassword} from '../constants';

const host = mongoHost;
const database = encodeURIComponent(mongoDatabase);
const user = encodeURIComponent(mongoUser);
const password = encodeURIComponent(mongoPassword);

export const connectDatabase = () => {
  // Use node version of Promise for mongoose
  mongoose.Promise = global.Promise;

  // Connect to mlab database
  return mongoose.connect(`mongodb://${user}:${password}@${host}/${database}`);
};

export default null;
