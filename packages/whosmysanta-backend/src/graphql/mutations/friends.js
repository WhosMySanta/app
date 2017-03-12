import {GraphQLNonNull, GraphQLString} from 'graphql';
import {FriendType} from '../types';
import {addFriend, deleteFriend, updateFriend} from '../../data/friend';

export const addFriendMutation = {
  type: FriendType,
  args: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    wish: {type: GraphQLString},
  },
  resolve: (_, args) => addFriend(args),
};

export const updateFriendMutation = {
  type: FriendType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    wish: {type: GraphQLString},
  },
  resolve: (_, args) => updateFriend(args),
};

export const deleteFriendMutation = {
  type: FriendType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLString)},
  },
  resolve: (_, args) => deleteFriend(args),
};
