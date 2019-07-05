import { Alert, Panel, PanelBody, Spinner } from '@erkenningen/ui';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { Link, Route, Switch } from 'react-router-dom';
import { COURSE_SESSIONS_QUERY, SEARCH_SPECIALTIES } from '../../../shared/Queries';
import { SelectedLicenseContext } from '../../../shared/SelectedLicenseContext';
import { INormalCourseDetails } from '../../../types/IFindNormalCoursesRow';
import { IOnlineCourseDetails } from '../../../types/IFindOnlineCoursesRow';
import { NormalCourseDetailsContainer } from '../../NormalCourses/NormalCourseDetailsContainer';
import { NormalCoursesForm } from '../../NormalCourses/NormalCoursesForm';
import { OnlineCourseDetailsContainer } from '../../OnlineCourses/OnlineCourseDetailsContainer';
import { OnlineCoursesForm } from '../../OnlineCourses/OnlineCoursesForm';
import { LicenseChooser } from '../LicenseChooser';

export function SearchCourse() {
  const [licenseId, setLicenseId] = useState(0);
  const [seenOverview, setSeenOverview] = useState(false);

  return (
    <Panel title="Zoek bijeenkomst en aanmelden" doNotIncludeBody={true}>
      <SelectedLicenseContext.Provider value={licenseId}>
        <Switch>
          <LicenseChooser
            setLicenseId={(id: number) => setLicenseId(id)}
            seenOverview={seenOverview}
          >
            <Route
              exact={true}
              path="/bijeenkomsten-zoeken/op-locatie/informatie-en-aanmelden/:courseId"
              render={(routerProps: any) => {
                return (
                  <Query<
                    { CursusSessies: INormalCourseDetails[] },
                    { input: { currentCourseId: number; isOnlineCourse: boolean } }
                  >
                    query={COURSE_SESSIONS_QUERY}
                    variables={{
                      input: {
                        currentCourseId: parseInt(routerProps.match.params.courseId, 10),
                        isOnlineCourse: false,
                      },
                    }}
                    fetchPolicy="network-only"
                  >
                    {({ loading, data, error }) => {
                      if (loading) {
                        return (
                          <PanelBody>
                            <Spinner />
                          </PanelBody>
                        ) as React.ReactNode;
                      }

                      if (error) {
                        return (
                          <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>
                        ) as React.ReactNode;
                      }
                      if (data && data.CursusSessies.length !== 1) {
                        return (
                          <PanelBody>
                            <Alert>Bijeenkomst is niet gevonden.</Alert>
                            <Link to="/bijeenkomsten-zoeken/op-locatie">Terug naar de lijst</Link>
                          </PanelBody>
                        ) as React.ReactNode;
                      }

                      return (
                        data &&
                        ((
                          <NormalCourseDetailsContainer
                            routerProps={routerProps}
                            details={data.CursusSessies[0]}
                          />
                        ) as React.ReactNode)
                      );
                    }}
                  </Query>
                );
              }}
            />

            <Route
              exact={true}
              path="/bijeenkomsten-zoeken/online/informatie-en-aanmelden/:courseId"
              render={(routerProps: any) => {
                return (
                  <Query<
                    { SearchSpecialties: IOnlineCourseDetails[] },
                    { input: { specialtyId: number; isOnlineCourse: boolean } }
                  >
                    query={SEARCH_SPECIALTIES}
                    variables={{
                      input: {
                        specialtyId: parseInt(routerProps.match.params.courseId, 10),
                        isOnlineCourse: true,
                      },
                    }}
                  >
                    {({ loading, data, error }) => {
                      if (loading) {
                        return (
                          <PanelBody>
                            <Spinner />
                          </PanelBody>
                        ) as React.ReactNode;
                      }

                      if (error) {
                        return (
                          <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>
                        ) as React.ReactNode;
                      }
                      if (data && data.SearchSpecialties.length !== 1) {
                        return (
                          <PanelBody>
                            <Alert>Bijeenkomst is niet gevonden.</Alert>
                            <Link to="/bijeenkomsten-zoeken/online">Terug naar de lijst</Link>
                          </PanelBody>
                        ) as React.ReactNode;
                      }

                      return (
                        data &&
                        ((
                          <OnlineCourseDetailsContainer
                            routerProps={routerProps}
                            details={data.SearchSpecialties[0]}
                          />
                        ) as React.ReactNode)
                      );
                    }}
                  </Query>
                );
              }}
            />

            <Route
              exact={true}
              path="/bijeenkomsten-zoeken/op-locatie"
              render={(routerProps: any) => {
                setSeenOverview(true);
                return <NormalCoursesForm {...routerProps} isOnline={false} />;
              }}
            />
            <Route
              exact={true}
              path="/bijeenkomsten-zoeken/online"
              render={(routerProps: any) => {
                setSeenOverview(true);
                return <OnlineCoursesForm {...routerProps} isOnline={true} />;
              }}
            />
          </LicenseChooser>
        </Switch>
      </SelectedLicenseContext.Provider>
    </Panel>
  );
}
