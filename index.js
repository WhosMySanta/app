/* @flow */

type GiftCategory =
  'Electronics' |
  'Games' |
  'Home Decoration';

type GiftWish = string | Array<GiftCategory>;

type User = {
  firstName: string,
  lastName?: string,
  giftWish?: GiftWish,
};

export type Selection = {
  gifter: User,
  receiver: User,
};


// TODO: Add function to create a selection group (in the SDK?)
//
// function createSelectionGroup({
//  title = '',
//  description = '',
//  suggestions = {
//   currency: 'Euro',
//   minLimit: 10,
//   maxLimit: 50
// }}) { }
//
// ? Question: What is its relation to `selectSecretSanta`?
// How does it get called, etc.


const selectSecretSanta = (
  users: Array<User>,
  // TODO: Think of adding restrictions as a parameter, such as:
  // - User X cannot give to User Y
  // - User A must give to User B
  // - User N only receives, doesn't give
): Array<Selection> => {
  const gifters = [...users];

  return users.map((receiver) => {
    // Possible gifters only for this receiver (receiver cannot be his own gifter)
    const possibleGifters = gifters.filter(g => g !== receiver);

    const gifter = possibleGifters[
      Math.floor(Math.random() * possibleGifters.length)
    ];

    // Take the selected gifter out of the gifters array
    gifters.splice(gifters.findIndex(g => g === gifter), 1);

    return {
      gifter,
      receiver,
    };
  });
};

export default selectSecretSanta;
