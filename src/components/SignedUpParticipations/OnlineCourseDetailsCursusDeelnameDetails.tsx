import React from 'react';
import { toDutchMoney } from '@erkenningen/ui/utils';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { GetCursusDeelnameDetailsQuery } from '../../generated/graphql';

import '../OnlineCourses/OnlineCourseDetails.scss';
import OrganizerDetails from '../ui/OrganizerDetails';

interface OnlineCourseDetailsCursusDeelnameDetailsProps {
  details: GetCursusDeelnameDetailsQuery;
}

export function OnlineCourseDetailsCursusDeelnameDetails(
  props: OnlineCourseDetailsCursusDeelnameDetailsProps,
) {
  const data = props.details?.CursusDeelnameDetails && props.details?.CursusDeelnameDetails;
  if (!data) {
    return null;
  }
  const cursus = data?.Cursus;
  return (
    <>
      <PanelBody>
        <div className="row">
          <div className="col-md-12">
            <div className="flex-container">
              <i className="fas fa-desktop online" />
              <div className="flex-container flex-col">
                <h3 className="title">
                  <span>{cursus?.Titel?.length === 0 ? cursus?.Vak?.Titel : cursus?.Titel}</span>
                </h3>
                <p className="code">Erkenningsnummer: {cursus?.Vak.VakID}</p>
              </div>
            </div>
            <p>
              {cursus?.Promotietekst?.length === 0
                ? cursus?.Vak.Promotietekst
                : cursus?.Promotietekst}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
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
        <div className="row">
          <div className="col-md-6">
            <p className="characteristics">
              Thema: <strong>{cursus.Vak?.ThemaNaam}</strong>
            </p>
          </div>
          <div className="col-md-6">
            <p className="characteristics">
              Bijeenkomsttype: <strong>{cursus.Vak?.CompetentieNaam}</strong>
            </p>
          </div>
        </div>
        <OrganizerDetails
          data={cursus.Vak.VakgroepID ? cursus.Vak.Vakgroep : cursus.Vak.ExamenInstelling}
        />
      </PanelBody>
    </>
  );
}
