import React, { useContext, useState } from 'react';
import { ERKENNINGEN_LOGIN_URL } from '@erkenningen/config/dist/index';
import { Alert } from '@erkenningen/ui/components/alert';
import { Button } from '@erkenningen/ui/components/button';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { Row } from '@erkenningen/ui/layout/row';
import { Col } from '@erkenningen/ui/layout/col';
import { UserContext } from '../../shared/Auth';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { Register } from '../Register';
import { WebinarDetailsCursusSessie } from './WebinarDetailsCursusSessie';
import { useGetCursusSessiesDetailsQuery } from '../../generated/graphql';

interface WebinarDetailsForUserContainerProps {
  courseId: number;
  returnToListLink: JSX.Element;
}

export function WebinarDetailsForUserContainer({
  courseId,
  returnToListLink,
}: WebinarDetailsForUserContainerProps) {
  const [showRegister, setShowRegister] = useState(false);
  const user = useContext(UserContext);
  const licenseId = useContext(SelectedLicenseContext);

  const { loading, data, error } = useGetCursusSessiesDetailsQuery({
    variables: {
      input: {
        currentCourseId: courseId,
        isOnlineCourse: false,
        isWebinar: true,
      },
      inputCheck: {
        courseId: courseId,
        licenseId: licenseId,
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
      <PanelBody>
        <Alert type="danger">Er is een fout opgetreden, probeer het later opnieuw.</Alert>
        {returnToListLink}
      </PanelBody>
    );
  }
  if (!data) {
    return null;
  }
  if (data && data.CursusSessies?.length !== 1) {
    return (
      <PanelBody>
        <Alert>Webinar is niet gevonden.</Alert>
        {returnToListLink}
      </PanelBody>
    );
  }

  const course = data.CursusSessies && data.CursusSessies[0];

  const getCourseDateTime = () => {
    const d = new Date(course?.Date);
    const timeParts = course?.StartTime.split(':');

    if (timeParts) {
      d.setHours(parseInt(timeParts[0], 10));
      d.setMinutes(parseInt(timeParts[1], 10));
    }

    return d;
  };

  return course && !showRegister ? (
    <>
      {user && !data.isLicenseValidForSpecialty.success && (
        <PanelBody>
          <Alert type="danger">
            <h4>
              Door het volgen van deze webinar kunt u uw (geselecteerde) licentie NIET verlengen.
            </h4>
            Zoek een bijeenkomst of webinar van een ander bijeenkomsttype waarmee u uw licentie wel
            kunt verlengen of kies een andere licentie (indien u meerdere licenties bezit).
          </Alert>
        </PanelBody>
      )}
      <WebinarDetailsCursusSessie details={data} />
      <PanelBody>
        <Row>
          <Col>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {data.isLicenseValidForSpecialty.success && (
                  <Button
                    label="Aanmelden via Bureau Erkenningen"
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
      returnToListLink={returnToListLink}
      registerCourseDetails={{
        code: course?.CourseCode || '',
        courseId: course?.CourseId?.toString() || '',
        courseDateTime: getCourseDateTime(),
        isDigitalSpecialty: false,
        title: course?.Title || '',
        specialtyId: course?.SpecialtyId || 0,
      }}
      onCancel={() => setShowRegister(false)}
    />
  );
}
