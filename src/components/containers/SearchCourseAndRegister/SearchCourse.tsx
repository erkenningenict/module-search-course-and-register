import { Panel } from '@erkenningen/ui/layout/panel';
import React, { useState } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { SelectedLicenseContext } from '../../../shared/SelectedLicenseContext';
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
              render={(routerProps: RouteComponentProps) => {
                return <NormalCourseDetailsContainer {...routerProps} />;
              }}
            />

            <Route
              exact={true}
              path="/bijeenkomsten-zoeken/online/informatie-en-aanmelden/:courseId"
              render={(routerProps: RouteComponentProps) => {
                return <OnlineCourseDetailsContainer {...routerProps} />;
              }}
            />

            <Route
              exact={true}
              path="/bijeenkomsten-zoeken/op-locatie"
              render={(routerProps: RouteComponentProps) => {
                return (
                  <NormalCoursesForm
                    {...routerProps}
                    isOnline={false}
                    seenOverview={(seen) => setSeenOverview(seen)}
                  />
                );
              }}
            />
            <Route
              exact={true}
              path="/bijeenkomsten-zoeken/online"
              render={(routerProps: RouteComponentProps) => {
                return (
                  <OnlineCoursesForm
                    {...routerProps}
                    isOnline={true}
                    seenOverview={(seen) => setSeenOverview(seen)}
                  />
                );
              }}
            />
          </LicenseChooser>
        </Switch>
      </SelectedLicenseContext.Provider>
    </Panel>
  );
}
