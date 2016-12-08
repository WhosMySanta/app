import drawSecretSanta from '..';

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

  const draw = drawSecretSanta([
    user1,
    user2,
  ]);

  // The first selection
  const firstGiver = draw[0].giver;
  const firstRecipient = draw[0].recipient;

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

  const draw = drawSecretSanta(users);

  draw.forEach(({ giver, recipient }) => {
    // Every giver and recipient just cant be the same
    expect(giver !== recipient).toEqual(true);
  });
});

test('keep the draw snaky 🐍 and don\'t allow small groups', () => {
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

  const draw = drawSecretSanta(users);
  const firstGiver = draw[0].giver;
  const lastRecipient = draw[draw.length - 1].recipient;

  // The first giver of every shuffled list is also the last recipient
  expect(firstGiver === lastRecipient).toBe(true);

  // But also the giver can't be the recipient
  draw.forEach(({ giver, recipient }) => {
    expect(giver !== recipient).toBe(true);
  });
});
