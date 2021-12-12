import React, { useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { OnlineCourseDetailsAnonymousContainer } from './OnlineCourseDetailsAnonymousContainer';
import { OnlineCourseDetailsForUserContainer } from './OnlineCourseDetailsForUserContainer';

const OnlineCourseDetailsContainer: React.FC = (props) => {
  const location = useLocation();
  const { courseId } = useParams<'courseId'>();
  const licenseId = useContext(SelectedLicenseContext);
  const returnToListLink = (
    <Link
      style={{ marginLeft: '15px' }}
      to={`/bijeenkomsten-zoeken/online${props && location && location.search}`}
    >
      Terug naar de lijst
    </Link>
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const specialtyId = parseInt(courseId!, 10);

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
};

export default OnlineCourseDetailsContainer;
