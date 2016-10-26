const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { resolve } = require('path');

const app = express();

const port = process.env.PORT || 3000;

const MyGraphQLSchema = buildSchema(`
  type Query {
    me: User
    hello: String
  }
  type User {
    id: ID
    name: String
  }
`);

const rootValue = {
  hello: () => 'Hello world!',
  me: () => ({
    id: 1,
    name: 'One',
  }),
};

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  rootValue,
  graphiql: true,
}));

app.use(express.static(resolve(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../build/index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Server started 🚀!');
  }
});
