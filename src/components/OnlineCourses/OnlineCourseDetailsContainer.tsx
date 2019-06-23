import { Button } from 'primereact/button';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../shared/UserContext';
import { IOnlineCourseDetails } from '../../types/IFindOnlineCoursesRow';
import { Register } from '../Register';
import Alert from '../ui/Alert';
import Col from '../ui/Col';
import Row from '../ui/Row';
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
      <div className="panel-body">
        <Row>
          <Col>
            {user ? (
              <>
                <Button
                  label="Aanmelden"
                  type="button"
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
                  type="button"
                  onClick={() => props.routerProps.history.push('/Default.aspx?tabid=154')}
                  icon="pi pi-check"
                />
                <Link to="/bijeenkomsten-zoeken/online">Terug naar de lijst</Link>
              </>
            )}
          </Col>
        </Row>
      </div>
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
