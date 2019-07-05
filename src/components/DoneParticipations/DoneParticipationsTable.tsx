import { Alert, Spinner } from '@erkenningen/ui';
import React from 'react';
import { Query } from 'react-apollo';
import { GET_PARTICIPATIONS, IGetParticipation } from '../../shared/Queries';
import DoneParticipationsRow from './DoneParticipationsRow';

interface IDoneParticipationsTableProps {
  licenseId: number;
}

export default function DoneParticipationsTable(props: IDoneParticipationsTableProps) {
  return props.licenseId ? (
    <Query<{ CursusDeelnames: IGetParticipation[] }, { licenseId: number }>
      query={GET_PARTICIPATIONS}
      variables={{
        licenseId: props.licenseId,
      }}
      fetchPolicy="network-only"
    >
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
                    data.CursusDeelnames.map((item: IGetParticipation) => (
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
