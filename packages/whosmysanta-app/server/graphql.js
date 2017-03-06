const graphqlHTTP = require('express-graphql');
const {Schema} = require('../data/schema');

export default ({app}) => {
  app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true,
  }));
};
