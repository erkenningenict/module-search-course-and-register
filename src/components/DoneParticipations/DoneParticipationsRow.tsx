import React from 'react';
import { toDutchDate } from '../../helpers/date-utils';
import { ICursusDeelname } from '../../types/ICursusDeelname';

interface IRow {
  row: ICursusDeelname;
}

export default function DoneParticipationsRow(props: IRow) {
  const { row } = props;
  return (
    <>
      <tr key={row.CursusDeelnameID}>
        <td>{row.Certificering.NummerWeergave}</td>
        <td>{row.Cursus.Titel || 'onbekend'}</td>
        <td>{toDutchDate(new Date(row.Cursus.Sessies[0].Datum).toISOString())}</td>
        <td>{row.Cursus.Vak.Themas[0].Naam}</td>
        <td>{row.Cursus.Vak.Competenties[0].Naam}</td>
        <td>{row.Status}</td>
      </tr>
    </>
  );
}
