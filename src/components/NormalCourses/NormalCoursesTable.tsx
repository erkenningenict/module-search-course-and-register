import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { COURSE_SESSIONS_QUERY } from '../../shared/Queries';
import { INormalCourseDetails } from '../../types/IFindNormalCoursesRow';
import Alert from '../ui/Alert';
import Spinner from '../ui/Spinner';
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
  };
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
    isOnlineCourse: false,
  };
  const searchInput = searchData;
  delete searchInput.licenseId;

  return (
    <Query
      query={COURSE_SESSIONS_QUERY}
      variables={{
        input: searchInput,
      }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <div>
              <Spinner />
            </div>
          );
        }

        if (error) {
          return (
            <Alert>
              Er is een fout opgetreden, probeer het later opnieuw. Details: {{ error }}
            </Alert>
          );
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
            {/* <Route
              path="/bijeenkomsten-zoeken/op-locatie/informatie-en-aanmelden/:courseId"
              render={(routerProps: any) => (
                <NormalCourseDetails
                  routerProps={routerProps}
                  details={dialogData}
                  visible={dialogData ? true : false}
                  onHideDialog={(e: any) => setDialogData(undefined)}
                  licenseId={parseInt(props.searchData.licenseId, 10)}
                  useDialog={true}
                />
            /> */}
          </>
        );
      }}
    </Query>
  );
}
