import { toDutchDate } from '@erkenningen/ui/utils';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AangemeldeCursusDeelname } from '../../generated/graphql';

interface ISignedUpParticipationsRowProps extends RouteComponentProps<any> {
  row: Pick<AangemeldeCursusDeelname, 'CursusDeelnameID' | 'CursusID' | 'Titel' | 'Prijs' | 'Status' | 'Datum' | 'Begintijd' | 'Eindtijd' | 'Locatie'>;
}

export default function SignedUpParticipationsRow(props: ISignedUpParticipationsRowProps) {
  const { row } = props;
  return (
    <>
      <tr key={row.CursusDeelnameID}>
        <td>
          <Link
            to={`/waar-ben-ik-aangemeld/${row.CursusDeelnameID}${props.location.search}`}
            title="Bekijk meer informatie en afmelden"
          >
            {row.Titel}
          </Link>
        </td>
        <td>{toDutchDate(new Date(row.Datum).toISOString())}</td>
        <td>
          {row.Begintijd} - {row.Eindtijd}
        </td>
        <td>{row.Locatie}</td>
        <td>{row.Status}</td>
      </tr>
    </>
  );
}
