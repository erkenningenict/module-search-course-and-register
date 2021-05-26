import { useQuery } from '@apollo/client';
import { ERKENNINGEN_LOGIN_URL } from '@erkenningen/config';
import { Alert } from '@erkenningen/ui/components/alert';
import { Button } from '@erkenningen/ui/components/button';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { Row } from '@erkenningen/ui/layout/row';
import { Col } from '@erkenningen/ui/layout/col';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../shared/Auth';
import {
  COURSE_SESSION_DETAILS,
  IIsLicenseValidForSpecialty,
  SEARCH_COURSE_SESSIONS,
} from '../../shared/Queries';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { INormalCourseDetails } from '../../types/IFindNormalCoursesRow';
import { Register } from '../Register';
import { NormalCourseDetails } from './NormalCourseDetails';

interface IInputVariables {
  input: { currentCourseId: number; isOnlineCourse: boolean };
  inputCheck?: { licenseId: number; courseId: number };
}

export function NormalCourseDetailsContainer(props: any) {
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
  let variables: IInputVariables = {
    input: {
      currentCourseId: parseInt(props.match.params.courseId, 10),
      isOnlineCourse: false,
    },
  };
  if (licenseId && licenseId !== 0) {
    variables = {
      ...variables,
      inputCheck: {
        licenseId,
        courseId: parseInt(props.match.params.courseId, 10),
      },
    };
  }
  const { loading, data, error } = useQuery<
    {
      CursusSessies: INormalCourseDetails[];
      isLicenseValidForSpecialty: IIsLicenseValidForSpecialty;
    },
    IInputVariables
  >(licenseId && licenseId !== 0 ? COURSE_SESSION_DETAILS : SEARCH_COURSE_SESSIONS, {
    variables,
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
      <PanelBody>
        <Alert type="danger">Er is een fout opgetreden, probeer het later opnieuw.</Alert>
        {returnToListLink}
      </PanelBody>
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

  const getCourseDateTime = () => {
    const d = new Date(course.Date);
    const timeParts = course.StartTime.split(':');

    d.setHours(parseInt(timeParts[0], 10));
    d.setMinutes(parseInt(timeParts[1], 10));

    return d;
  };

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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {data.isLicenseValidForSpecialty.success && (
                  <Button
                    label="Aanmelden"
                    onClick={() => setShowRegister(true)}
                    icon="pi pi-check"
                  />
                )}
                {returnToListLink}
              </div>
            ) : (
              <>
                <Alert type="warning">
                  <div style={{ textAlign: 'left', fontWeight: 600 }}>
                    U kunt nog niet aanmelden omdat u niet bent ingelogd. Klik op Inloggen om aan te
                    melden om eerst in te loggen, keer dan hier terug om u aan te melden.
                  </div>
                </Alert>
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                </div>
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
        // courseDateTime: addMinutes(
        //   addMinutes(
        //     addHours(new Date(course.Date), parseInt(course.StartTime.split(':')[0], 10)),
        //     parseInt(course.StartTime.split(':')[1], 10),
        //   ),
        //   timezoneOffset,
        // ),
        courseDateTime: getCourseDateTime(),
        isDigitalSpecialty: false,
        title: course.Title,
        specialtyId: course.SpecialtyId,
      }}
      onCancel={() => setShowRegister(false)}
    />
  );
}
