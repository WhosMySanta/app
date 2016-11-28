const {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');

const {mutationWithClientMutationId} = require('graphql-relay');

const shortid = require('shortid');

let GROUPS = [
  {
    id: '123a',
    title: 'Adams Family',
    description: 'Secret santa group for the Adams family',
    friends: [
      {
        id: '0',
        email: 'glenn@glenn.com',
        wish: '',
        hash: 'Hkgqz8Xqzx',
      },
      {
        id: '1',
        email: 'karl@karl.com',
        wish: '',
        hash: 'HkqM8Q9Ge',
      },
    ],
  },
  {
    id: '321b',
    title: 'Holmes Family',
    description: 'Secret santa group for the Holmes family',
    friends: [
      {
        id: '0',
        email: 'glenn@glenn.com',
        wish: '',
        hash: 'Hkgqz8Xqzx',
      },
      {
        id: '1',
        email: 'karl@karl.com',
        wish: '',
        hash: 'HkqM8Q9Ge',
      },
    ],
  },
];

export const FriendType = new GraphQLObjectType({
  name: 'Friend',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    wish: {type: GraphQLString},
    hash: {type: GraphQLString},
  }),
});

export const FriendInputType = new GraphQLInputObjectType({
  name: 'FriendInput',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
  }),
});

export const GroupType = new GraphQLObjectType({
  name: 'Group',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    friends: {type: new GraphQLList(FriendType)},
    friend: {
      type: FriendType,
      args: {
        // TODO: Change this from `hash` to `id` (make sure unique!)
        hash: {type: GraphQLString},
      },
      resolve: (parent, {hash}) => parent.friends.find((friend) => friend.hash === hash),
    },
  }),
});

export const GroupInputType = new GraphQLInputObjectType({
  name: 'GroupInput',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    friends: {type: new GraphQLList(FriendInputType)},
  }),
});

const AppType = new GraphQLObjectType({
  name: 'App',
  fields: () => ({
    groups: {type: new GraphQLList(GroupType)},
    id: {type: GraphQLString},
    group: {
      type: GroupType,
      args: {
        id: {type: GraphQLString},
      },
      resolve: (_, {id}) => GROUPS.find((group) => group.id === id),
    },
  }),
});

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    app: {
      type: AppType,
      resolve: () => ({
        groups: GROUPS,
        group: (_, {id}) => GROUPS.find((group) => group.id === id),
        id: '0',
      }),
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    createGroup: mutationWithClientMutationId({
      name: 'CreateGroup',
      inputFields: {
        id: {type: GraphQLString},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        friends: {type: new GraphQLList(FriendInputType)},
      },
      outputFields: {
        // TODO: Find out if the resolve is broken here
        // Shouldn't it be returning the whole app object?
        app: {
          type: AppType,
          resolve: () => GROUPS,
        },
      },
      mutateAndGetPayload: ({title, description, friends}) => {
        const id = title.toLowerCase().replace(' ', '-');
        const payload = {
          id,
          title,
          description,
          friends: friends.map((friend) => ({
            ...friend,
            hash: shortid.generate(friend.email),
          })),
        };

        GROUPS.push(payload);

        return payload;
      },
    }),
    updateFriend: mutationWithClientMutationId({
      name: 'UpdateFriend',
      inputFields: {
        groupId: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        wish: {type: GraphQLString},
      },
      outputFields: {
        friend: {
          type: FriendType,
          groups: {},
          resolve: (payload) => payload,
        },
      },
      mutateAndGetPayload: ({groupId, email, wish}) => {
        const payload = {
          email,
          wish,
        };

        GROUPS = GROUPS.map((group) =>
          group.id !== groupId ? group : {
            ...group,
            friends: group.friends.map((friend) =>
              friend.email !== email ? friend : {
                ...friend,
                wish,
              },
            ),
          },
        );

        return payload;
      },
    }),
  }),
});

export const Schema = new GraphQLSchema({
  query: Root,
  mutation: MutationType,
});
