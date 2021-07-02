import React from 'react';
import { Alert } from '@erkenningen/ui/components/alert';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { TableResponsive } from '@erkenningen/ui/layout/table';
import { useGetCursusDeelnamesQuery } from '../../generated/graphql';
import DoneParticipationsRow from './DoneParticipationsRow';

interface DoneParticipationsTableProps {
  licenseId: number;
}

export default function DoneParticipationsTable(props: DoneParticipationsTableProps) {
  const { loading, data, error } = useGetCursusDeelnamesQuery({
    variables: {
      licenseId: props.licenseId,
    },
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return (
      <PanelBody>
        <Spinner />
      </PanelBody>
    );
  }

  if (error) {
    return <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>;
  }
  if (!data) {
    return <p>Test</p>;
  }

  return (
    <>
      <TableResponsive>
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
              data.CursusDeelnames.map((item) => (
                <DoneParticipationsRow key={item.CursusDeelnameID} row={item} />
              ))}
            {!data || data?.CursusDeelnames?.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <Alert type="info">U heeft nog geen bijeenkomsten gevolgd</Alert>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </TableResponsive>
      <PanelBody>
        <p>
          * Status &apos;voorlopig&apos; kan betekenen dat de deelnamelijst nog niet compleet is of
          dat de kennisaanbieder nog niet betaald heeft.
        </p>
      </PanelBody>
    </>
  );
}
