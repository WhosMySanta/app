import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { getFriends } from '../../data/friends';

export const FriendType = new GraphQLObjectType({
  name: 'Friend',
  fields: {
    name: {
      type: GraphQLString,
      resolve: ({ name }) => name,
    },
    id: {
      type: GraphQLID,
    },
  },
});

export const FriendEdgesType = new GraphQLObjectType({
  name: 'FriendEdges',
  fields: {
    node: {
      type: FriendType,
      resolve: ({ node }) => node,
    },
  },
});

export const FriendConnectionType = new GraphQLObjectType({
  name: 'FriendConnection',
  fields: {
    edges: {
      type: new GraphQLList(FriendEdgesType),
      resolve: args => getFriends(args),
    },
  },
});
