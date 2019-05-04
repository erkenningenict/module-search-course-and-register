import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';
import { IFindNormalCoursesRow } from '../../types/IFindNormalCoursesRow';
import Panel from './../../components/ui/Panel';
import { toDutchMoney } from './../../helpers/number-utils';

interface INormalCourseDetailsProps {
  details: IFindNormalCoursesRow;
  visible: boolean;
  hideDialog: any;
}

export function NormalCourseDetails(props: INormalCourseDetailsProps) {
  const data: IFindNormalCoursesRow = props && props.details && props.details;
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

  const footer = (
    <div>
      <Button label="Aanmelden" icon="pi pi-check" />
    </div>
  );
  return props.details ? (
    <Dialog
      header="Bijeenkomst"
      visible={props.visible}
      modal={true}
      style={{ width: '80vw' }}
      footer={footer}
      onHide={() => props.hideDialog(true)}
    >
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
            <td>{data.Promotext}</td>
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
    </Dialog>
  ) : null;
}
