import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {getFriends} from '../../data/friends';

export const FriendType = new GraphQLObjectType({
  name: 'Friend',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
      resolve: ({name}) => name,
    },
    email: {
      type: GraphQLString,
      resolve: ({email}) => email,
    },
    wish: {
      type: GraphQLString,
      resolve: ({wish}) => wish,
    },
    hash: {
      type: GraphQLString,
      resolve: ({hash}) => hash,
    },
  },
});

export const FriendEdgesType = new GraphQLObjectType({
  name: 'FriendEdges',
  fields: {
    node: {
      type: FriendType,
      resolve: friend => friend,
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
