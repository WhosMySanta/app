import { createContainer, QL } from 'react-relay';

import App from './AppComponent';


export default createContainer(App, {
  fragments: {
    hello: () => QL`
      fragment on User {
        name,
      },
    `,
  },
});
