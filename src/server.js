import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';

const app = express();

// TODO: add auth middleware as an extra security layer
// eg. app.use(auth0middleware);

app.use(
  '/',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== 'production',
  }),
);

app.listen(4000, (err) => {
  if (err) {
    console.error(err); // eslint-disable-line no-console
  } else {
    console.log('GraphQL server started'); // eslint-disable-line no-console
  }
});
