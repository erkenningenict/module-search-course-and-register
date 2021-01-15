import { Row } from '@erkenningen/ui/layout/row';
import React from 'react';
import './OrganizerDetails.scss';

export default function OrganizerDetails(props) {
  const { data } = props;
  return (
    <>
      <Row>
        <div className="organizer-area">
          <p className="organizer-label">Organisator</p>
          <div>
            <p className="organizer-title">{data.Organizer}</p>
            {data.OrganizerPhone && (
              <div className="organizer-row">
                <i className="fas fa-phone fa-icon" />
                {data.OrganizerPhone || 'onbekend'}
              </div>
            )}
            {data.OrganizerEmail && (
              <div className="organizer-row">
                <i className="fas fa-envelope fa-icon" />

                <a href={`mailto:${data.OrganizerEmail}`}>{data.OrganizerEmail}</a>
              </div>
            )}
          </div>
        </div>
      </Row>
    </>
  );
}
