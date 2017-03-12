import mailgun from 'mailgun-js';

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

export const mail = mailgun({apiKey, domain});
export const sendMail = data => mail.messages().send(data);
