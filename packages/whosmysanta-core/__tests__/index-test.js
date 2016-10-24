import raffleSecretSanta from '..';

test('non-colliding selection of pair', () => {
  const user1 = {
    firstName: 'Karl',
    lastName: 'Horky',
    giftWish: ['Electronics', 'Games'],
  };
  const user2 = {
    firstName: 'Glenn',
    lastName: 'Reyes',
    giftWish: 'iPhone 9',
  };

  const raffle = raffleSecretSanta([
    user1,
    user2,
  ]);

  // The first selection
  const firstGifter = raffle[0].gifter;
  const firstRecipient = raffle[0].recipient;

  // The first gifter can't be the recipient
  expect(firstGifter !== firstRecipient).toBe(true);
});

test('non-colliding selection of larger group', () => {
  const user1 = {
    firstName: 'Karl',
    lastName: 'Horky',
    giftWish: ['Electronics', 'Games'],
  };
  const user2 = {
    firstName: 'Glenn',
    lastName: 'Reyes',
    giftWish: 'iPhone 9',
  };
  const user3 = {
    firstName: 'Donald',
    lastName: 'Duck',
    giftWish: null,
  };
  const user4 = {
    firstName: 'Buzz',
    lastName: 'Lightyear',
    giftWish: 'Infinity and beyond',
  };

  const users = [
    user1,
    user2,
    user3,
    user4,
  ];

  const raffle = raffleSecretSanta(users);

  raffle.forEach(({ gifter, recipient }) => {
    // Every gifter and recipient just cant be the same
    expect(gifter !== recipient).toEqual(true);
  });
});

test('keep the raffle snaky 🐍 and don\'t allow small groups', () => {
  const user1 = {
    firstName: 'Karl',
    lastName: 'Horky',
    giftWish: ['Electronics', 'Games'],
  };
  const user2 = {
    firstName: 'Glenn',
    lastName: 'Reyes',
    giftWish: 'iPhone 9',
  };
  const user3 = {
    firstName: 'Donald',
    lastName: 'Duck',
    giftWish: null,
  };
  const user4 = {
    firstName: 'Buzz',
    lastName: 'Lightyear',
    giftWish: 'Infinity and beyond',
  };
  const users = [
    user1,
    user2,
    user3,
    user4,
  ];

  const raffle = raffleSecretSanta(users);
  const firstGifter = raffle[0].gifter;
  const lastRecipient = raffle[raffle.length - 1].recipient;

  // The first gifter of every shuffled list is also the last recipient
  expect(firstGifter === lastRecipient).toBe(true);

  // But also the gifter can't be the recipient
  raffle.forEach(({ gifter, recipient }) => {
    expect(gifter !== recipient).toBe(true);
  });
});
