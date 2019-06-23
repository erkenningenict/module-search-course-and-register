import React from 'react';
import { toDutchMoney } from '../../helpers/number-utils';
import { IOnlineCourseDetails } from '../../types/IFindOnlineCoursesRow';

interface IOnlineCourseDetailsProps {
  details: IOnlineCourseDetails;
  routerProps?: any;
}

export function OnlineCourseDetails(props: IOnlineCourseDetailsProps) {
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
    )
  );
}
