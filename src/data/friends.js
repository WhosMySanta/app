import {pipe} from 'ramda';
import {filterFirst, filterById} from '../helpers';

export const getFriends = ({first = 10, id}) => {
  const data = [
    {
      id: '1',
      name: 'friend1',
      email: 'friend1 email',
      wish: 'friend1 wish',
      hash: 'friend1 hash',
    },
    {
      id: '2',
      name: 'friend2',
      email: 'friend2 email',
      wish: 'friend2 wish',
      hash: 'friend2 hash',
    },
  ];

  return pipe(filterById(id), filterFirst(first))(data);
};

export const getFriendById = () => null;
