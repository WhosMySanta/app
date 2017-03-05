const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const {Schema} = require('../data/schema');

mongoose.Promise = global.Promise;

export default ({app}) => {
  app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true,
  }));
  const dbUser = encodeURIComponent(process.env.DB_USER);
  const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
  mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds119220.mlab.com:19220/whosmysanta`);
  // const ObjectId = Schema.ObjectId;

  // const User = new mongoose.Schema({
  //   // author    : ObjectId,
  //   name: String,
  //   // title     : String,
  //   // body      : String,
  //   // date      : Date
  // });

  // const UserModel = mongoose.model('users', User);
  // UserModel.find({}, (err, docs) => {
  //   if (err) throw new Error(err);
  //   console.log('mongo docs', docs);
  // });
  // const user = new UserModel();
  // user.name = 'Karl';
  // user.save((err) => {
  //   if (err) throw new Error(err);
  //   console.log('saved!');
  // });
};
