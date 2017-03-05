import {pipe} from 'ramda';
import FriendModel from './model';
import {filterFirst, filterById} from '../../helpers';

export const getFriends = ({first = 10, id}) =>
  new Promise((resolve, reject) => FriendModel.find(undefined, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(pipe(filterById(id), filterFirst(first))(data));
    }
  }));

export default null;
