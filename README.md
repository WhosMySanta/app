# whosmysanta

[![Build Status](https://travis-ci.org/WhosMySanta/whosmysanta.svg?branch=master)](https://travis-ci.org/WhosMySanta/whosmysanta)

Tools to build secret santa apps.

## Packages

### [`whosmysanta-core`](packages/whosmysanta-core)

Core Secret Santa selection logic.

### [`whosmysanta-js`](packages/whosmysanta-js)

JavaScript SDK for interacting with the core.

```js
import {
  drawSecretSanta,
  setEmailConfig,
  sendEmail,
} from 'whosmysanta-js';

setEmailConfig({
  provider: 'MAILGUN',
  username: 'glenn',
  password: '****',
});

drawSecretSanta
  .then(selections => {
    selections.map(({giver, recipient}) => {
      sendEmail({
        recipient: giver.email,
        body: `Yo, you need to buy ${recipient.wish || 'a gift'} for ${recipient.name}`,
      }).catch((err) => console.log('errored out!', err));
    });
  });
```

#### Future API Ideas

Move all GraphQL logic to the JS library to make the process of creating apps easier.

```js
import {
  setAdapter,
  graphQLSchema,
  graphQLQueries,
  graphQLMutations,
  graphQLCreateGroup,
  createGroup,
  joinGroup,
} from 'whosmysanta-js';

setAdapter('GRAPHQL', SERVER, PORT);

createGroup({
  id: 'my-title',
  title: 'my title',
  description: 'description',
  friends: [
    {
      name: 'Glenn',
      email: 'glenn@example.com',
    },
  ],
});

// => Group {
//   id: 'my-title',
//   title: 'my title',
//   description: 'description',
//   friends: [
//     {
//       id: 'HBEIWJkfjwir38',
//       name: 'Glenn',
//       email: 'glenn@example.com',
//       wish: null,
//     },
//   ],
// }

joinGroup({
  id: 'HBEIWJkfjwir38',
  wish: 'iPhone 9',
});
```

## LICENSE

MIT
