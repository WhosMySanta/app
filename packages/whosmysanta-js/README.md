# whosmysanta-js SDK

## Example implementation

```js
import {mailProvider, mailProviders: {MAILGUN}} from 'whosmysanta-js';

const provider = MAILGUN;
const config = {
  apiKey: process.env.API_KEY,
  domain: 'example.com',
};

const {send} = mailProvider({provider, config});

// Send draw
// TODO: Finalize parameters
send({
  users: [
    {
      name: 'Glenn Reyes',
      email: 'glenn@example.com',
      organizer: 'Karl Horky',
      joinUrl: 'https://example.com/join/karls-santa-group/Hk4QvBP7g',
    },
    {
      name: 'Patrick',
      email: 'patrick@example.com',
      organizer: 'Karl Horky',
      joinUrl: 'https://example.com/join/karls-santa-group/Yk5TwDF6e',
    },
  ],
  template: `
    <html>
      <table>
        <tr>
          <td>
            Hi {user.name}
          </td>
        </tr>
        <tr>
          <td>
            <a href="{user.joinUrl}">Join the group</a>
          </td>
        </tr>
      </table>
    </html>
  `,
});

// Send wish
send({
  users: [
    {
      name: 'Glenn Reyes',
      email: 'glenn@example.com',
      recipient: 'Patrick', // Defined after all users answer or organizer ends the draw early
      recipientWish: 'iPhone', // Defined after all users answer or organizer ends the draw early
    },
    {
      name: 'Patrick',
      email: 'patrick@example.com',
      recipient: 'Karl', // Defined after all users answer or organizer ends the draw early
      recipientWish: 'Google Cardboard', // Defined after all users answer or organizer ends the draw early
    },
  ],
  template: `
    <html>
      <table>
        <tr>
          <td>
            Hi {user.name}, you need to get {user.recipientWish} for {user.recipient}.
          </td>
        </tr>
      </table>
    </html>
  `,
});
```
