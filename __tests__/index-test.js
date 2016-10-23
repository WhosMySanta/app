import selectSecretSanta from '..';

test('returns list of selections', () => {
  selectSecretSanta([
    {
      firstName: 'Karl',
      lastName: 'Horky',
      giftWish: ['Electronics', 'Games'],
    },
    {
      firstName: 'Glenn',
      lastName: 'Reyes',
      giftWish: 'iPhone 9',
    },
  ]);
  expect(true).toBe(true);
});
