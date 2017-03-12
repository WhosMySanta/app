import {sendMail} from './mailgun';

export const sendInvitations = (
  {
    description,
    shortid,
    title,
    friends,
    ...group
  },
) => {
  const data = {
    from: 'Santa <hello@whosmysanta.com>',
    to: friends.map(({email}) => email),
    subject: `🎅 Hohoho! You have been invited to ${title}!`,
    html: `
      <html>
        <body>
          Hoho %recipient.name%! 🎅<br /><br />
          You have been invited to the secret santa group "${title}" - ${description}!<br />
          Click <a href="https://${process.env.HOST}/join/${group.name}/%recipient.username%">here</a>&nbsp;
          and let santa know what your wish is.<br /><br />
          Cheers! 👋<br />
        </body>
      </html>
    `,
    'recipient-variables': Object.assign(
      {},
      ...friends.map(({email, id, name, username}) => ({
        [email]: {
          id,
          name,
          username,
        },
      })),
    ),
  };
  return sendMail(data);
};
