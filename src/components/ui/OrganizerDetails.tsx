import React from 'react';
import { Row } from '@erkenningen/ui/layout/row';
import { ExamenInstellingFieldsFragment, VakgroepFieldsFragment } from '../../generated/graphql';

import './OrganizerDetails.css';

interface OrganizerDetailsProps {
  data?: VakgroepFieldsFragment | ExamenInstellingFieldsFragment;
}

export default function OrganizerDetails(props: OrganizerDetailsProps) {
  const { data } = props;
  return (
    <>
      <Row>
        <div className="organizer-area">
          <p className="organizer-label">Organisator</p>
          <div>
            <p className="organizer-title">{data?.Naam}</p>
            {data?.Contactgegevens.Telefoon && (
              <div className="organizer-row">
                <i className="fas fa-phone fa-icon" />
                {data.Contactgegevens.Telefoon || 'onbekend'}
              </div>
            )}
            {data?.Contactgegevens.Email && (
              <div className="organizer-row">
                <i className="fas fa-envelope fa-icon" />

                <a href={`mailto:${data.Contactgegevens?.Email}`}>{data.Contactgegevens?.Email}</a>
              </div>
            )}
          </div>
        </div>
      </Row>
    </>
  );
}
