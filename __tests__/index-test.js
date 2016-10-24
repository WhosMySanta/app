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
      gifter: user1,
      recipient: user2,
    },
    {
      gifter: user2,
      recipient: user1,
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
    const recipients = list.map(({ recipient }) => recipient);

    expect(gifters.filter(gifter => gifter === user).length).toEqual(1);
    expect(recipients.filter(recipient => recipient === user).length).toEqual(1);
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
      .recipient;

    const userGiver = list
      .find(({ recipient }) => recipient === user)
      .gifter;

    expect(userReceiver).not.toEqual(userGiver);
  });
});
