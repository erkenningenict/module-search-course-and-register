import React from 'react';
import { Query } from 'react-apollo';
import {
  GET_MY_SIGNED_UP_PARTICIPATIONS_LIST_QUERY,
  IMy,
  ISignedUpParticipation,
} from '../../shared/Queries';
import Alert from '../ui/Alert';
import Spinner from '../ui/Spinner';
import SignedUpParticipationsRow from './SignedUpParticipationsRow';

export default function SignedUpParticipationsTable() {
  return (
    <>
      <Query<IMy> query={GET_MY_SIGNED_UP_PARTICIPATIONS_LIST_QUERY} fetchPolicy="network-only">
        {({ loading, data, error }) => {
          if (loading) {
            return (
              <div className="panel-body">
                <Spinner />
              </div>
            ) as React.ReactNode;
          }

          if (error) {
            return (
              <div className="panel-body">
                <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>
              </div>
            ) as React.ReactNode;
          }
          if (data) {
            return (
              <>
                <div className="table table-responsive">
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
                </div>
                <div className="panel-body">
                  <p>Kies een bijeenkomst uit de lijst hierboven als u zich wilt afmelden.</p>
                  <p>
                    Aanmeldingen voor digitale bijeenkomsten worden hier niet getoond. Voor
                    afmelding van een digitale bijeenkomst neemt u contact op met de organisator van
                    de digitale bijeenkomst.
                  </p>
                </div>
              </>
            );
          }
        }}
      </Query>
    </>
  );
}
