/* @flow */

import mailgun from 'mailgun-js';

const MAILGUN = 'MAILGUN';

export const providers = [
  MAILGUN,
];

type Provider = 'MAILGUN';

type MailgunConfig = {
  api_key: string,
  domain: string,
};
type MailProviderFn = (options: {provider: Provider, config: MailgunConfig}) => void;

export const mailProvider: MailProviderFn = ({provider, config}) => {
  switch (provider) {
    case MAILGUN:
      return mailgun(config);
    default:
      throw new Error('This mail provider is not supported yet.');
  }
};

export {default as drawSecretSanta} from 'whosmysanta-core';
