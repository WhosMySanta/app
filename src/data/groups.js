import { pipe } from 'ramda';
import { filterFirst, filterById } from '../helpers';

export const getGroups = ({ first = 10, id }) => {
  const data = [
    {
      id: '1',
      title: 'group1',
      description: 'group1 description',
    },
    {
      id: '2',
      title: 'group2',
      description: 'group2 description',
    },
  ];

  return pipe(filterById(id), filterFirst(first))(data);
};

export const getGroupById = () => null;
