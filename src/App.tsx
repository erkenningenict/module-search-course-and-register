import { Alert } from '@erkenningen/ui/components/alert';
import DoneParticipations from './components/containers/Participations/DoneParticipations';
import SignedUpParticipations from './components/containers/Participations/SignedUpParticipations';
import { SearchCourse } from './components/containers/SearchCourseAndRegister/SearchCourse';
import { useAuth, UserContext } from './shared/Auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedUpParticipationDetails } from './components/SignedUpParticipations/SignedUpParticipationsDetails';
import './App.css'

export default function App() {
  const auth = useAuth();
  if (auth.loading) {
    return <p>Gegevens worden geladen...</p>;
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
  if (auth.authenticated && auth.my?.Roles && auth.my.Roles.indexOf('Student') === -1) {
    auth.my.Certificeringen = undefined;
  }
  return (
    <UserContext.Provider value={auth.authenticated ? auth.my : undefined}>
      <Routes>
        <Route path="bijeenkomsten-zoeken/*" element={<SearchCourse />}></Route>
        <Route path="/" element={<Navigate to="/bijeenkomsten-zoeken/op-locatie" />} />
        <Route path="wat-heb-ik-al-gevolgd" element={<DoneParticipations />} />
        <Route path="waar-ben-ik-aangemeld" element={<SignedUpParticipations />}>
          <Route path=":participationId" element={<SignedUpParticipationDetails />} />
        </Route>
        <Route path="*" element={<div>URL niet gevonden.</div>} />
      </Routes>
    </UserContext.Provider>
  );
}
