import React from 'react';
import { toDutchDate } from '@erkenningen/ui/utils';
import { CursusDeelnameFieldsFragment } from '../../generated/graphql';

interface DoneParticipationsRowProps {
  row: CursusDeelnameFieldsFragment;
}

export default function DoneParticipationsRow(props: DoneParticipationsRowProps) {
  const { row } = props;
  return (
    <tr key={row.CursusDeelnameID}>
      <td>{row.Certificering?.NummerWeergave}</td>
      <td>{row.Cursus.Titel || 'onbekend'}</td>
      <td>
        {toDutchDate(new Date(row.Cursus.Sessies && row.Cursus.Sessies[0].Datum).toISOString())}
      </td>
      <td>{row.Cursus?.Vak?.Themas && row.Cursus.Vak.Themas[0].Naam}</td>
      <td>{row.Cursus.Vak.Competenties && row.Cursus.Vak.Competenties[0].Naam}</td>
      <td>{row.Status}</td>
    </tr>
  );
}
