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
  giftee: User,
};

const selectSecretSanta = (
  users: Array<User>,
): Array<Selection> => {
  const gifters = [...users];

  return users.map((giftee) => {
    const gifteeGifters = gifters.filter(g => g !== giftee);
    const gifter = gifteeGifters[
      Math.floor(Math.random() * gifteeGifters.length)
    ];
    gifters.splice(gifters.findIndex(g => g === gifter), 1);

    return {
      gifter,
      giftee,
    };
  });
};

export default selectSecretSanta;
