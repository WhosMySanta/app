import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {FriendConnectionType} from './friends';

export const GroupType = new GraphQLObjectType({
  name: 'Group',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    friends: {
      type: FriendConnectionType,
    },
  },
});

const GroupEdgesType = new GraphQLObjectType({
  name: 'GroupEdges',
  fields: {
    node: {
      type: GroupType,
      resolve: group => group,
    },
  },
});

export const GroupConnectionType = new GraphQLObjectType({
  name: 'GroupConnection',
  fields: {
    edges: {
      type: new GraphQLList(GroupEdgesType),
      resolve: groups => groups,
    },
  },
});
