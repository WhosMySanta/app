import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { getGroups } from '../../data/groups';

export const GroupType = new GraphQLObjectType({
  name: 'Group',
  fields: {
    title: {
      type: GraphQLString,
      resolve: ({ title }) => title,
    },
    id: {
      type: GraphQLID,
    },
  },
});

export const GroupEdgesType = new GraphQLObjectType({
  name: 'GroupEdges',
  fields: {
    node: {
      type: GroupType,
      resolve: ({ node }) => node,
    },
  },
});

export const GroupConnectionType = new GraphQLObjectType({
  name: 'GroupConnection',
  fields: {
    edges: {
      type: new GraphQLList(GroupEdgesType),
      resolve: args => getGroups(args),
    },
  },
});
