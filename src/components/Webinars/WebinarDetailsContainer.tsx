import React, { useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { WebinarDetailsAnonymousContainer } from './WebinarDetailsAnonymousContainer';
import { WebinarDetailsForUserContainer } from './WebinarDetailsForUserContainer';

export function WebinarDetailsContainer() {
  const location = useLocation();
  const params = useParams<'courseId'>();
  const licenseId = useContext(SelectedLicenseContext);
  const returnToListLink = (
    <Link style={{ marginLeft: '15px' }} to={`/bijeenkomsten-zoeken/webinars${location.search}`}>
      Terug naar de lijst
    </Link>
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const courseId = parseInt(params.courseId!, 10);

  if (licenseId && licenseId !== 0) {
    return (
      <WebinarDetailsForUserContainer
        returnToListLink={returnToListLink}
        courseId={courseId}
      ></WebinarDetailsForUserContainer>
    );
  } else {
    return (
      <WebinarDetailsAnonymousContainer
        returnToListLink={returnToListLink}
        courseId={courseId}
      ></WebinarDetailsAnonymousContainer>
    );
  }
}
