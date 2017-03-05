import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {addFriendMutation as addFriend} from './mutations';
import {friends, groups} from './queries';

const QueryRootType = new GraphQLObjectType({
  name: 'QueryRoot',
  fields: {
    friends,
    groups,
  },
});

const MutationRootType = new GraphQLObjectType({
  name: 'MutationRoot',
  fields: {
    addFriend,
  },
});

export default new GraphQLSchema({
  query: QueryRootType,
  mutation: MutationRootType,
});
