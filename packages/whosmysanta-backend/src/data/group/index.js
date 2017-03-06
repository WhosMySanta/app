import shortid from 'shortid';
import FriendModel from '../friend/model';
import GroupModel from './model';
import {throwError} from '../../helpers';

export const getGroups = ({first = 10, id}) =>
  GroupModel.find(id && {id}).limit(first).catch(throwError);

export const addGroup = (
  {
    title,
    description,
    friends,
  },
) => {
  const group = new GroupModel({
    name: shortid.generate(),
    title,
    description,
  });

  return Promise.all(
    friends.map(({email, name}) => FriendModel.findOne({
      email,
    }).then((friendExists) => {
      // Add the existing friend to the group
      if (friendExists) {
        group.friends.push(friendExists);

        return group;
      }
      // Register the new friend
      const username = shortid.generate();

      return FriendModel.create({
        username,
        name,
        email,
      })
        .then((newFriend) => {
          // eslint-disable-next-line no-console
          console.log(`Saved Friend "${newFriend.name}"!`);

          group.friends.push(newFriend);

          return newFriend;
        })
        .catch(throwError);
    })),
  )
    .then(() => group.save())
    .then((newGroup) => {
      // eslint-disable-next-line no-console
      console.log(`Saved Group "${newGroup.title}"!`);
      return newGroup;
    })
    .catch(throwError);
};
