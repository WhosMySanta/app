const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const GROUP_FIXTURE = {
  '123a': {
    id: '123a',
    title: 'Adams Family',
    description: 'Secret santa group for the Adams family',
  },
  '321b': {
    id: '321b',
    title: 'Holmes Family',
    description: 'Secret santa group for the Holmes family',
  },
};

export const GroupType = new GraphQLObjectType({
  name: 'Group',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

export const GroupInputType = new GraphQLInputObjectType({
  name: 'GroupInput',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    group: {
      type: GroupType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, { id }) => GROUP_FIXTURE[id],
    },
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'GroupMutations',
  fields: () => ({
    createGroup: {
      type: GroupType,
      args: {
        input: { type: GroupInputType },
      },
      resolve: (_, { input: { id, title, description } }) => {
        GROUP_FIXTURE[id] = { id, title, description };

        return GROUP_FIXTURE[id];
      },
    },
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
