import React from 'react';
import { Row } from '@erkenningen/ui/layout/row';
import { GetSearchSpecialtiesQuery } from '../../generated/graphql';

import './OrganizerDetails.css';

interface OrganizerDetailsSearchSpecialtiesProps {
  data?: GetSearchSpecialtiesQuery;
}

export default function OrganizerDetailsSearchSpecialties(
  props: OrganizerDetailsSearchSpecialtiesProps,
) {
  const d = props.data?.SearchSpecialties && props.data?.SearchSpecialties[0];
  return (
    <>
      <Row>
        <div className="organizer-area">
          <p className="organizer-label">Organisator</p>
          <div>
            <p className="organizer-title">{d?.Organizer}</p>
            {d?.OrganizerPhone && (
              <div className="organizer-row">
                <i className="fas fa-phone fa-icon" />
                {d.OrganizerPhone || 'onbekend'}
              </div>
            )}
            {d?.OrganizerEmail && (
              <div className="organizer-row">
                <i className="fas fa-envelope fa-icon" />

                <a href={`mailto:${d.OrganizerEmail}`}>{d.OrganizerEmail}</a>
              </div>
            )}
          </div>
        </div>
      </Row>
    </>
  );
}
