/* @flow */

import mailgun from 'mailgun-js';

const MAILGUN = Symbol('mailgun');

export const providers = [
  MAILGUN,
];

type MailgunConfig = {
  apiKey: string,
  domain: string,
};
type MailProviderFn = (options: {provider: string, config: MailgunConfig}) => void;

export const mailProvider: MailProviderFn = ({provider, config}) => {
  switch (provider) {
    case MAILGUN:
      return mailgun(config);
    default:
      throw new Error('This mail provider is not supported yet.');
  }
};

export {default as drawSecretSanta} from 'whosmysanta-core';
