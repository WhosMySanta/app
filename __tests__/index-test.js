import selectSecretSanta from '..';

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

  const list = selectSecretSanta([
    user1,
    user2,
  ]);

  expect(list).toEqual([
    {
      gifter: user2,
      receiver: user1,
    },
    {
      gifter: user1,
      receiver: user2,
    },
  ]);
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

  const list = selectSecretSanta(users);

  users.forEach((user) => {
    const gifters = list.map(({ gifter }) => gifter);
    const receivers = list.map(({ receiver }) => receiver);

    expect(gifters.filter(gifter => gifter === user).length).toEqual(1);
    expect(receivers.filter(receiver => receiver === user).length).toEqual(1);
  });
});

test('don\'t allow small pairs', () => {
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
    const userReceiver = list
      .find(({ gifter }) => gifter === user)
      .receiver;

    const userGiver = list
      .find(({ receiver }) => receiver === user)
      .gifter;

    expect(userReceiver).not.toEqual(userGiver);
  });
});
