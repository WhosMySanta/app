require('dotenv').config();

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
const {mailProvider, mailProviders: {MAILGUN}} = require('whosmysanta');

const {addGroup, getListOfGroups, getGroupById} = require('./Models/Group');
const {addFriend, getListOfFriends, updateFriend} = require('./Models/Friend');

process.on('uncaughtException', (err) => {
  process.stderr.write(`${err.message}\n`);
  process.exit(1);
});

const errors = [];

[
  'DB_USER',
  'DB_PASSWORD',
  'HOST',
  'MAILGUN_API_KEY',
  'MAILGUN_DOMAIN',
].forEach((envVarKey) => {
  if (!process.env[envVarKey]) {
    errors.push(`Environment variable '${envVarKey}' missing! Please add it to your .env file.`);
  }
});


if (errors.length > 0) throw new Error(errors.join('\n\n'));

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
      resolve: (_, {id}) => getGroupById(id),
    },
  }),
});

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    app: {
      type: AppType,
      resolve: () => ({
        groups: getListOfGroups,
        group: (_, {id}) => getGroupById(id),
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
          resolve: () => getListOfGroups(),
        },
      },
      mutateAndGetPayload: ({id, title, description, friends}) => {
        const payload = {
          id,
          title,
          description,
          friends: friends.map((friend) => ({
            ...friend,
            wish: '',
            hash: shortid.generate(friend.email),
          })),
        };

        const pFriends = friends.map((friend) =>
          addFriend({
            ...friend,
            wish: '',
            hash: shortid.generate(friend.email),
          }),
        );

        Promise.all(pFriends)
          .then((friends) => {
            console.log('promise.all friends', friends);
            addGroup({
              id,
              title,
              description,
              friends,
            });
          });

        // TODO: Move me somewhere else!
        const provider = MAILGUN;
        const config = {
          apiKey: process.env.MAILGUN_API_KEY,
          domain: process.env.MAILGUN_DOMAIN,
        };
        const mail = mailProvider({provider, config});

        const subject = `You have been invited to ${title}!`;

        payload.friends.forEach(({email, hash}) => {
          const html = `
            <html>
              <body>
                Hey! 👋<br /><br />
                Click <a href="http://${process.env.HOST}/join/${id}/${hash}">here</a> and let santa know what your wish is.<br /><br />
                Cheers! 👋<br />
              </body>
            </html>
          `;
          const data = {
            from: 'Santa <santa@whosmysanta.com>',
            to: email,
            subject,
            html,
          };

          if (typeof mail.messages === 'function') {
            mail.messages().send(data, (error, body) => {
              if (error) {
                console.error(error); // eslint-disable-line no-console
              } else {
                console.log(body); // eslint-disable-line no-console
              }
            });
          }
        });


        return payload;
      },
    }),
    updateFriend: mutationWithClientMutationId({
      name: 'UpdateFriend',
      inputFields: {
        id: {type: GraphQLString},
        groupId: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        wish: {type: GraphQLString},
      },
      outputFields: {
        // TODO: Find out if the resolve is broken here
        // Shouldn't it be returning the whole app object?
        app: {
          type: AppType,
          resolve: () => getListOfGroups(),
        },
      },
      mutateAndGetPayload: (args) => {
        const {groupId, email, id, wish} = args;
        const payload = {
          id,
          email,
          wish,
        };

        updateFriend(payload);

        // TODO: When we have the organizer email address, send an email out to them here!

        return payload;
      },
    }),
  }),
});

export const Schema = new GraphQLSchema({
  query: Root,
  mutation: MutationType,
});
