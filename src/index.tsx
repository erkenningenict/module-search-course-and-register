// Add IE11 support
// import 'core-js/es6/map';
// import 'core-js/es6/set';
// import 'es6-shim';
import 'react-app-polyfill/ie11';

import { ERKENNINGEN_GRAPHQL_API_URL, ERKENNINGEN_SITE_TYPE } from '@erkenningen/config';
import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { ThemeContext, ThemeBureauErkenningen } from '@erkenningen/ui/layout/theme';
import { HashRouter, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { GrowlProvider } from '@erkenningen/ui/components/growl';
import App from './App';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({
    uri: ERKENNINGEN_GRAPHQL_API_URL,
    credentials: 'include',
  }),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeBureauErkenningen>
      <ThemeContext.Provider value={{ mode: ERKENNINGEN_SITE_TYPE }}>
        <GrowlProvider>
          <HashRouter>
            <QueryParamProvider ReactRouterRoute={Route}>
              <Route
                path={'/'}
                exact={true}
                render={(props: any) => {
                  props.history.push('bijeenkomsten-zoeken/op-locatie');
                  return null;
                }}
              />
              <App />
            </QueryParamProvider>
          </HashRouter>
        </GrowlProvider>
      </ThemeContext.Provider>
    </ThemeBureauErkenningen>
  </ApolloProvider>,
  document.getElementById('erkenningen-module-search-course-and-register'),
);
