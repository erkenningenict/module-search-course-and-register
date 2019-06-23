import React from 'react';
import { toDutchDate } from '../../helpers/date-utils';
import { toDutchMoney } from '../../helpers/number-utils';
import { INormalCourseDetails } from '../../types/IFindNormalCoursesRow';

interface INormalCourseDetailsProps {
  details: INormalCourseDetails;
  routerProps?: any;
}

export function NormalCourseDetails(props: INormalCourseDetailsProps) {
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

  return (
    props.details && (
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
            <td>{data.PromoText || 'onbekend'}</td>
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
            <td>{toDutchMoney(data.Price) || 'onbekend'} (incl. btw)</td>
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
    )
  );
}
