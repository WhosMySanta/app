import raffleSecretSanta from '..';

test('non-colliding selection of pair', () => {
  const user1 = {
    name: 'Karl Horky',
    email: 'karl.horky@mailinator.com',
    giftWish: ['Electronics', 'Games'],
  };
  const user2 = {
    name: 'Glenn Reyes',
    email: 'glenn.reyes@mailinator.com',
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
    name: 'Karl Horky',
    email: 'karl.horky@mailinator.com',
    giftWish: ['Electronics', 'Games'],
  };
  const user2 = {
    name: 'Glenn Reyes',
    email: 'glenn.reyes@mailinator.com',
    giftWish: 'iPhone 9',
  };
  const user3 = {
    name: 'Donald Duck',
    email: 'donald.duck@mailinator.com',
    giftWish: null,
  };
  const user4 = {
    name: 'Buzz Lightyear',
    email: 'buzz.lightyear@mailinator.com',
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
    name: 'Karl Horky',
    email: 'karl.horky@mailinator.com',
    giftWish: ['Electronics', 'Games'],
  };
  const user2 = {
    name: 'Glenn Reyes',
    email: 'glenn.reyes@mailinator.com',
    giftWish: 'iPhone 9',
  };
  const user3 = {
    name: 'Donald Duck',
    email: 'donald.duck@mailinator.com',
    giftWish: null,
  };
  const user4 = {
    name: 'Buzz Lightyear',
    email: 'buzz.lightyear@mailinator.com',
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
