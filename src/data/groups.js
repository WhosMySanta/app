import { pipe } from 'ramda';
import { filterFirst, filterById, wrapWithProperty } from '../helpers';

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
      friends: {
        edges: [
          {
            node: {
              id: '1',
              name: 'friend1',
              email: 'friend1 email',
              wish: 'friend1 wish',
              hash: 'friend1 hash',
            },
          },
          {
            node: {
              id: '2',
              name: 'friend2',
              email: 'friend2 email',
              wish: 'friend2 wish',
              hash: 'friend2 hash',
            },
          },
        ],
      },
    },
  ];

  return pipe(filterById(id), filterFirst(first), wrapWithProperty())(data);
};

export const getGroupById = () => null;
