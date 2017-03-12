import {sendInvitations} from './mails';

export const notifyFriendsAboutGroup = ({friends, group}) => {
  sendInvitations(friends);

  return Promise.resolve();
};
