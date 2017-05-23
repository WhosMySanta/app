import {notifyFriendsAboutGroup} from '..';

it('Should return a Promise', () => {
  const group = {
    title: 'Jest team',
    description: 'A test santa group',
    name: '123',
    friends: [
      {
        id: '1',
        name: 'Glenn',
        email: 'glenn@glennreyes.com',
        username: 'glennreyes',
      },
      {
        id: '2',
        name: 'Karl',
        email: 'karl.horky@gmail.com',
        username: 'karlhorky',
      },
    ],
  };

  const promise = notifyFriendsAboutGroup(group);
  expect(typeof promise.then === 'function').toBe(true);
});
