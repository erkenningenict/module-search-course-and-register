import React from 'react';
import { toDutchDate } from '@erkenningen/ui/utils';
import { Link, useLocation } from 'react-router-dom';
import { AangemeldeCursusDeelnameFieldsFragment } from '../../generated/graphql';

interface SignedUpParticipationsRowProps {
  row: AangemeldeCursusDeelnameFieldsFragment;
}

const SignedUpParticipationsRow: React.FC<SignedUpParticipationsRowProps> = (props) => {
  const location = useLocation();
  const { row } = props;
  return (
    <>
      <tr key={row.CursusDeelnameID}>
        <td>
          <Link
            to={`/waar-ben-ik-aangemeld/${row.CursusDeelnameID}${location.search}`}
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
};

export default SignedUpParticipationsRow;
