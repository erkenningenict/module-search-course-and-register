import { Alert } from '@erkenningen/ui/components/alert';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import React from 'react';
import './App.scss';
import DoneParticipations from './components/containers/Participations/DoneParticipations';
import SignedUpParticipations from './components/containers/Participations/SignedUpParticipations';
import { SearchCourse } from './components/containers/SearchCourseAndRegister/SearchCourse';
import { useAuth, UserContext } from './shared/Auth';
import UserRoute from './shared/UserRoute';

export default function App() {
  const auth = useAuth();
  if (auth.loading) {
    return <p>Gegevens worden geladen...</p>;
  }

  if (!auth.authenticated) {
    return (
      <UserContext.Provider value={undefined}>
        <SearchCourse />
      </UserContext.Provider>
    );
  }

  if (auth.error) {
    // Check if it's an authentication error

    // if (error.graphQLErrors) {
    //   for (const err of error.graphQLErrors) {
    //     if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
    //     } else {
    //       return (
    //         <Alert type="danger">
    //           Er is een fout opgetreden bij het ophalen van de accountgegevens. Probeer het nog een
    //           keer of neem contact op met de helpdesk.
    //         </Alert>
    //       );
    //     }
    //   }
    // }
    return (
      <Alert type="danger">
        Er is een fout opgetreden bij het ophalen van de accountgegevens. Probeer het nog een keer
        of neem contact op met de helpdesk.
      </Alert>
    );
  }
  if (!auth.my || !auth.my.Roles === null) {
    return null;
  }
  if (auth.my.Roles && auth.my.Roles.indexOf('Student') === -1) {
    auth.my.Certificeringen = undefined;
  }
  return (
    <>
      <UserContext.Provider value={auth.my}>
        <UserRoute path="/bijeenkomsten-zoeken" component={SearchCourse} />
        <UserRoute path="/wat-heb-ik-al-gevolgd" component={DoneParticipations} />
        <UserRoute path="/waar-ben-ik-aangemeld" component={SignedUpParticipations} />
      </UserContext.Provider>
    </>
  );
}
