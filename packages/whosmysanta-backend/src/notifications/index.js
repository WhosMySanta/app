import {sendInvitations} from './mails';

export const notifyFriendsAboutGroup = group => sendInvitations(group);
