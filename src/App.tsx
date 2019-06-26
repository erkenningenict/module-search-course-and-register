import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { Query } from 'react-apollo';
import './App.scss';
import DoneParticipations from './components/containers/Participations/DoneParticipations';
import SignedUpParticipations from './components/containers/Participations/SignedUpParticipations';
import { SearchCourse } from './components/containers/SearchCourseAndRegister/SearchCourse';
import Alert from './components/ui/Alert';
import { GET_MY_PERSON_QUERY, IMy } from './shared/Queries';
import { UserContext } from './shared/UserContext';

export default function App() {
  return (
    <div className="App container">
      <HashRouter>
        <>
          <Route
            path={'/'}
            exact={true}
            render={(props: any) => {
              props.history.push('bijeenkomsten-zoeken/op-locatie');
              return null;
            }}
          />
          <Query<IMy, { input: boolean }>
            query={GET_MY_PERSON_QUERY}
            fetchPolicy="network-only"
            variables={{
              input: true,
            }}
          >
            {({ loading, data, error }) => {
              if (loading) {
                return <p>Gegevens worden geladen...</p>;
              }

              if (error) {
                // Check if it's an authentication error, then redirect to login
                if (error.graphQLErrors) {
                  for (const err of error.graphQLErrors) {
                    if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
                      // Redirect to DNN login
                      return (
                        <UserContext.Provider value={undefined}>
                          <SearchCourse />
                        </UserContext.Provider>
                      ) as React.ReactNode;
                      // return <Redirect push={true} to="/Default.aspx?tabid=154" />;
                    } else {
                      return <p>Fout</p>;
                    }
                  }
                }
                return (
                  <Alert type="danger">
                    Er is een fout opgetreden bij het ophalen van de accountgegevens. Probeer het
                    nog een keer of neem contact op met de helpdesk.
                  </Alert>
                ) as React.ReactNode;
              }
              if (!data) {
                return null;
              }
              return (
                <UserContext.Provider value={{ my: data.my }}>
                  <Route
                    path="/bijeenkomsten-zoeken"
                    render={(routerProps: any) => {
                      return <SearchCourse {...routerProps} />;
                    }}
                  />
                  <Route
                    exact={true}
                    path="/wat-heb-ik-al-gevolgd"
                    render={(routerProps: any) => {
                      return <DoneParticipations {...routerProps} />;
                    }}
                  />
                  <Route
                    path="/waar-ben-ik-aangemeld"
                    render={(routerProps: any) => {
                      return <SignedUpParticipations {...routerProps} />;
                    }}
                  />
                </UserContext.Provider>
              );
            }}
          </Query>
        </>
      </HashRouter>
    </div>
  );
}
