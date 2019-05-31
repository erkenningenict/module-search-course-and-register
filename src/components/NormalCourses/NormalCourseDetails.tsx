import moment from 'moment';
import { Button } from 'primereact/button';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toDutchDate } from '../../helpers/date-utils';
import { UserContext } from '../../shared/UserContext';
import { INormalCourseDetails } from '../../types/IFindNormalCoursesRow';
import Alert from '../ui/Alert';
import Col from '../ui/Col';
import Row from '../ui/Row';
import { toDutchMoney } from './../../helpers/number-utils';
import { Register } from './Register';

interface INormalCourseDetailsProps {
  details: INormalCourseDetails;
  routerProps?: any;
}

export function NormalCourseDetails(props: INormalCourseDetailsProps) {
  const [showRegister, setShowRegister] = useState(false);
  const user = useContext(UserContext);
  const data: INormalCourseDetails = props && props.details && props.details;
  const address = data && data.LocationAddress;
  const locationAddress = address && (
    <>
      {address.Street} {address.HouseNr}
      {address.HouseNrExtension || ''}, {address.Zipcode} {address.City}
    </>
  );
  const organizerDetails = data && (
    <>
      {data.Organizer}
      {data.OrganizerPhone && <>, telefoon: {data.OrganizerPhone || 'onbekend'}</>}
      {data.OrganizerEmail && (
        <>
          , email: <a href={`mailto:${data.OrganizerEmail}`}>{data.OrganizerEmail}</a>
        </>
      )}
    </>
  );

  return props.details && !showRegister ? (
    <>
      <table className="table table-striped">
        <tbody>
          <tr>
            <td>
              <strong>Titel</strong>
            </td>
            <td>{data.Title}</td>
          </tr>
          <tr>
            <td>
              <strong>Datum/tijd</strong>
            </td>
            <td>
              {toDutchDate(data.Date)} {data.StartTime} - {data.EndTime}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Erkenningsnummer</strong>
            </td>
            <td>{data.CourseCode}</td>
          </tr>
          <tr>
            <td>
              <strong>Thema</strong>
            </td>
            <td>{data.Theme}</td>
          </tr>
          <tr>
            <td>
              <strong>Licentie</strong>
            </td>
            <td>{data.Competence}</td>
          </tr>
          <tr>
            <td>
              <strong>Promotietekst</strong>
            </td>
            <td>{data.PromoText}</td>
          </tr>
          <tr>
            <td>
              <strong>Opmerkingen</strong>
            </td>
            <td>{data.Remarks || 'geen'}</td>
          </tr>
          <tr>
            <td>
              <strong>Prijs</strong>
            </td>
            <td>{toDutchMoney(data.Price)} (incl. btw)</td>
          </tr>
          <tr>
            <td>
              <strong>Locatie</strong>
            </td>
            <td>
              {data.LocationName}
              <br />
              {locationAddress}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Organisator</strong>
            </td>
            <td>{organizerDetails}</td>
          </tr>
        </tbody>
      </table>
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
                <Link to="/bijeenkomsten-zoeken/op-locatie">Terug naar de lijst</Link>
              </>
            ) : (
              <>
                <Alert type="warning">
                  <div style={{ textAlign: 'left' }}>
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
          .toDate(),
        isDigitalSpecialty: false,
        title: data.Title,
      }}
      onCancel={() => setShowRegister(false)}
    />
  );
}
