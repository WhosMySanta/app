import raffleSecretSanta from '..';

test('non-colliding selection of pair', () => {
  const user1 = {
    name: 'Karl Horky',
    email: 'karl.horky@mailinator.com',
    wish: ['Electronics', 'Games'],
  };
  const user2 = {
    name: 'Glenn Reyes',
    email: 'glenn.reyes@mailinator.com',
    wish: 'iPhone 9',
  };

  const raffle = raffleSecretSanta([
    user1,
    user2,
  ]);

  // The first selection
  const firstGiver = raffle[0].giver;
  const firstRecipient = raffle[0].recipient;

  // The first giver can't be the recipient
  expect(firstGiver !== firstRecipient).toBe(true);
});

test('non-colliding selection of larger group', () => {
  const user1 = {
    name: 'Karl Horky',
    email: 'karl.horky@mailinator.com',
    wish: ['Electronics', 'Games'],
  };
  const user2 = {
    name: 'Glenn Reyes',
    email: 'glenn.reyes@mailinator.com',
    wish: 'iPhone 9',
  };
  const user3 = {
    name: 'Donald Duck',
    email: 'donald.duck@mailinator.com',
    wish: null,
  };
  const user4 = {
    name: 'Buzz Lightyear',
    email: 'buzz.lightyear@mailinator.com',
    wish: 'Infinity and beyond',
  };

  const users = [
    user1,
    user2,
    user3,
    user4,
  ];

  const raffle = raffleSecretSanta(users);

  raffle.forEach(({ giver, recipient }) => {
    // Every giver and recipient just cant be the same
    expect(giver !== recipient).toEqual(true);
  });
});

test('keep the raffle snaky 🐍 and don\'t allow small groups', () => {
  const user1 = {
    name: 'Karl Horky',
    email: 'karl.horky@mailinator.com',
    wish: ['Electronics', 'Games'],
  };
  const user2 = {
    name: 'Glenn Reyes',
    email: 'glenn.reyes@mailinator.com',
    wish: 'iPhone 9',
  };
  const user3 = {
    name: 'Donald Duck',
    email: 'donald.duck@mailinator.com',
    wish: null,
  };
  const user4 = {
    name: 'Buzz Lightyear',
    email: 'buzz.lightyear@mailinator.com',
    wish: 'Infinity and beyond',
  };
  const users = [
    user1,
    user2,
    user3,
    user4,
  ];

  const raffle = raffleSecretSanta(users);
  const firstGiver = raffle[0].giver;
  const lastRecipient = raffle[raffle.length - 1].recipient;

  // The first giver of every shuffled list is also the last recipient
  expect(firstGiver === lastRecipient).toBe(true);

  // But also the giver can't be the recipient
  raffle.forEach(({ giver, recipient }) => {
    expect(giver !== recipient).toBe(true);
  });
});
