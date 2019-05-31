// Add IE11 support
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'es6-shim';
import 'react-app-polyfill/ie11';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import App from './App';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
    credentials: 'include',
  }),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
