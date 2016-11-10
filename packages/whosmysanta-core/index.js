/* @flow */

type Category =
  'Electronics' |
  'Games' |
  'Home Decoration';

type Wish = string | Array<Category>;

type User = {
  name: string,
  email: string,
  wish?: Wish,
};

export type Selection = {
  gifter: User,
  recipient: User,
};

const raffleSecretSanta = (users: Array<User>): Array<Selection> => {
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

  return raffle;
};


export default raffleSecretSanta;
