import { ERKENNINGEN_GRAPHQL_API_URL, ERKENNINGEN_SITE_TYPE } from '@erkenningen/config/dist/index';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { GrowlProvider } from '@erkenningen/ui/components/growl';
import { ThemeBureauErkenningen, ThemeContext } from '@erkenningen/ui/layout/theme';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import App from './App';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({
    uri: ERKENNINGEN_GRAPHQL_API_URL,
    credentials: 'include',
  }),
  cache,
});

const container = document.getElementById('erkenningen-module-search-course-and-register');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <ApolloProvider client={client}>
    <ThemeBureauErkenningen>
      <ThemeContext.Provider
        value={{ mode: (ERKENNINGEN_SITE_TYPE as 'admin' | 'content') || 'admin' }}
      >
        <GrowlProvider>
          <Router>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
              <App />
            </QueryParamProvider>
          </Router>
        </GrowlProvider>
      </ThemeContext.Provider>
    </ThemeBureauErkenningen>
  </ApolloProvider>,
);
