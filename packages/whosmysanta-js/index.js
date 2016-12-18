/* @flow */

import mailgun from 'mailgun-js';
import drawSecretSanta from 'whosmysanta-core';

type MailgunConfig = {
  apiKey: string,
  domain: string,
};
type MailProviderFn = (provider: string, config: MailgunConfig) => void;


const mailProvider: MailProviderFn = (provider, config) => {
  switch (provider) {
    case 'mailgun':
      return mailgun(config);
    default:
      throw new Error('This mail provider is not supported yet.');
  }
};


export default {
  drawSecretSanta,
  mailProvider,
};
