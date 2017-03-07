import mongoose from 'mongoose';
import shortid from 'shortid';
import FriendModel from './model';

export const getFriends = ({first = 10, id}) =>
  FriendModel
    .find(id ? {id} : {})
    .limit(first)
    .exec()
    .catch((err) => { throw new Error(err); });

export const getFriendById = id =>
  FriendModel.findOne({_id: mongoose.Types.ObjectId(id)})
    .exec()
    .catch((err) => { throw new Error(err); });

export const addFriend = ({
  name,
  email,
  wish,
}) => FriendModel.create({
  username: shortid.generate(),
  name,
  email,
  wish,
})
  .then((friend) => {
    console.log(`Saved friend "${friend.name}"!`);
    return friend;
  })
  .catch((err) => { throw new Error(err); });
