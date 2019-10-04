import { PanelBody, toDutchDate, toDutchMoney } from '@erkenningen/ui';
import React from 'react';
import { INormalCourseDetails } from '../../types/IFindNormalCoursesRow';
import OrganizerDetails from '../ui/OrganizerDetails';
import './NormalCourseDetails.scss';

interface INormalCourseDetailsProps {
  details: INormalCourseDetails;
}

export function NormalCourseDetails(props: INormalCourseDetailsProps) {
  const data: INormalCourseDetails = props && props.details && props.details;
  const address = data && data.LocationAddress;
  const locationAddress = address && (
    <div className="location-area">
      <p className="location-label">Locatie</p>
      <p>{data.LocationName}</p>
      <p>
        {address.Street} {address.HouseNr}
        {address.HouseNrExtension || ''}, {address.Zipcode} {address.City}
      </p>
    </div>
  );

  return (
    props.details && (
      <>
        <PanelBody>
          <div className="row">
            <div className="col-md-12">
              <div className="flex-container">
                <i className="fas fa-building online" />
                <div className="flex-container flex-col">
                  <h3 className="title">
                    <span>{data.Title}</span>
                  </h3>
                  <p className="code">Erkenningsnummer: {data.CourseCode}</p>
                </div>
              </div>
              <p>{data.PromoText || 'Er is geen promotietekst bekend'}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="price">
                <strong>
                  {toDutchDate(data.Date)}
                  <span>
                    {data.StartTime} - {data.EndTime}
                  </span>
                </strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="price">
                <strong>{toDutchMoney(data.Price, { euroPrefix: true })}</strong> (excl. btw)
              </div>
            </div>
          </div>
          <div className="row">{locationAddress}</div>
          <div className="row">
            <div className="col-md-6">
              <p className="characteristics">
                Thema: <strong>{data.Theme}</strong>
              </p>
            </div>
            <div className="col-md-6">
              <p className="characteristics">
                Bijeenkomsttype: <strong>{data.Competence}</strong>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">{data.Remarks}</div>
          </div>
          <OrganizerDetails data={data} />
        </PanelBody>
      </>
    )
  );
}
