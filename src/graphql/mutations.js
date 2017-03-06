import {GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';
import {FriendInputType, FriendType, GroupType} from './types';
import {addFriend} from '../data/friend';
import {addGroup} from '../data/group';

export const addFriendMutation = {
  type: FriendType,
  args: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    wish: {type: GraphQLString},
  },
  resolve: (_, args) => addFriend(args),
};

export const addGroupMutation = {
  type: GroupType,
  args: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: GraphQLString},
    friends: {type: new GraphQLList(FriendInputType)},
  },
  resolve: (_, args) => addGroup(args),
};

export default {addFriendMutation};
