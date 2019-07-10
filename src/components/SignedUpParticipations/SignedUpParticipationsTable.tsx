import { Alert, PanelBody, Spinner, TableResponsive } from '@erkenningen/ui';
import React from 'react';
import { Query } from 'react-apollo';
import {
  GET_MY_SIGNED_UP_PARTICIPATIONS_LIST_QUERY,
  IMy,
  ISignedUpParticipation,
} from '../../shared/Queries';
import SignedUpParticipationsRow from './SignedUpParticipationsRow';

export default function SignedUpParticipationsTable() {
  return (
    <>
      <Query<IMy> query={GET_MY_SIGNED_UP_PARTICIPATIONS_LIST_QUERY} fetchPolicy="network-only">
        {({ loading, data, error }) => {
          if (loading) {
            return (
              <PanelBody>
                <Spinner />
              </PanelBody>
            ) as React.ReactNode;
          }

          if (error) {
            return (
              <PanelBody>
                <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>
              </PanelBody>
            ) as React.ReactNode;
          }
          if (!data || !data.my) {
            return null;
          }
          if (data.my.Roles && data.my.Roles.indexOf('Student') === -1) {
            return (
              <PanelBody>
                <Alert type="warning">
                  U heeft geen geldige licentie, daarom kunt u zich niet voor een bijeenkomst
                  aanmelden!
                </Alert>
              </PanelBody>
            );
          }
          if (data) {
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
                      {data.my &&
                        data.my.AangemeldeCursusDeelnames &&
                        data.my.AangemeldeCursusDeelnames.map((item: ISignedUpParticipation) => (
                          <SignedUpParticipationsRow key={item.CursusDeelnameID} row={item} />
                        ))}
                      {data &&
                      data.my &&
                      data.my.AangemeldeCursusDeelnames &&
                      data.my.AangemeldeCursusDeelnames.length === 0 ? (
                        <tr>
                          <td colSpan={6}>
                            <Alert type="info">U bent op dit moment nergens aangemeld.</Alert>
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </TableResponsive>
                <PanelBody>
                  <p>Kies een bijeenkomst uit de lijst hierboven als u zich wilt afmelden.</p>
                  <p>
                    Aanmeldingen voor digitale bijeenkomsten worden hier niet getoond. Voor
                    afmelding van een digitale bijeenkomst neemt u contact op met de organisator van
                    de digitale bijeenkomst.
                  </p>
                </PanelBody>
              </>
            );
          }
        }}
      </Query>
    </>
  );
}
