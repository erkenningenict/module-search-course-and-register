import { Alert, Button, Col, Row } from '@erkenningen/ui';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const user = useContext(UserContext);
  const data: INormalCourseDetails = props && props.details && props.details;
  const timezoneOffset: number = new Date(data.Date).getTimezoneOffset();

  return props.details && !showRegister ? (
    <>
      <NormalCourseDetails details={props.details} />
      <div className="panel-body">
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
                  onClick={() => props.routerProps.history.push('/Default.aspx?tabid=154')}
                  icon="pi pi-check"
                />
                <Link to="/bijeenkomsten-zoeken/op-locatie">Terug naar de lijst</Link>
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <Register
      registerCourseDetails={{
        code: data.CourseCode,
        courseId: data.CourseId.toString(),
        courseDateTime: moment(data.Date)
          .add(data.StartTime.split(':')[0], 'hours')
          .add(data.StartTime.split(':')[1], 'minutes')
          .add(timezoneOffset, 'minutes')
          .toDate(),
        isDigitalSpecialty: false,
        title: data.Title,
        specialtyId: data.SpecialtyId,
      }}
      onCancel={() => setShowRegister(false)}
    />
  );
}
