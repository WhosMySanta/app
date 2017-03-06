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
  giver: User,
  recipient: User,
};

const drawSecretSantas = (users: Array<User>): Array<Selection> => {
  // Shuffle all the users
  const shuffled = users.sort(() => Math.floor(Math.random() * users.length));

  // Create new list and just take all the shuffled users
  const givers = [...shuffled];

  // Create a second list that takes the shuffled givers ...
  const recipients = [...shuffled];

  // ... and move the first one to the last! We
  // don't want pairs or small groups of the draw. This keeps it snaky 🐍!
  recipients.push(recipients.shift());

  // Boom, let's draw! 🎫
  const draw = users.map((user, drawRound) => {
    const giver = givers[drawRound];
    const recipient = recipients[drawRound];

    return {
      giver,
      recipient,
    };
  });

  return draw;
};


export default drawSecretSantas;
