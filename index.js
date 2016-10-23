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
  reciever: User,
};

const selectSecretSanta = (
  users: Array<User>,
  // TODO: Think of adding restrictions as a parameter, such as:
  // - User X cannot give to User Y
  // - User A must give to User B
): Array<Selection> => {
  const gifters = [...users];

  return users.map((reciever) => {
    // Possible gifters only for this receiver (receiver cannot be his own gifter)
    const recieverGifters = gifters.filter(g => g !== reciever);

    const gifter = recieverGifters[
      Math.floor(Math.random() * recieverGifters.length)
    ];

    // Take the selected gifter out of the gifters array
    gifters.splice(gifters.findIndex(g => g === gifter), 1);

    return {
      gifter,
      reciever,
    };
  });
};

export default selectSecretSanta;
