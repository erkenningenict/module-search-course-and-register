import { PanelBody, toDutchMoney } from '@erkenningen/ui';
import React from 'react';
import { IOnlineCourseDetails } from '../../types/IFindOnlineCoursesRow';

import OrganizerDetails from '../ui/OrganizerDetails';
import './OnlineCourseDetails.scss';

interface IOnlineCourseDetailsProps {
  details: IOnlineCourseDetails;
}

export function OnlineCourseDetails(props: IOnlineCourseDetailsProps) {
  const data: IOnlineCourseDetails = props && props.details && props.details;

  return (
    props.details && (
      <>
        <PanelBody>
          <div className="row">
            <div className="col-md-12">
              <div className="flex-container">
                <i className="fas fa-desktop online" />
                <div className="flex-container flex-col">
                  <h3 className="title">
                    <span>{data.Title}</span>
                  </h3>
                  <p className="code">Erkenningsnummer: {data.Code}</p>
                </div>
              </div>
              <p>{data.PromoText}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="price">
                <strong>{toDutchMoney(data.Price, { euroPrefix: true })}</strong> (excl. btw)
              </div>
            </div>
          </div>
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
          <OrganizerDetails data={data} />
        </PanelBody>
      </>
    )
  );
}
