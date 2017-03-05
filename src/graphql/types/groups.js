import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {FriendConnectionType} from './friends';
import {getGroups} from '../../data/group';

export const GroupType = new GraphQLObjectType({
  name: 'Group',
  fields: {
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
      resolve: ({title}) => title,
    },
    description: {
      type: GraphQLString,
      resolve: ({description}) => description,
    },
    members: {
      type: FriendConnectionType,
      resolve: ({friends}) => friends,
    },
  },
});

export const GroupEdgesType = new GraphQLObjectType({
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
      resolve: args => getGroups(args),
    },
  },
});
