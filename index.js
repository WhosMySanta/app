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
  // Create new list of users for potential recipients
  const recipients = [...users];

  // Core raffle, which loops through all participants
  const raffle = users.map((gifter) => {
    // Possible recipients for the current gifter (gifter cannot be his own recipient)
    const possibleRecipient = recipients.filter(r => r !== gifter);

    // Yes, this is the recipient of our current gifter
    const recipient = possibleRecipient[Math.floor(Math.random() * possibleRecipient.length)];

    // Take the selected gifter out of the recipients list
    recipients.splice(recipients.findIndex(r => r === recipient), 1);

    return {
      gifter,
      recipient,
    };
  });


  return raffle;
};

export default selectSecretSanta;
