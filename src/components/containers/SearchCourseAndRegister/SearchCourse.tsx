import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { Link, Route, Switch } from 'react-router-dom';
import { COURSE_SESSIONS_QUERY, SEARCH_SPECIALTIES } from '../../../shared/Queries';
import { SelectedLicenseContext } from '../../../shared/SelectedLicenseContext';
import { NormalCourseDetails } from '../../NormalCourses/NormalCourseDetails';
import { NormalCoursesForm } from '../../NormalCourses/NormalCoursesForm';
import { OnlineCourseDetails } from '../../OnlineCourses/OnlineCourseDetails';
import { OnlineCoursesForm } from '../../OnlineCourses/OnlineCoursesForm';
import Alert from '../../ui/Alert';
import Panel from '../../ui/Panel';
import Spinner from '../../ui/Spinner';
import { LicenseChooser } from '../LicenseChooser';

export function SearchCourse(props: any) {
  const [licenseId, setLicenseId] = useState(0);
  const [seenOverview, setSeenOverview] = useState(false);
  // console.log('#DH# et', window.location.hash.match('online') === null);
  // if (window.location.hash.match('online') !== null) {
  //   setIsOnline(true);
  // }
  return (
    <Panel title="Zoek bijeenkomst en aanmelden" doNotIncludeBody={true}>
      {/* <div className="panel-body">
        <h3>Zoek een {isOnline ? 'bijeenkomst op locatie' : 'online bijeenkomst'}.</h3>
      </div> */}
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
                  <Query
                    query={COURSE_SESSIONS_QUERY}
                    variables={{
                      input: {
                        currentCourseId: parseInt(routerProps.match.params.courseId, 10),
                        isOnlineCourse: false,
                      },
                    }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) {
                        return (
                          <div className="panel-body">
                            <Spinner />
                          </div>
                        ) as React.ReactElement;
                      }

                      if (error) {
                        return (
                          <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>
                        ) as React.ReactElement;
                      }
                      if (data && data.CursusSessies.length !== 1) {
                        return (
                          <div className="panel-body">
                            <Alert>Bijeenkomst is niet gevonden.</Alert>
                            <Link to="/bijeenkomsten-zoeken/op-locatie">Terug naar de lijst</Link>
                          </div>
                        ) as React.ReactElement;
                      }

                      return (
                        <NormalCourseDetails
                          routerProps={routerProps}
                          details={data.CursusSessies[0]}
                        />
                      ) as React.ReactElement;
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
                  <Query
                    query={SEARCH_SPECIALTIES}
                    variables={{
                      input: {
                        specialtyId: parseInt(routerProps.match.params.courseId, 10),
                        isOnlineCourse: true,
                      },
                    }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) {
                        return (
                          <div className="panel-body">
                            <Spinner />
                          </div>
                        ) as React.ReactElement;
                      }

                      if (error) {
                        return (
                          <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>
                        ) as React.ReactElement;
                      }
                      if (data && data.SearchSpecialties.length !== 1) {
                        return (
                          <div className="panel-body">
                            <Alert>Bijeenkomst is niet gevonden.</Alert>
                            <Link to="/bijeenkomsten-zoeken/online">Terug naar de lijst</Link>
                          </div>
                        ) as React.ReactElement;
                      }

                      return (
                        <OnlineCourseDetails
                          routerProps={routerProps}
                          details={data.SearchSpecialties[0]}
                        />
                      ) as React.ReactElement;
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
