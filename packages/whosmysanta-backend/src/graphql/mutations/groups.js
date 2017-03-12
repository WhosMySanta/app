import {GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';
import {FriendInputType, GroupType} from '../types';
import {addGroup} from '../../data/group';

export const addGroupMutation = {
  type: GroupType,
  args: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: GraphQLString},
    friends: {type: new GraphQLList(FriendInputType)},
  },
  resolve: (_, args) => addGroup(args),
};

export const c = 'c';
