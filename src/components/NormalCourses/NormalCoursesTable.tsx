import {Alert} from '@erkenningen/ui/components/alert';
import {Spinner} from '@erkenningen/ui/components/spinner';
import {PanelBody} from '@erkenningen/ui/layout/panel';
import {TableResponsive} from '@erkenningen/ui/layout/table';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useGetCursusSessiesQuery } from '../../generated/graphql';
import { NormalCoursesRow } from './NormalCoursesRow';

interface INormalCoursesTable extends RouteComponentProps {
  searchData: {
    licenseId: string;
    knowledgeAreaId: string;
    themeId: string;
    competenceId: string;
    zipcodeNumbers: string;
    distanceRadius: number;
    from: any;
    to: any;
    isOnlineCourse: boolean;
  };
}

export function NormalCoursesTable(props: INormalCoursesTable) {
  const searchData = props.searchData && {
    ...props.searchData,
    licenseId: parseInt(props.searchData.licenseId, 10),
    knowledgeAreaId: parseInt(props.searchData.knowledgeAreaId, 10),
    competenceId: parseInt(props.searchData.competenceId, 10),
    themeId: parseInt(props.searchData.themeId, 10),
    zipcodeNumbers: parseInt(props.searchData.zipcodeNumbers, 10) || undefined,
    to: props.searchData.to
      ? props.searchData.to === ''
        ? null
        : props.searchData.to.getTime()
      : null,
    from: props.searchData.from
      ? props.searchData.from === ''
        ? null
        : props.searchData.from.getTime()
      : null,
    isOnlineCourse: props.searchData.isOnlineCourse,
  };
  // eslint-disable-next-line
  const {licenseId, ...searchInput} = searchData;

  const { loading, data, error } = useGetCursusSessiesQuery({
    variables: {
      input: searchInput,
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
    return <Alert type="danger">Er is een fout opgetreden, probeer het later opnieuw.</Alert>;
  }
  if (!data) {
    return null;
  }

  return (
    <TableResponsive>
      <table className="table table-striped" key="table">
        <thead>
          <tr key="headerRow">
            <th>Titel</th>
            <th style={{ width: '96px' }}>Datum</th>
            <th style={{ width: '105px' }}>Van - tot</th>
            <th>Locatie</th>
            {!searchData.distanceRadius ||
              (searchData.distanceRadius !== 0 && <th>Afstand (km)</th>)}
            <th className="text-right">Prijs (excl. btw)</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.CursusSessies &&
            data.CursusSessies.map((item) => (
              <NormalCoursesRow
                {...props}
                key={item.CourseCode}
                row={item}
                showDistance={searchData.distanceRadius !== 0}
              />
            ))}
          {!data || data?.CursusSessies?.length === 0 ? (
            <tr>
              <td colSpan={searchData.distanceRadius !== 0 ? 6 : 5}>
                <Alert type="info">Geen bijeenkomsten gevonden. Pas uw zoekcriteria aan.</Alert>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </TableResponsive>
  );
}
