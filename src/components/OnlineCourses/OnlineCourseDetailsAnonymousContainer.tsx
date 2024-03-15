import React from 'react';
import { ERKENNINGEN_LOGIN_URL } from '@erkenningen/config/dist/index';
import { Alert } from '@erkenningen/ui/components/alert';
import { Button } from '@erkenningen/ui/components/button';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { Row } from '@erkenningen/ui/layout/row';
import { Col } from '@erkenningen/ui/layout/col';
import { OnlineCourseDetailsSearchSpecialties } from './OnlineCourseDetailsSearchSpecialties';
import { useGetSearchSpecialtiesQuery } from '../../generated/graphql';

interface OnlineCourseDetailsAnonymousContainerProps {
  specialtyId: number;
  returnToListLink: JSX.Element;
}

export function OnlineCourseDetailsAnonymousContainer({
  specialtyId,
  returnToListLink,
}: OnlineCourseDetailsAnonymousContainerProps) {
  const { loading, data, error } = useGetSearchSpecialtiesQuery({
    variables: {
      input: {
        specialtyId: specialtyId,
        isOnlineCourse: true,
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
  if (data?.SearchSpecialties?.length !== 1) {
    return (
      <PanelBody>
        <Alert>Bijeenkomst is niet gevonden.</Alert>
        {returnToListLink}
      </PanelBody>
    );
  }
  const specialty = data;
  if (!specialty) {
    return null;
  }
  return (
    <>
      <OnlineCourseDetailsSearchSpecialties details={specialty} />
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
}
