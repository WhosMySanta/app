import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const FriendType = new GraphQLObjectType({
  name: 'Friend',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    wish: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
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
      resolve: args => args,
    },
  },
});

// For mutation that allows us to pass an object (a friend) as argument
export const FriendInputType = new GraphQLInputObjectType({
  name: 'FriendInput',
  fields: {
    name: {type: GraphQLString},
    email: {type: new GraphQLNonNull(GraphQLString)},
    wish: {type: GraphQLString},
  },
});
