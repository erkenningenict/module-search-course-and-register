import { Alert, Button, Col, PanelBody, Row } from '@erkenningen/ui';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../shared/UserContext';
import { IOnlineCourseDetails } from '../../types/IFindOnlineCoursesRow';
import { Register } from '../Register';
import { OnlineCourseDetails } from './OnlineCourseDetails';

interface IOnlineCourseDetailsProps {
  details: IOnlineCourseDetails;
  routerProps?: any;
}

export function OnlineCourseDetailsContainer(props: IOnlineCourseDetailsProps) {
  const [showRegister, setShowRegister] = useState(false);
  const user = useContext(UserContext);
  const data: IOnlineCourseDetails = props && props.details && props.details;

  return props.details && !showRegister ? (
    <>
      <OnlineCourseDetails details={data} />
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
                  onClick={() => props.routerProps.history.push('/Default.aspx?tabid=154')}
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
        code: data.Code,
        courseId: data.SpecialtyId.toString(),
        isDigitalSpecialty: true,
        title: data.Title,
        courseDateTime: new Date(),
        specialtyId: parseInt(data.SpecialtyId, 10),
      }}
      onCancel={() => setShowRegister(false)}
    />
  );
}
