import shortid from 'shortid';
import FriendModel from './model';

export const getFriends = ({first = 10, id}) =>
  FriendModel.find(id ? {id} : {}).limit(first).exec().catch(err => {
    throw new Error(`Unable to get friends\n${err}`);
  });

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
  .then(friend => {
    // eslint-disable-next-line no-console
    console.log(`Saved friend "${friend.name}"!`);
    return friend;
  })
  .catch(err => {
    throw new Error(`Error saving friend!\n${err}`);
  });

export const updateFriend = (
  {
    id,
    wish,
  },
) => FriendModel.findOneAndUpdate(
  {
    id,
  },
  {
    wish,
  },
  {
    new: true,
  },
)
  .then(friend => {
    // eslint-disable-next-line no-console
    console.log(`Updated friend "${friend.name}"!`);
    return friend;
  })
  .catch(err => {
    throw new Error(`Error updating friend!\n${err}`);
  });

export const deleteFriend = ({id}) => FriendModel.findOneAndRemove({id})
  .then(friend => {
    // eslint-disable-next-line no-console
    console.log(`Deleted friend "${friend.name}"!`);
    return friend;
  })
  .catch(err => {
    throw new Error(`Error deleting friend!\n${err}`);
  });
