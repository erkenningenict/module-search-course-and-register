import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { Query } from 'react-apollo';
import './App.scss';
import { SearchCourse } from './components/containers/SearchCourseAndRegister/SearchCourse';
// import { IRegisterCourseDetails } from './components/NormalCourses/Register';
import Alert from './components/ui/Alert';
import { GET_MY_PERSON_QUERY } from './shared/Queries';
import { UserContext } from './shared/UserContext';

// const registerCourseDetails: IRegisterCourseDetails = {
//   licenseId: 1,
//   specialtyId: 1,
//   code: '12345678',
//   courseId: 1,
//   isDigitalSpecialty: false,
//   title: 'Test bijeenkomst',
//   courseDateTime: new Date(),
// };

export default function App() {
  return (
    <div className="App container-fluid">
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
          <Route
            path="/bijeenkomsten-zoeken/op-locatie"
            render={(props: any) => {
              // const params = parseLocationSearch(props.location.search);
              // params.forEach((param: { key: string; value: string }) => {
              //   switch (param.key) {
              //     case 'themaId':
              //       setThemeId(parseInt(param.value, 10));
              //       break;
              //     case 'competentieId':
              //       setCompetenceId(parseInt(param.value, 10));
              //       break;
              //     default:
              //   }
              // });
              // setRoute(true);
              return null;
            }}
          />
          {/* <Route
            path={'/online'}
            render={(props: any) => {
              // setRoute(true);
              return null;
            }}
          /> */}
          <Query query={GET_MY_PERSON_QUERY} fetchPolicy="no-cache">
            {({ loading, error, data }) => {
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
                        // <UserContext.Provider value={{user: {}}>
                        <SearchCourse />
                        // </UserContext.Provider>
                      );
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
                    {/* {{ error && error.length ?  }} */}
                  </Alert>
                );
              }
              return (
                <UserContext.Provider value={{ my: data.my }}>
                  <SearchCourse />
                </UserContext.Provider>
              );
            }}
          </Query>
          {/* <Register registerCourseDetails={registerCourseDetails} /> */}
        </>
      </HashRouter>
    </div>
  );
}
