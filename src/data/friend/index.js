import {Base64} from 'js-base64';
import {pipe} from 'ramda';
import shortid from 'shortid';
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

export const addFriend = (
  {
    name,
    email,
    wish,
  },
) => FriendModel.create({
  id: Base64.encode(email),
  hash: shortid.generate(),
  name,
  email,
  wish,
})
  .then((friend) => {
    console.log(`Saved ${friend.name}!`); // eslint-disable-line no-console

    return friend;
  })
  .catch((err) => {
    throw new Error(err);
  });
