import { Alert, PanelBody, Spinner } from '@erkenningen/ui';
import React from 'react';
import { Query } from 'react-apollo';
import { ISearchSpecialty, SEARCH_SPECIALTIES } from '../../shared/Queries';
import { IOnlineCourseDetails } from '../../types/IFindOnlineCoursesRow';
import { OnlineCoursesRow } from './OnlineCoursesRow';

interface IOnlineCoursesTable {
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

export function OnlineCoursesTable(props: IOnlineCoursesTable) {
  if (!props.searchData) {
    return null;
  }
  const searchData = props.searchData && {
    ...props.searchData,
    licenseId: parseInt(props.searchData.licenseId, 10),
    knowledgeAreaId: parseInt(props.searchData.knowledgeAreaId, 10),
    themeId: parseInt(props.searchData.themeId, 10),
    isOnlineCourse: props.searchData.isOnlineCourse,
  };
  const searchInput = searchData;
  delete searchInput.licenseId;

  return (
    <Query<{ SearchSpecialties: ISearchSpecialty[] }, { input: any }>
      query={SEARCH_SPECIALTIES}
      variables={{
        input: searchInput,
      }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <PanelBody>
              <Spinner />
            </PanelBody>
          );
        }

        if (error) {
          return (
            <PanelBody>
              <Alert>
                Er is een fout opgetreden, probeer het later opnieuw. Details: {{ error }}
              </Alert>
            </PanelBody>
          );
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
                    <th>Titel (aantal resultaten: {data.SearchSpecialties.length})</th>
                    <th>Organisator</th>
                    <th>Prijs (incl. btw)</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.SearchSpecialties &&
                    data.SearchSpecialties.map((item: IOnlineCourseDetails) => {
                      return <OnlineCoursesRow key={item.Code} row={item} />;
                    })}
                  {!data || data.SearchSpecialties.length === 0 ? (
                    <tr>
                      <td>
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
