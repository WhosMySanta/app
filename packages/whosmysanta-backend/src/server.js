import express from 'express';
import graphqlHTTP from 'express-graphql';
import connectDatabase from './data';
import schema from './graphql/schema';

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

app.listen(4000, err => {
  if (err) throw new Error(err);
  /* eslint-disable no-console */
  console.log('GraphQL server started');
  connectDatabase().then(
    () => console.log('Database connected!'),
    dbErr => console.error('Failed to connect to database! Error:', dbErr),
  );
  /* eslint-enable no-console */
});
