import {GraphQLNonNull, GraphQLString} from 'graphql';
import {FriendType} from './types';
import {addFriend} from '../data/friend';

export const addFriendMutation = {
  type: FriendType,
  args: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    wish: {type: GraphQLString},
  },
  resolve: (_, args) => addFriend(args),
};

export default {addFriendMutation};
