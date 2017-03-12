import mongoose from 'mongoose';

const host = process.env.MONGO_HOST;
const database = encodeURIComponent(process.env.MONGO_DATABASE);
const user = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.MONGO_PASS);

// Use node version of Promise for mongoose
mongoose.Promise = global.Promise;

export default function connectDatabase() {
  // Connect to mlab database
  return mongoose.connect(`mongodb://${user}:${password}@${host}/${database}`);
}
