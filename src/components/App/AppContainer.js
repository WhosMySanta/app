import Relay from 'react-relay';

import App from './AppComponent';


export default Relay.createContainer(App, {
  fragments: {
    raffleGroup: () => Relay.QL`
      fragment on RaffleGroup {
        id,
        title,
        description,
        suggestions {
          currency,
          minLimit,
          maxLimit,
        }
      },
    `,
  },
});
