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
    // eslint-disable-next-line no-console
    console.log(`Saved friend "${friend.name}"!`);
    return friend;
  })
  .catch((err) => { throw new Error('Error saving friend!', err); });

export const updateFriend = ({
  id,
  wish,
}) => FriendModel.findByIdAndUpdate(id, {
  $set: {wish},
})
  .then((friend) => {
    // eslint-disable-next-line no-console
    console.log(`Updated friend "${friend.name}"!`);
    return friend;
  })
  .catch((err) => { throw new Error('Error updating friend!', err); });
