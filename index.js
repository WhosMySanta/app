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

const selectSecretSanta = (
  users: Array<User>,
): Array<Selection> => {
  users.forEach(u =>
    console.log(users[Math.floor(Math.random() * users.length)])
  );

  // console.log(u));
  return [];
};

export default selectSecretSanta;
