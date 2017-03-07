import mongoose from 'mongoose';
import shortid from 'shortid';
import GroupModel from './model';
import FriendModel from '../friend/model';

export const getGroups = ({first = 10, id}) =>
  GroupModel
    // Only pass id if defined
    .find(id && {id})
    .limit(first)
    .exec()
    .catch((err) => { throw new Error(err); });

export const addGroup = ({
  title,
  description,
  friends,
}) => {
  const group = new GroupModel({
    name: shortid.generate(),
    title,
    description,
  });

  // TODO: Move this out into a separate function + file
  return Promise.all(
    friends.map(({email, name}) =>
      FriendModel.create({
        username: shortid.generate(),
        name,
        email,
      })
        .then((newFriend) => {
          group.friends.push(newFriend);
        })
        .catch((err) => { throw new Error(err); }),
    ),
  )
    .then(() => group.save())
    .then((newGroup) => {
      // eslint-disable-next-line no-console
      console.log(`Saved group "${newGroup.title}"!`);
      return newGroup;
    })
    .catch((err) => { throw new Error(err); });
};
