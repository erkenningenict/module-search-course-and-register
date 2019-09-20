import { ERKENNINGEN_LOGIN_URL } from '@erkenningen/config';
import { Alert, Button, Col, PanelBody, Row } from '@erkenningen/ui';
import { addHours, addMinutes } from 'date-fns';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { UserContext } from '../../shared/UserContext';
import { INormalCourseDetails } from '../../types/IFindNormalCoursesRow';
import { Register } from '../Register';
import { NormalCourseDetails } from './NormalCourseDetails';

interface INormalCourseDetailsProps {
  details: INormalCourseDetails;
  routerProps?: any;
}

export function NormalCourseDetailsContainer(props: INormalCourseDetailsProps) {
  const [showRegister, setShowRegister] = useState(false);
  // const {showRegister, setShowRegister} = useQuery();
  const user = useContext(UserContext);
  const licenseId = useContext(SelectedLicenseContext);
  const data: INormalCourseDetails = props && props.details && props.details;
  const timezoneOffset: number = new Date(data.Date).getTimezoneOffset();
  console.log('#DH# licenseid', licenseId);

  return props.details && !showRegister ? (
    <>
      <NormalCourseDetails details={props.details} />
      <PanelBody>
        <Row>
          <Col>
            {user ? (
              <>
                <Button
                  label="Aanmelden"
                  onClick={() => setShowRegister(true)}
                  icon="pi pi-check"
                />
                <Link to="/bijeenkomsten-zoeken/op-locatie">Terug naar de lijst</Link>
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
                <Link to="/bijeenkomsten-zoeken/op-locatie">Terug naar de lijst</Link>
              </>
            )}
          </Col>
        </Row>
      </PanelBody>
    </>
  ) : (
    <Register
      registerCourseDetails={{
        code: data.CourseCode,
        courseId: data.CourseId.toString(),
        courseDateTime: addMinutes(
          addMinutes(
            addHours(new Date(data.Date), parseInt(data.StartTime.split(':')[0], 10)),
            parseInt(data.StartTime.split(':')[1], 10),
          ),
          timezoneOffset,
        ),
        isDigitalSpecialty: false,
        title: data.Title,
        specialtyId: data.SpecialtyId,
      }}
      onCancel={() => setShowRegister(false)}
    />
  );
}
