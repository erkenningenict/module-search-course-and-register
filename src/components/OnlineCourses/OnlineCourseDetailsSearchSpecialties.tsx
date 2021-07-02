import React from 'react';
import { toDutchMoney } from '@erkenningen/ui/utils';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { GetSearchSpecialtiesQuery } from '../../generated/graphql';
import OrganizerDetailsSearchSpecialties from '../ui/OrganizerDetailsSearchSpecialties';

import './OnlineCourseDetails.scss';

interface OnlineCourseDetailsSearchSpecialtiesProps {
  details: GetSearchSpecialtiesQuery;
}

export function OnlineCourseDetailsSearchSpecialties(
  props: OnlineCourseDetailsSearchSpecialtiesProps,
) {
  const data = props.details?.SearchSpecialties && props.details?.SearchSpecialties[0];
  if (!data) {
    return null;
  }
  const aanbodWebsite = data.SpecialtyWebsite;
  return (
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
        <div className="row">
          <div className="col-md-6">
            <a
              className="btn btn-primary"
              style={{ margin: '15px 0' }}
              href={`https://${aanbodWebsite?.replace('https://', '')}`}
              target="_blank"
              rel="noreferrer"
            >
              Direct aanmelden bij aanbieder
            </a>
          </div>
        </div>
        <OrganizerDetailsSearchSpecialties data={props.details} />
      </PanelBody>
    </>
  );
}
