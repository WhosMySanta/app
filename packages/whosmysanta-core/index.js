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
  recipient: User,
};

// TODO: Add function to create a raffleion group (in the SDK?)
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
// ? Question: What is its relation to `raffleSecretSanta`?
// How does it get called, etc.

const raffleSecretSanta = (
  users: Array<User>,
  // TODO: Think of adding restrictions as a parameter, such as:
  // - User X cannot give to User Y
  // - User A must give to User B
  // - User N only receives, doesn't give
): Array<Selection> => {
  // Shuffle all the users
  const shuffled = users.sort(() => Math.floor(Math.random() * users.length));

  // Create new list and just take all the shuffled users
  const gifters = [...shuffled];

  // Create a second list that takes the shuffled gifters ...
  const recipients = [...shuffled];

  // ... and move the first one to the last! We
  // don't want pairs or small groups of the raffle. This keeps it snaky 🐍!
  recipients.push(recipients.shift());

  // Boom, let's raffle! 🎫
  const raffle = users.map((user, raffleRound) => {
    const gifter = gifters[raffleRound];
    const recipient = recipients[raffleRound];

    return {
      gifter,
      recipient,
    };
  });

  // console.log(raffle);

  return raffle;
};


export default raffleSecretSanta;
