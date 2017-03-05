import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { friends, groups } from './queries';

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    friends,
    groups,
  },
});

export default new GraphQLSchema({
  query: Root,
});
