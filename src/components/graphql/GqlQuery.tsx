import * as React from 'react';

import { DocumentNode } from 'graphql';
import { OperationVariables, Query } from 'react-apollo';

import Spinner from '../ui/Spinner';
import GqlError from './GqlError';

interface IGqlQueryProps {
  query: DocumentNode;
  variables?: OperationVariables;
  forceNetwork?: boolean;
}

class GqlQuery<T> extends React.Component<IGqlQueryProps, {}> {
  public render() {
    return (
      <Query<T>
        query={this.props.query}
        variables={this.props.variables}
        fetchPolicy={this.props.forceNetwork ? 'network-only' : 'cache-first'}
      >
        {({ loading, error, data }) => {
          if (error) {
            return <GqlError error={error} />;
          }
          if (loading) {
            return (
              <p>
                <Spinner />
              </p>
            );
          }

          if (!data) {
            return null;
          }

          return (this.props.children as ((data: any) => {}))(data);
        }}
      </Query>
    );
  }
}

export default GqlQuery;
