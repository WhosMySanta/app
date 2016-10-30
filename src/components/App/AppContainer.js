import Relay from 'react-relay';

import App from './AppComponent';


export default Relay.createContainer(App, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        teas {
          name
        },
      },
    `,
  },
});
