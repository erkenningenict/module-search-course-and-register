import { useQuery } from '@apollo/react-hooks';
import { ERKENNINGEN_LOGIN_URL } from '@erkenningen/config';
import { Alert, Button, Col, PanelBody, Row, Spinner } from '@erkenningen/ui';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IIsLicenseValidForSpecialty, SPECIALTY_DETAILS } from '../../shared/Queries';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { UserContext } from '../../shared/UserContext';
import { IOnlineCourseDetails } from '../../types/IFindOnlineCoursesRow';
import { Register } from '../Register';
import { OnlineCourseDetails } from './OnlineCourseDetails';

interface IOnlineCourseDetailsProps {
  routerProps?: any;
}

export function OnlineCourseDetailsContainer(props: IOnlineCourseDetailsProps) {
  const [showRegister, setShowRegister] = useState(false);
  const user = useContext(UserContext);
  const licenseId = useContext(SelectedLicenseContext);
  const { loading, data, error } = useQuery<
    {
      SearchSpecialties: IOnlineCourseDetails[];
      isLicenseValidForSpecialty: IIsLicenseValidForSpecialty;
    },
    {
      input: { specialtyId: number; isOnlineCourse: boolean };
      inputCheck: { licenseId: number; specialtyId: number };
    }
  >(SPECIALTY_DETAILS, {
    variables: {
      input: {
        specialtyId: parseInt(props.routerProps.match.params.courseId, 10),
        isOnlineCourse: true,
      },
      inputCheck: {
        licenseId,
        specialtyId: parseInt(props.routerProps.match.params.courseId, 10),
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
    return <Alert>Er is een fout opgetreden, probeer het later opnieuw.</Alert>;
  }
  if (!data) {
    return null;
  }
  if (data.SearchSpecialties.length !== 1) {
    return (
      <PanelBody>
        <Alert>Bijeenkomst is niet gevonden.</Alert>
        <Link to="/bijeenkomsten-zoeken/online">Terug naar de lijst</Link>
      </PanelBody>
    );
  }
  const specialty: IOnlineCourseDetails = data.SearchSpecialties[0];
  return specialty && !showRegister ? (
    <>
      {user && !data.isLicenseValidForSpecialty.success && (
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
      <OnlineCourseDetails details={specialty} />
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
                <Link to="/bijeenkomsten-zoeken/online">Terug naar de lijst</Link>
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
                <Link to="/bijeenkomsten-zoeken/online">Terug naar de lijst</Link>
              </>
            )}
          </Col>
        </Row>
      </PanelBody>
    </>
  ) : (
    <Register
      registerCourseDetails={{
        code: specialty.Code,
        courseId: specialty.SpecialtyId.toString(),
        isDigitalSpecialty: true,
        title: specialty.Title,
        courseDateTime: new Date(),
        specialtyId: parseInt(specialty.SpecialtyId, 10),
      }}
      onCancel={() => setShowRegister(false)}
    />
  );
}
