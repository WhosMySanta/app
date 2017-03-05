import { pipe } from 'ramda';
import { filterFirst, filterById, wrapWithProperty } from '../helpers';

export const getGroups = ({ first = 10, id }) => {
  const data = [
    {
      id: '1',
      title: 'group1',
    },
    {
      id: '2',
      title: 'group2',
    },
  ];

  return pipe(filterById(id), filterFirst(first), wrapWithProperty())(data);
};

export const getGroupById = () => null;
