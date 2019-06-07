import React from 'react';
import { Query } from 'react-apollo';
import { GET_PARTICIPATIONS } from '../../shared/Queries';
import { ICursusDeelname } from '../../types/ICursusDeelname';
import Alert from '../ui/Alert';
import Spinner from '../ui/Spinner';
import DoneParticipationsRow from './DoneParticipationsRow';

export default function DoneParticipationsTable(props) {
  return props.licenseId ? (
    <Query
      query={GET_PARTICIPATIONS}
      variables={{
        licenseId: props.licenseId,
      }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <div className="panel-body">
              <Spinner />
            </div>
          ) as React.ReactNode;
        }

        if (error) {
          return (
            <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>
          ) as React.ReactNode;
        }

        return (
          <>
            <div className="table table-responsive">
              <table className="table table-striped" key="table">
                <thead>
                  <tr key="headerRow">
                    <th>Licentienummer</th>
                    <th>Titel</th>
                    <th style={{ width: '97px' }}>Datum</th>
                    <th>Thema</th>
                    <th>Competentie</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.CursusDeelnames &&
                    data.CursusDeelnames.map((item: ICursusDeelname) => (
                      <DoneParticipationsRow key={item.CursusDeelnameID} row={item} />
                    ))}
                  {!data || data.CursusDeelnames.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <Alert type="info">U heeft nog geen bijeenkomsten gevolgd</Alert>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
              <div className="panel-body">
                <p>
                  * Status 'voorlopig' kan betekenen dat de deelnamelijst nog niet compleet is of
                  dat de kennisaanbieder nog niet betaald heeft.
                </p>
              </div>
            </div>
          </>
        ) as React.ReactNode;
      }}
    </Query>
  ) : null;
}
