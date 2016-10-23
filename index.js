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
    const gifter = gifters
      .filter(g => g !== giftee)
      .splice(Math.floor(Math.random()) * gifters.length, 1)[0];

    return {
      gifter,
      giftee,
    };
  });
};

export default selectSecretSanta;
