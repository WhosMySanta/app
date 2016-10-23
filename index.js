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

type Selection = {
  gifter: User,
  giftee: User,
  giftWish?: GiftWish,
};

type SelectSecretSantaFn = (users: Array<User>) => Array<?Selection>;

const selectSecretSanta = (users): SelectSecretSantaFn => {
  users.forEach(u => console.log(u));
  return [];
};

export default selectSecretSanta;
