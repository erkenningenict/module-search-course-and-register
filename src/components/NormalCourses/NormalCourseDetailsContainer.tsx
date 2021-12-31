import React, { useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { NormalCourseDetailsAnonymousContainer } from './NormalCourseDetailsAnonymousContainer';
import { NormalCourseDetailsForUserContainer } from './NormalCourseDetailsForUserContainer';

export function NormalCourseDetailsContainer() {
  const location = useLocation();
  const params = useParams<'courseId'>();
  const licenseId = useContext(SelectedLicenseContext);
  const returnToListLink = (
    <Link style={{ marginLeft: '15px' }} to={`/bijeenkomsten-zoeken/op-locatie${location.search}`}>
      Terug naar de lijst
    </Link>
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const courseId = parseInt(params.courseId!, 10);

  if (licenseId && licenseId !== 0) {
    return (
      <NormalCourseDetailsForUserContainer
        returnToListLink={returnToListLink}
        courseId={courseId}
      ></NormalCourseDetailsForUserContainer>
    );
  } else {
    return (
      <NormalCourseDetailsAnonymousContainer
        returnToListLink={returnToListLink}
        courseId={courseId}
      ></NormalCourseDetailsAnonymousContainer>
    );
  }
}
