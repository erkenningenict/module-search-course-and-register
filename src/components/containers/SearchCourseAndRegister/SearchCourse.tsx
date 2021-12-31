import React, { useState } from 'react';
import { Panel } from '@erkenningen/ui/layout/panel';
import { Outlet, Route, Routes } from 'react-router-dom';
import { SelectedLicenseContext } from '../../../shared/SelectedLicenseContext';
import { NormalCourseDetailsContainer } from '../../NormalCourses/NormalCourseDetailsContainer';
import NormalCoursesForm from '../../NormalCourses/NormalCoursesForm';
import OnlineCourseDetailsContainer from '../../OnlineCourses/OnlineCourseDetailsContainer';
import OnlineCoursesForm from '../../OnlineCourses/OnlineCoursesForm';
import LicenseChooser from '../LicenseChooser';

export function SearchCourse() {
  const [licenseId, setLicenseId] = useState(0);
  const [seenOverview, setSeenOverview] = useState(false);

  return (
    <Panel title="Zoek bijeenkomst en aanmelden" doNotIncludeBody={true}>
      <SelectedLicenseContext.Provider value={licenseId}>
        <Routes>
          <Route
            element={
              <LicenseChooser
                setLicenseId={(id: number) => setLicenseId(id)}
                seenOverview={seenOverview}
              >
                <Outlet></Outlet>
              </LicenseChooser>
            }
          >
            <Route
              path="op-locatie"
              element={
                <NormalCoursesForm
                  isOnline={false}
                  seenOverview={(seen) => setSeenOverview(seen)}
                />
              }
            ></Route>
            <Route
              path="online"
              element={
                <OnlineCoursesForm isOnline={true} seenOverview={(seen) => setSeenOverview(seen)} />
              }
            />
            <Route path="*" element={<div>Niet gevonden.</div>} />
          </Route>
          <Route
            path="op-locatie/informatie-en-aanmelden/:courseId"
            element={<NormalCourseDetailsContainer />}
          />
          <Route
            path="online/informatie-en-aanmelden/:courseId"
            element={<OnlineCourseDetailsContainer />}
          />
        </Routes>
      </SelectedLicenseContext.Provider>
    </Panel>
  );
}
