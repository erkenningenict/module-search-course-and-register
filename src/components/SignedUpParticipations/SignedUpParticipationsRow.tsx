import React from 'react';
import { Link } from 'react-router-dom';
import { toDutchDate } from '../../helpers/date-utils';
import { ISignedUpParticipation } from '../../shared/Queries';

interface IRow {
  row: ISignedUpParticipation;
}

export default function SignedUpParticipationsRow(props: IRow) {
  const { row } = props;
  return (
    <>
      <tr key={row.CursusDeelnameID}>
        <td>
          <Link
            to={`/waar-ben-ik-aangemeld/${row.CursusDeelnameID}`}
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
