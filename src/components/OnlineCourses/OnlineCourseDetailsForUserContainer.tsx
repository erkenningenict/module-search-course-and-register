import React, { useContext, useState } from 'react';
import { ERKENNINGEN_LOGIN_URL } from '@erkenningen/config';
import { Alert } from '@erkenningen/ui/components/alert';
import { Button } from '@erkenningen/ui/components/button';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { Row } from '@erkenningen/ui/layout/row';
import { Col } from '@erkenningen/ui/layout/col';
import { UserContext } from '../../shared/Auth';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { Register } from '../Register';
import { OnlineCourseDetailsSearchSpecialties } from './OnlineCourseDetailsSearchSpecialties';
import { useGetSpecialtyDetailsQuery } from '../../generated/graphql';

interface OnlineCourseDetailsForUserContainerProps {
  specialtyId: number;
  returnToListLink: JSX.Element;
}

export function OnlineCourseDetailsForUserContainer({
  specialtyId,
  returnToListLink,
}: OnlineCourseDetailsForUserContainerProps) {
  const [showRegister, setShowRegister] = useState(false);
  const user = useContext(UserContext);
  const licenseId = useContext(SelectedLicenseContext);

  const { loading, data, error } = useGetSpecialtyDetailsQuery({
    variables: {
      input: {
        specialtyId,
        isOnlineCourse: true,
      },
      inputCheck: {
        licenseId,
        specialtyId,
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
  const specialty = data.SearchSpecialties && data.SearchSpecialties[0];
  return specialty && !showRegister ? (
    <>
      {user && data.isLicenseValidForSpecialty && !data.isLicenseValidForSpecialty.success && (
        <PanelBody>
          <Alert type="danger">
            <h4>
              Door het volgen van deze online bijeenkomst kunt u uw (geselecteerde) licentie NIET
              verlengen.
            </h4>
            Zoek een bijeenkomst van een ander bijeenkomsttype waarmee u uw licentie wel kunt
            verlengen of kies een andere licentie (indien u meerdere licenties bezit).
          </Alert>
        </PanelBody>
      )}
      <OnlineCourseDetailsSearchSpecialties details={data} />
      <PanelBody>
        <Row>
          <Col>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {data.isLicenseValidForSpecialty && data.isLicenseValidForSpecialty.success && (
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
        code: specialty.Code,
        courseId: specialty.SpecialtyId.toString(),
        isDigitalSpecialty: true,
        title: specialty.Title,
        courseDateTime: new Date(),
        specialtyId: specialty.SpecialtyId,
      }}
      onCancel={() => setShowRegister(false)}
    />
  );
}
