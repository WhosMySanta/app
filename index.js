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
  giver: User,
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
  const givers = [...users];

  return users.map((receiver) => {
    // Possible givers only for this receiver (receiver cannot be his own giver)
    const receiverGivers = givers.filter(g => g !== receiver);

    const giver = receiverGivers[
      Math.floor(Math.random() * receiverGivers.length)
    ];

    // Take the selected giver out of the givers array
    givers.splice(givers.findIndex(g => g === giver), 1);

    return {
      giver,
      receiver,
    };
  });
};

export default selectSecretSanta;
