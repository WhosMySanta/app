import { pipe } from 'ramda';
import { filterFirst, filterById, wrapWithProperty } from '../helpers';

export const getFriends = ({ first = 10, id }) => {
  const data = [
    {
      id: '1',
      name: 'friend1',
    },
    {
      id: '2',
      name: 'friend2',
    },
  ];

  return pipe(filterById(id), filterFirst(first), wrapWithProperty())(data);
};

export const getFriendById = () => null;
