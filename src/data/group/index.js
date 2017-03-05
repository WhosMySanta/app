import {pipe} from 'ramda';
import GroupModel from './model';
import {filterFirst, filterById} from '../../helpers';

export const getGroups = ({first = 10, id}) =>
  new Promise((resolve, reject) => GroupModel.find(undefined, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(pipe(filterById(id), filterFirst(first))(data));
    }
  }));

export default null;
