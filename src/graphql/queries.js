import { GraphQLInt, GraphQLString } from 'graphql';
import { FriendConnectionType, GroupConnectionType } from './types';

export const friends = {
  type: FriendConnectionType,
  args: {
    first: { type: GraphQLInt },
    id: { type: GraphQLString },
  },
  resolve: (_, { first, id }) => ({ first, id }),
};

export const groups = {
  type: GroupConnectionType,
  args: {
    first: { type: GraphQLInt },
    id: { type: GraphQLString },
  },
  resolve: (_, { first, id }) => ({ first, id }),
};
