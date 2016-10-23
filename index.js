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

const selectSecretSanta = (
  users: Array<User>,
  // TODO: Think of adding restrictions as a parameter, such as:
  // - User X cannot give to User Y
  // - User A must give to User B
): Array<Selection> => {
  const givers = [...users];

  return users.map((receiver) => {
    // Possible givers only for this receiver (receiver cannot be his own giver)
    const receiverGivers = givers.filter(g => g !== receiver);

    const giver = receiverGiver[
      Math.floor(Math.random() * receiverGiver.length)
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
