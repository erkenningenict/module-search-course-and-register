import { useQuery } from '@apollo/react-hooks';
import { ERKENNINGEN_LOGIN_URL } from '@erkenningen/config';
import { Alert, Button, Col, PanelBody, Row, Spinner } from '@erkenningen/ui';
import { addHours, addMinutes } from 'date-fns';
import React, { useContext, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { COURSE_SESSION_DETAILS, IIsLicenseValidForSpecialty } from '../../shared/Queries';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { UserContext } from '../../shared/UserContext';
import { INormalCourseDetails } from '../../types/IFindNormalCoursesRow';
import { Register } from '../Register';
import { NormalCourseDetails } from './NormalCourseDetails';

interface INormalCourseDetailsProps extends RouteComponentProps<any> {}

export function NormalCourseDetailsContainer(props: INormalCourseDetailsProps) {
  const [showRegister, setShowRegister] = useState(false);
  const user = useContext(UserContext);
  const licenseId = useContext(SelectedLicenseContext);
  const returnToListLink = (
    <Link
      to={`/bijeenkomsten-zoeken/op-locatie${props && props.location && props.location.search}`}
    >
      Terug naar de lijst
    </Link>
  );
  const { loading, data, error } = useQuery<
    {
      CursusSessies: INormalCourseDetails[];
      isLicenseValidForSpecialty: IIsLicenseValidForSpecialty;
    },
    {
      input: { currentCourseId: number; isOnlineCourse: boolean };
      inputCheck: { licenseId: number; courseId: number };
    }
  >(COURSE_SESSION_DETAILS, {
    variables: {
      input: {
        currentCourseId: parseInt(props.match.params.courseId, 10),
        isOnlineCourse: false,
      },
      inputCheck: {
        licenseId,
        courseId: parseInt(props.match.params.courseId, 10),
      },
    },
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return (
      <PanelBody>
        <Spinner />
      </PanelBody>
    );
  }

  if (error) {
    return (
      <>
        <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>
        {returnToListLink}
      </>
    );
  }
  if (!data) {
    return null;
  }
  if (data && data.CursusSessies.length !== 1) {
    return (
      <PanelBody>
        <Alert>Bijeenkomst is niet gevonden.</Alert>
        {returnToListLink}
      </PanelBody>
    );
  }

  const course: INormalCourseDetails = data.CursusSessies[0];
  const timezoneOffset: number = new Date(course.Date).getTimezoneOffset();

  return course && !showRegister ? (
    <>
      {user && !data.isLicenseValidForSpecialty.success && (
        <PanelBody>
          <Alert type="danger">
            <h4>
              Door het volgen van deze bijeenkomst kunt u uw (geselecteerde) licentie NIET
              verlengen.
            </h4>
            Zoek een bijeenkomst van een ander bijeenkomsttype waarmee u uw licentie wel kunt
            verlengen of kies een andere licentie (indien u meerdere licenties bezit).
          </Alert>
        </PanelBody>
      )}
      <NormalCourseDetails details={course} />
      <PanelBody>
        <Row>
          <Col>
            {user ? (
              <>
                {data.isLicenseValidForSpecialty.success && (
                  <Button
                    label="Aanmelden"
                    onClick={() => setShowRegister(true)}
                    icon="pi pi-check"
                  />
                )}
                {returnToListLink}
              </>
            ) : (
              <>
                <Alert type="warning">
                  <div style={{ textAlign: 'left', fontWeight: 600 }}>
                    U kunt nog niet aanmelden omdat u niet bent ingelogd. Klik op Inloggen om aan te
                    melden om eerst in te loggen, keer dan hier terug om u aan te melden.
                  </div>
                </Alert>
                <Button
                  label="Inloggen om aan te melden"
                  onClick={() => {
                    const { origin, href } = window.location;
                    const redirectUrl = `${ERKENNINGEN_LOGIN_URL}&returnurl=${encodeURIComponent(
                      href.replace(origin, ''),
                    )}`;
                    window.location.href = redirectUrl;
                  }}
                  icon="pi pi-check"
                />
                {returnToListLink}
              </>
            )}
          </Col>
        </Row>
      </PanelBody>
    </>
  ) : (
    <Register
      {...props}
      registerCourseDetails={{
        code: course.CourseCode,
        courseId: course.CourseId.toString(),
        courseDateTime: addMinutes(
          addMinutes(
            addHours(new Date(course.Date), parseInt(course.StartTime.split(':')[0], 10)),
            parseInt(course.StartTime.split(':')[1], 10),
          ),
          timezoneOffset,
        ),
        isDigitalSpecialty: false,
        title: course.Title,
        specialtyId: course.SpecialtyId,
      }}
      onCancel={() => setShowRegister(false)}
    />
  );
}
