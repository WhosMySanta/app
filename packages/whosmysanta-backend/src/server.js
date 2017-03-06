import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import {connectDatabase} from './data';

const app = express();

// TODO: add authentication / authorization middleware

app.use(
  '/',
  graphqlHTTP({
    schema,
    // TODO: Make sure this really doesn't run in prod.
    // It was running in now when we first deployed.
    graphiql: process.env.NODE_ENV !== 'production',
  }),
);

app.listen(4000, (err) => {
  if (err) throw new Error(err);
  console.log('GraphQL server started'); // eslint-disable-line no-console
  connectDatabase();
  console.log('Database connected!'); // eslint-disable-line no-console
});
