/* @flow */

import mailgun from 'mailgun-js';

const MAILGUN = 'MAILGUN';

type MailProvider = 'MAILGUN';

type MailProviders = {
  MAILGUN: MailProvider,
};

type MailgunConfig = {
  api_key: string,
  domain: string,
};

type MailProviderFn = (options: {provider: MailProvider, config: MailgunConfig}) => void;

export const mailProviders: MailProviders = {
  MAILGUN,
};

export const mailProvider: MailProviderFn = ({provider, config}) => {
  switch (provider) {
    case MAILGUN:
      return mailgun(config);
    default:
      throw new Error('This mail provider is not supported yet.');
  }
};

export {default as drawSecretSanta} from 'whosmysanta-core';
