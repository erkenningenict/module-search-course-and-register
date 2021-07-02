import React from 'react';
import { toDutchDate, toDutchMoney } from '@erkenningen/ui/utils';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import OrganizerDetails from '../ui/OrganizerDetails';
import '../NormalCourses/NormalCourseDetails.scss';
import { GetCursusDeelnameDetailsQuery } from '../../generated/graphql';

interface NormalCourseDetailsCursusDeelnameDetailsProps {
  details: GetCursusDeelnameDetailsQuery;
}

export function NormalCourseDetailsCursusDeelnameDetails({
  details,
}: NormalCourseDetailsCursusDeelnameDetailsProps) {
  if (!details) {
    return null;
  }
  const d = details?.CursusDeelnameDetails;

  const sessie = d?.Cursus?.Sessies && d?.Cursus?.Sessies[0];
  const address = sessie?.Lokatie?.Contactgegevens;
  const locationName = sessie?.Lokatie?.Naam;
  const aanbodWebsite = d?.Cursus?.Vak?.Website;
  const cursus = d?.Cursus;
  const locationAddress = address && (
    <div className="location-area">
      {(locationName === 'Webinar' || locationName === 'Online cursus') && (
        <>
          <p className="location-label">Webinar</p>
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

      {locationName !== 'Webinar' && locationName !== 'Online cursus' && (
        <>
          <p className="location-label">Locatie</p>
          <p>{locationName}</p>
          <p>
            {address.Adresregel1} {address.Huisnummer}
            {address.HuisnummerToevoeging || ''}, {address.Postcode} {address.Woonplaats}
          </p>
        </>
      )}
    </div>
  );

  return (
    <>
      <PanelBody>
        <div className="row">
          <div className="col-md-12">
            <div className="flex-container">
              <i className="fas fa-building online" />
              <div className="flex-container flex-col">
                <h3 className="title">
                  <span>{cursus?.Titel?.length === 0 ? cursus?.Vak?.Titel : cursus?.Titel}</span>
                </h3>
                <p className="code">Erkenningsnummer: {cursus?.CursusCode}</p>
              </div>
            </div>
            <p>
              {cursus?.Promotietekst?.length === 0
                ? cursus?.Vak.Promotietekst
                : cursus?.Promotietekst || 'Er is geen promotietekst bekend'}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="price">
              <strong>
                {toDutchDate(sessie?.Datum)}
                <span>
                  {new Date(sessie?.Begintijd).toISOString().substr(11, 5)} -{' '}
                  {new Date(sessie?.Eindtijd).toISOString().substr(11, 5)}
                </span>
              </strong>
            </div>
          </div>
          <div className="col-md-6">
            <div className="price">
              <strong>
                {toDutchMoney(cursus?.Prijs === 0 ? cursus?.Vak.Kosten : cursus?.Prijs, {
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
              Thema: <strong>{cursus?.Vak.ThemaNaam}</strong>
            </p>
          </div>
          <div className="col-md-6">
            <p className="characteristics">
              Bijeenkomsttype: <strong>{cursus?.Vak.CompetentieNaam}</strong>
            </p>
          </div>
        </div>
        <OrganizerDetails
          data={
            cursus?.Vak?.ExamenInstelling === null
              ? cursus?.Vak?.Vakgroep
              : cursus?.Vak?.ExamenInstelling
          }
        />
      </PanelBody>
    </>
  );
}
