const {
  GraphQLInt,
  // GraphQLList,
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
    suggestions: {
      currency: 'EUR',
      minLimit: 10,
      maxLimit: 100,
    },
  },
  '321b': {
    id: '321b',
    title: 'Holmes Family',
    description: 'Secret santa group for the Holmes family',
    suggestions: {
      currency: 'EUR',
      minLimit: 20,
      maxLimit: 50,
    },
  },
};

export const SuggestionsType = new GraphQLObjectType({
  name: 'Suggestions',
  fields: () => ({
    currency: { type: GraphQLString },
    minLimit: { type: GraphQLInt },
    maxLimit: { type: GraphQLInt },
  }),
});

export const SuggestionsInputType = new GraphQLInputObjectType({
  name: 'SuggestionsInput',
  fields: () => ({
    currency: { type: GraphQLString },
    minLimit: { type: GraphQLInt },
    maxLimit: { type: GraphQLInt },
  }),
});

export const GroupType = new GraphQLObjectType({
  name: 'Group',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    suggestions: { type: SuggestionsType },
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
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        suggestions: { type: SuggestionsInputType },
      },
      resolve: (_, { title, description, suggestions }) => {
        const id = 'someRandomId';

        GROUP_FIXTURE[id] = {
          id,
          title,
          description,
          suggestions,
        };

        return GROUP_FIXTURE[id];
      },
    },
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
