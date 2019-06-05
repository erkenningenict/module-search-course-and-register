import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { Route, Switch } from 'react-router-dom';
import { COURSE_SESSIONS_QUERY } from '../../../shared/Queries';
import { SelectedLicenseContext } from '../../../shared/SelectedLicenseContext';
import { NormalCourseDetails } from '../../NormalCourses/NormalCourseDetails';
import { NormalCoursesForm } from '../../NormalCourses/NormalCoursesForm';
import { OnlineCoursesForm } from '../../OnlineCourses/OnlineCoursesForm';
import Alert from '../../ui/Alert';
import Panel from '../../ui/Panel';
import Spinner from '../../ui/Spinner';
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
                          <div>
                            <Spinner />
                          </div>
                        ) as React.ReactElement;
                      }

                      if (error) {
                        return (
                          <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>
                        ) as React.ReactElement;
                      }
                      // if (!data) {
                      //   return null;
                      // }

                      if (data && data.CursusSessies.length !== 1) {
                        return <Alert>Bijeenkomst is niet gevonden.</Alert> as React.ReactElement;
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
                return <NormalCoursesForm {...routerProps} isOnline={true} />;
              }}
            />
          </LicenseChooser>
        </Switch>
      </SelectedLicenseContext.Provider>
    </Panel>
  );
}
