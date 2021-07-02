import React from 'react';
import { toDutchDate } from '@erkenningen/ui/utils';
import {
  Certificering,
  Competentie,
  Cursus,
  CursusDeelname,
  Maybe,
  Sessie,
  Thema,
  Vak,
} from '../../generated/graphql';

interface DoneParticipationsRowProps {
  row: Pick<CursusDeelname, 'CursusDeelnameID' | 'Status'> & {
    Certificering?: Maybe<
      { __typename?: 'Certificering' } & Pick<Certificering, 'CertificeringID' | 'NummerWeergave'>
    >;
    Cursus: { __typename?: 'Cursus' } & Pick<
      Cursus,
      'CursusID' | 'Titel' | 'Prijs' | 'Promotietekst'
    > & {
        Sessies?: Maybe<
          Array<Maybe<{ __typename?: 'Sessie' } & Pick<Sessie, 'Datum' | 'Begintijd' | 'Eindtijd'>>>
        >;
        Vak: { __typename?: 'Vak' } & Pick<Vak, 'Titel' | 'Kosten'> & {
            Themas?: Maybe<Array<Maybe<{ __typename?: 'Thema' } & Pick<Thema, 'Naam'>>>>;
            Competenties?: Maybe<
              Array<Maybe<{ __typename?: 'Competentie' } & Pick<Competentie, 'Naam'>>>
            >;
          };
      };
  };
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
