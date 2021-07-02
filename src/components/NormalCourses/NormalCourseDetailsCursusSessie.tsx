import React from 'react';
import { toDutchDate, toDutchMoney } from '@erkenningen/ui/utils';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { GetCursusSessiesQuery } from '../../generated/graphql';
import OrganizerDetailsCursusSessie from '../ui/OrganizerDetailsCursusSessie';

import './NormalCourseDetails.scss';

interface INormalCourseDetailsCursusSessieProps {
  details: GetCursusSessiesQuery;
}

export function NormalCourseDetailsCursusSessie(props: INormalCourseDetailsCursusSessieProps) {
  const d = props.details?.CursusSessies && props.details?.CursusSessies[0];

  const address = d?.LocationAddress;
  const locationName = d?.LocationName;
  const aanbodWebsite = d?.SpecialtyWebsite;
  const locationAddress = address && (
    <div className="location-area">
      {(locationName === 'Webinar' || locationName === 'Online cursus') && (
        <>
          <p className="location-label">Webinar</p>
          {aanbodWebsite && aanbodWebsite !== null && (
            <a
              className="btn btn-primary"
              style={{ marginBottom: '15px' }}
              href={`https://${aanbodWebsite?.replace('https://', '')}`}
              target="_blank"
              rel="noreferrer"
            >
              Direct aanmelden bij aanbieder
            </a>
          )}
        </>
      )}

      {locationName !== 'Webinar' && locationName !== 'Online cursus' && (
        <>
          <p className="location-label">Locatie</p>
          <p>{locationName}</p>
          <p>
            {address.Street} {address.HouseNr}
            {address.HouseNrExtension || ''}, {address.Zipcode} {address.City}
          </p>
          {aanbodWebsite && aanbodWebsite !== null && (
            <a
              className="btn btn-primary"
              style={{ marginBottom: '15px' }}
              href={
                aanbodWebsite?.startsWith('www', 0) ? `https://${aanbodWebsite}` : aanbodWebsite
              }
              target="_blank"
              rel="noreferrer"
            >
              Direct aanmelden bij aanbieder
            </a>
          )}
        </>
      )}
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
                    <span>{d?.Title}</span>
                  </h3>
                  <p className="code">Erkenningsnummer: {d?.CourseCode}</p>
                </div>
              </div>
              <p>{d?.PromoText || 'Er is geen promotietekst bekend'}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="price">
                <strong>
                  {toDutchDate(d?.Date)}
                  <span>
                    {d?.StartTime} - {d?.EndTime}
                  </span>
                </strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="price">
                <strong>
                  {toDutchMoney(d?.Price, {
                    euroPrefix: true,
                  })}
                </strong>{' '}
                (excl. btw)
              </div>
            </div>
          </div>
          <div className="row">{locationAddress}</div>
          <div className="row">
            <div className="col-md-6">
              <p className="characteristics">
                Thema: <strong>{d?.Theme}</strong>
              </p>
            </div>
            <div className="col-md-6">
              <p className="characteristics">
                Bijeenkomsttype: <strong>{d?.Competence}</strong>
              </p>
            </div>
          </div>
          <OrganizerDetailsCursusSessie data={props.details} />
        </PanelBody>
      </>
    )
  );
}
