import selectSecretSanta from '..';

test('simple non-colliding selection', () => {
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

  const list = selectSecretSanta([
    user1,
    user2,
  ]);

  expect(list).toEqual([
    {
      gifter: user2,
      giftee: user1,
    },
    {
      gifter: user1,
      giftee: user2,
    },
  ]);
});

test('advanced non-colliding selection', () => {
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

  const list = selectSecretSanta(users);

  users.forEach((user) => {
    const gifters = list.map(({ gifter }) => gifter);
    const giftees = list.map(({ giftee }) => giftee);

    console.log('gifters', gifters);
    console.log('giftees', giftees);

    expect(gifters.filter(gifter => gifter === user).length).toEqual(1);
    expect(giftees.filter(giftee => giftee === user).length).toEqual(1);
  });

  expect(list).toEqual([
    {
      gifter: user2,
      giftee: user1,
    },
    {
      gifter: user1,
      giftee: user2,
    },
  ]);
});
