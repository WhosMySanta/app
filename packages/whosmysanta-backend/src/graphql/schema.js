import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {
  addFriendMutation as addFriend,
  addGroupMutation as addGroup,
} from './mutations';
import {friends, groups} from './queries';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    friends,
    groups,
  },
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addFriend,
    addGroup,
  },
});

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
