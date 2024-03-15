import React from 'react';
import { ERKENNINGEN_LOGIN_URL } from '@erkenningen/config/dist/index';
import { Alert } from '@erkenningen/ui/components/alert';
import { Button } from '@erkenningen/ui/components/button';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { Row } from '@erkenningen/ui/layout/row';
import { Col } from '@erkenningen/ui/layout/col';
import { WebinarDetailsCursusSessie } from './WebinarDetailsCursusSessie';
import { useGetCursusSessiesQuery } from '../../generated/graphql';

interface WebinarDetailsAnonymousContainerProps {
  courseId: number;
  returnToListLink: JSX.Element;
}

export const WebinarDetailsAnonymousContainer = ({
  courseId,
  returnToListLink,
}: WebinarDetailsAnonymousContainerProps) => {
  const { loading, data, error } = useGetCursusSessiesQuery({
    variables: {
      input: {
        currentCourseId: courseId,
        isOnlineCourse: false,
        isWebinar: true,
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

  const course = data;
  if (!course) {
    return null;
  }

  return (
    <>
      <WebinarDetailsCursusSessie details={course} />
      <PanelBody>
        <Row>
          <Col>
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
          </Col>
        </Row>
      </PanelBody>
    </>
  );
};
