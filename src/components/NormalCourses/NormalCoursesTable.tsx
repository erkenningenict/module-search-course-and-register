import { useQuery } from '@apollo/react-hooks';
import { Alert, PanelBody, Spinner, TableResponsive } from '@erkenningen/ui';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SEARCH_COURSE_SESSIONS } from '../../shared/Queries';
import { INormalCourseDetails } from '../../types/IFindNormalCoursesRow';
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

interface ICourseSessionsQueryData {
  CursusSessies: Array<{
    CanUnRegister: boolean;
    CourseId: number;
    SpecialtyId: number;
    CourseCode: string;
    Title: string;
    Date: number;
    StartTime: string;
    EndTime: string;
    Price: number;
    LocationName: string;
    LocationAddress: {
      Street: string;
      HouseNr: string;
      HouseNrExtension: string;
      Zipcode: string;
      City: string;
      Email: string;
      Website: string;
    };
    Distance: number;
    Competence: string;
    Theme: string;
    Organizer: string;
    OrganizerEmail: string;
    OrganizerPhone: string;
    OrganizerWebsite: string;
    PromoText: string;
    Registered: boolean | null;
    RegisteredDate: number | null;
    Remarks: string | null;
  }>;
}

interface ISearchData {
  knowledgeAreaId: number | null;
  competenceId: number | null;
  themeId: number | null;
  zipcodeNumbers: number | null;
  to: number | null;
  from: number | null;
  isOnlineCourse: boolean;
}

export function NormalCoursesTable(props: INormalCoursesTable) {
  const searchData = props.searchData && {
    ...props.searchData,
    licenseId: parseInt(props.searchData.licenseId, 10),
    knowledgeAreaId: parseInt(props.searchData.knowledgeAreaId, 10),
    competenceId: parseInt(props.searchData.competenceId, 10),
    themeId: parseInt(props.searchData.themeId, 10),
    zipcodeNumbers: parseInt(props.searchData.zipcodeNumbers, 10) || null,
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
  const searchInput = searchData;
  delete searchInput.licenseId;

  const { loading, data, error } = useQuery<
    ICourseSessionsQueryData,
    {
      input: ISearchData;
    }
  >(SEARCH_COURSE_SESSIONS, {
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
            data.CursusSessies.map((item: INormalCourseDetails) => (
              <NormalCoursesRow
                {...props}
                key={item.CourseCode}
                row={item}
                showDistance={searchData.distanceRadius !== 0}
              />
            ))}
          {!data || data.CursusSessies.length === 0 ? (
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
