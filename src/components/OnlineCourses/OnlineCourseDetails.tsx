import { Button } from 'primereact/button';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../shared/UserContext';
import { IOnlineCourseDetails } from '../../types/IFindOnlineCoursesRow';
import { Register } from '../Register';
import Alert from '../ui/Alert';
import Col from '../ui/Col';
import Row from '../ui/Row';
import { toDutchMoney } from './../../helpers/number-utils';

interface IOnlineCourseDetailsProps {
  details: IOnlineCourseDetails;
  routerProps?: any;
}

export function OnlineCourseDetails(props: IOnlineCourseDetailsProps) {
  const [showRegister, setShowRegister] = useState(false);
  const user = useContext(UserContext);
  const data: IOnlineCourseDetails = props && props.details && props.details;
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
              <strong>Erkenningsnummer</strong>
            </td>
            <td>{data.Code}</td>
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
              <strong>Prijs</strong>
            </td>
            <td>{toDutchMoney(data.Price)} (incl. btw)</td>
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
      }}
      onCancel={() => setShowRegister(false)}
    />
  );
}
