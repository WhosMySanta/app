import shortid from 'shortid';
import GroupModel from './model';
import {addFriend} from '../friend';
// import {notifyFriendsAboutGroup} from '../../notifications';

export const getGroups = ({first = 10, id}) =>
  GroupModel.find(id ? {id} : {}).limit(first).exec().catch(err => {
    throw new Error(err);
  });

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

  // TODO: Move this out into a separate function + file
  return Promise.all(
    friends.map((friend) => addFriend(friend)
      .then(newFriend => {
        group.friends.push(newFriend);
        return newFriend;
      })
      .catch(err => {
        throw new Error(err);
      })),
  )
    .then((addedFriends) => group.save().then((newGroup) => {
      newGroup.friends = addedFriends;

      return newGroup;
    }))
    .then(newGroup => {
      // eslint-disable-next-line no-console
      console.log(`Saved group "${newGroup.title}"!`);
      return newGroup;
    })
    // .then(newGroup => notifyFriendsAboutGroup({
    //   group: {
    //     ...newGroup,
    //     friends,
    //   },
    // }).then(() => newGroup))
    // .then(newGroup => {
    //   // eslint-disable-next-line no-console
    //   console.log('Mails sent to friends');
    //   return newGroup;
    // })
    .catch(err => {
      throw new Error(err);
    });
};

export const deleteGroup = ({id}) => GroupModel.findOneAndRemove({id})
  .then(group => {
    // eslint-disable-next-line no-console
    console.log(`Deleted group "${group.title}"!`);
    return group;
  })
  .catch(err => {
    throw new Error(`Error deleting group!\n${err}`);
  });
