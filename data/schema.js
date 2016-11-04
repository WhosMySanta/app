const {
  GraphQLInt,
  // GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const RAFFLE_GROUP_FIXTURE = {
  title: 'Holmes Family',
  description: 'Secret santa group for the Holmes family',
  suggestions: {
    currency: 'EUR',
    minLimit: 10,
    maxLimit: 50,
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

export const RaffleGroupType = new GraphQLObjectType({
  name: 'RaffleGroup',
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    suggestions: { type: SuggestionsType },
  }),
});

export const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      raffleGroup: {
        type: RaffleGroupType,
        resolve: () => RAFFLE_GROUP_FIXTURE,
      },
    }),
  }),
});
