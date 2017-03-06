import {GraphQLInt, GraphQLString} from 'graphql';
import {FriendConnectionType, GroupConnectionType} from './types';
import {getFriends} from '../data/friend';
import {getGroups} from '../data/group';

export const friends = {
  type: FriendConnectionType,
  args: {
    first: {type: GraphQLInt},
    id: {type: GraphQLString},
  },
  resolve: (_, args) => getFriends(args),
};

export const groups = {
  type: GroupConnectionType,
  args: {
    first: {type: GraphQLInt},
    id: {type: GraphQLString},
  },
  resolve: (_, args) => getGroups(args),
};
