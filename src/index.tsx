import 'react-app-polyfill/ie11';

import { ERKENNINGEN_GRAPHQL_API_URL, ERKENNINGEN_SITE_TYPE } from '@erkenningen/config';
import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { ThemeContext, ThemeBureauErkenningen } from '@erkenningen/ui/layout/theme';
import { HashRouter, useLocation, useNavigate } from 'react-router-dom';
import { GrowlProvider } from '@erkenningen/ui/components/growl';
import App from './App';
import { QueryParamProvider } from 'use-query-params';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({
    uri: ERKENNINGEN_GRAPHQL_API_URL,
    credentials: 'include',
  }),
  cache,
});

/**
 * This is the main thing you need to use to adapt the react-router v6
 * API to what use-query-params expects.
 *
 * Pass this as the `ReactRouterRoute` prop to QueryParamProvider.
 */
const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate],
  );
  return children({ history: adaptedHistory, location });
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeBureauErkenningen>
      <ThemeContext.Provider value={{ mode: ERKENNINGEN_SITE_TYPE }}>
        <GrowlProvider>
          <HashRouter>
            <QueryParamProvider ReactRouterRoute={RouteAdapter as any}>
              <App />
            </QueryParamProvider>
          </HashRouter>
        </GrowlProvider>
      </ThemeContext.Provider>
    </ThemeBureauErkenningen>
  </ApolloProvider>,
  document.getElementById('erkenningen-module-search-course-and-register'),
);
