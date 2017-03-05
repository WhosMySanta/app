import {Base64} from 'js-base64';
import {pipe} from 'ramda';
import shortid from 'shortid';
import FriendModel from './model';
import {filterFirst, filterById, throwError} from '../../helpers';

export const getFriends = ({first = 10, id}) =>
  FriendModel.find()
    .then(data => pipe(filterById(id), filterFirst(first))(data))
    .catch(throwError);

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
  .catch(throwError);
