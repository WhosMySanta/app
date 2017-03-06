import mongoose from 'mongoose';
import shortid from 'shortid';
import FriendModel from './model';
import {throwError} from '../../helpers';

export const getFriends = ({first = 10, id}) =>
  FriendModel.find(id && {id}).limit(first).exec().catch(throwError);

export const getFriendById = id =>
  FriendModel.findOne({_id: mongoose.Types.ObjectId(id)})
    .exec()
    .catch(throwError);

export const addFriend = (
  {
    name,
    email,
    wish,
  },
) => FriendModel.create({
  username: shortid.generate(),
  name,
  email,
  wish,
})
  .then((friend) => {
    // eslint-disable-next-line no-console
    console.log(`Saved Friend "${friend.name}"!`);

    return friend;
  })
  .catch(throwError);
