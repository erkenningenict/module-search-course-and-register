import React, { useContext } from 'react';
import { Alert } from '@erkenningen/ui/components/alert';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { TableResponsive } from '@erkenningen/ui/layout/table';
import { useGetMySignedUpParticipationsListQuery } from '../../generated/graphql';
import { UserContext } from '../../shared/Auth';
import SignedUpParticipationsRow from './SignedUpParticipationsRow';

const SignedUpParticipationsTable: React.FC = (props) => {
  const user = useContext(UserContext);
  const { loading, data, error } = useGetMySignedUpParticipationsListQuery({
    fetchPolicy: 'no-cache',
  });
  if (loading) {
    return (
      <PanelBody>
        <Spinner />
      </PanelBody>
    );
  }

  if (error) {
    return (
      <PanelBody>
        <Alert type="danger">Er is een fout opgetreden, probeer het later opnieuw.</Alert>
      </PanelBody>
    );
  }
  if (!data || !data.my) {
    return null;
  }
  if (user?.Roles && user?.Roles.indexOf('Student') === -1) {
    return (
      <PanelBody>
        <Alert type="warning">
          U heeft geen geldige licentie, daarom kunt u zich niet voor een bijeenkomst aanmelden!
        </Alert>
      </PanelBody>
    );
  }
  if (!data.my.AangemeldeCursusDeelnames) {
    return null;
  }
  return (
    <>
      <TableResponsive>
        <table className="table table-striped" key="table">
          <thead>
            <tr key="headerRow">
              <th>Titel</th>
              <th style={{ width: '89px' }}>Datum</th>
              <th style={{ width: '97px' }}>Tijden</th>
              <th>Locatie</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.my &&
              data.my.AangemeldeCursusDeelnames &&
              data.my.AangemeldeCursusDeelnames.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <Alert type="info">
                      U bent op dit moment niet aangemeld voor bijeenkomsten op locaties. Digitale
                      bijeenkomsten worden niet getoond*.
                    </Alert>
                  </td>
                </tr>
              )}
            {data.my &&
              data.my.AangemeldeCursusDeelnames &&
              data.my.AangemeldeCursusDeelnames.map((item) => (
                <SignedUpParticipationsRow {...props} key={item.CursusDeelnameID} row={item} />
              ))}
          </tbody>
        </table>
      </TableResponsive>
      <PanelBody>
        <p>Kies een bijeenkomst uit de lijst hierboven als u zich wilt afmelden.</p>

        <p>
          *) Voor afmelding van een digitale bijeenkomst neemt u contact op met de organisator van
          de digitale bijeenkomst.
        </p>
      </PanelBody>
    </>
  );
};

export default SignedUpParticipationsTable;
