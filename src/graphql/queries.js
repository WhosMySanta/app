import // GraphQLInt,
  'graphql';
import { FriendConnectionType, GroupConnectionType } from './types';

export const friends = {
  type: FriendConnectionType,
  resolve: () => ({}),
};

export const groups = {
  type: GroupConnectionType,
  // args: {
  //   first: { type: GraphQLInt },
  // },
  resolve: () => ({}),
};
