import {notifyFriendsAboutGroup} from '..';

it('Should return a Promise', () => {
  const friends = [
    {
      name: 'a',
      email: 'a@a',
    },
    {
      name: 'b',
      email: 'b@a',
    },
    {
      name: 'c',
      email: 'c@a',
    },
  ];

  const promise = notifyFriendsAboutGroup(friends);
  expect(typeof promise.then === 'function').toBe(true);
});
