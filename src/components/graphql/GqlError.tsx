import * as React from 'react';

import { GraphQLError } from 'graphql';
import { Link } from 'react-router-dom';

import Alert from '../ui/Alert';

interface IGqlErrorProps {
  error: {
    graphQLErrors?: ReadonlyArray<GraphQLError>;
  };
}

class GqlError extends React.Component<IGqlErrorProps, {}> {
  public render() {
    if (this.props.error.graphQLErrors) {
      for (const err of this.props.error.graphQLErrors) {
        if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
          // Return authentication error message
          return (
            <Alert type="danger">
              U moet opnieuw inloggen. Klik{' '}
              <Link to={process.env.REACT_APP_DNN_LOGIN_URL || '/login'}>hier</Link> om opnieuw in
              te loggen.
            </Alert>
          );
        }
      }
    }

    // For now, return generic error message
    return (
      <Alert type="danger">
        Er is een fout opgetreden bij het ophalen van de gegevens. Probeer het nog een keer of neem
        contact op met de helpdesk.
      </Alert>
    );
  }
}

export default GqlError;
