import { useQuery } from '@apollo/react-hooks';
import { Alert } from '@erkenningen/ui';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import React from 'react';
import './App.scss';
import DoneParticipations from './components/containers/Participations/DoneParticipations';
import SignedUpParticipations from './components/containers/Participations/SignedUpParticipations';
import { SearchCourse } from './components/containers/SearchCourseAndRegister/SearchCourse';
import { GET_MY_PERSON_QUERY, IMy } from './shared/Queries';
import { UserContext } from './shared/UserContext';
import UserRoute from './shared/UserRoute';

export default function App() {
  const { loading, error, data } = useQuery<IMy>(GET_MY_PERSON_QUERY, {
    variables: { input: true },
  });
  if (loading) {
    return <p>Gegevens worden geladen...</p>;
  }
  if (error) {
    // Check if it's an authentication error
    if (error.graphQLErrors) {
      for (const err of error.graphQLErrors) {
        if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
          return (
            <UserContext.Provider value={undefined}>
              <SearchCourse />
            </UserContext.Provider>
          );
        } else {
          return (
            <Alert type="danger">
              Er is een fout opgetreden bij het ophalen van de accountgegevens. Probeer het nog een
              keer of neem contact op met de helpdesk.
            </Alert>
          );
        }
      }
    }
    return (
      <Alert type="danger">
        Er is een fout opgetreden bij het ophalen van de accountgegevens. Probeer het nog een keer
        of neem contact op met de helpdesk.
      </Alert>
    );
  }
  if (!data || !data.my || data.my.Roles === null) {
    return null;
  }
  if (data.my.Roles && data.my.Roles.indexOf('Student') === -1) {
    data.my.Certificeringen = undefined;
  }
  return (
    <>
      <UserContext.Provider value={{ my: data.my }}>
        <UserRoute path="/bijeenkomsten-zoeken" component={SearchCourse} />
        <UserRoute path="/wat-heb-ik-al-gevolgd" component={DoneParticipations} />
        <UserRoute path="/waar-ben-ik-aangemeld" component={SignedUpParticipations} />
      </UserContext.Provider>
    </>
  );
}
