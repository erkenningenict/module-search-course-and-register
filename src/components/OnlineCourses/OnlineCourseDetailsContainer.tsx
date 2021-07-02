import React, { useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { OnlineCourseDetailsAnonymousContainer } from './OnlineCourseDetailsAnonymousContainer';
import { OnlineCourseDetailsForUserContainer } from './OnlineCourseDetailsForUserContainer';

interface OnlineCourseDetailsContainerProps extends RouteComponentProps<any> {
  routerProps?: any;
}

export function OnlineCourseDetailsContainer(props: OnlineCourseDetailsContainerProps) {
  const licenseId = useContext(SelectedLicenseContext);
  const returnToListLink = (
    <Link to={`/bijeenkomsten-zoeken/online${props && props.location && props.location.search}`}>
      Terug naar de lijst
    </Link>
  );

  const specialtyId = parseInt(props.match.params.courseId, 10);

  if (licenseId && licenseId !== 0) {
    return (
      <OnlineCourseDetailsForUserContainer
        returnToListLink={returnToListLink}
        specialtyId={specialtyId}
      ></OnlineCourseDetailsForUserContainer>
    );
  } else {
    return (
      <OnlineCourseDetailsAnonymousContainer
        returnToListLink={returnToListLink}
        specialtyId={specialtyId}
      ></OnlineCourseDetailsAnonymousContainer>
    );
  }
}
