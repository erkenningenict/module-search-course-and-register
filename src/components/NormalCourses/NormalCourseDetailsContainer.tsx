import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { NormalCourseDetailsAnonymousContainer } from './NormalCourseDetailsAnonymousContainer';
import { NormalCourseDetailsForUserContainer } from './NormalCourseDetailsForUserContainer';

export function NormalCourseDetailsContainer(props: any) {
  const licenseId = useContext(SelectedLicenseContext);
  const returnToListLink = (
    <Link
      to={`/bijeenkomsten-zoeken/op-locatie${props && props.location && props.location.search}`}
    >
      Terug naar de lijst
    </Link>
  );

  const courseId = parseInt(props.match.params.courseId, 10);

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
