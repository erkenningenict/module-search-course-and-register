import { Alert, PanelBody, Spinner } from '@erkenningen/ui';
import React from 'react';
import { Query } from 'react-apollo';
import { COURSE_SESSIONS_QUERY } from '../../shared/Queries';
import { INormalCourseDetails } from '../../types/IFindNormalCoursesRow';
import { NormalCoursesRow } from './NormalCoursesRow';

interface INormalCoursesTable {
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
  if (!props.searchData) {
    return null;
  }
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

  return (
    <Query<ICourseSessionsQueryData, { input: ISearchData }>
      query={COURSE_SESSIONS_QUERY}
      variables={{
        input: searchInput,
      }}
    >
      {({ loading, data, error }) => {
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
          return null;
        }

        return (
          <>
            <div className="table table-responsive">
              <table className="table table-striped" key="table">
                <thead>
                  <tr key="headerRow">
                    <th>Titel (aantal resultaten: {data.CursusSessies.length})</th>
                    <th style={{ width: '88px' }}>Datum</th>
                    <th style={{ width: '97px' }}>Van - tot</th>
                    <th>Locatie</th>
                    {!searchData.distanceRadius ||
                      (searchData.distanceRadius !== 0 && <th>Afstand (km)</th>)}
                    <th>Prijs (incl. btw)</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.CursusSessies &&
                    data.CursusSessies.map((item: INormalCourseDetails) => (
                      <NormalCoursesRow
                        key={item.CourseCode}
                        row={item}
                        showDistance={searchData.distanceRadius !== 0}
                      />
                    ))}
                  {!data || data.CursusSessies.length === 0 ? (
                    <tr>
                      <td colSpan={searchData.distanceRadius !== 0 ? 6 : 5}>
                        <Alert type="info">
                          Geen bijeenkomsten gevonden. Pas uw zoekcriteria aan.
                        </Alert>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </>
        );
      }}
    </Query>
  );
}
