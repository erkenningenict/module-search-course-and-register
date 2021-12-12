import React, { useState } from 'react';
import { PanelBody, Panel } from '@erkenningen/ui/layout/panel';
import { LinkButton, LinkButtonContainer } from '@erkenningen/ui/components/link-button';
import DoneParticipationSelectLicense from '../../DoneParticipations/DoneParticipationsSelectLicense';
import DoneParticipationsTable from '../../DoneParticipations/DoneParticipationsTable';
import { useLocation } from 'react-router-dom';

export default function DoneParticipations(props) {
  const location = useLocation();
  const [licenseId, setLicenseId] = useState(0);
  return (
    <Panel title="Welke bijeenkomsten heb ik al gevolgd?" doNotIncludeBody={true}>
      <DoneParticipationSelectLicense
        setLicenseId={(license: number) => setLicenseId(license)}
        licenseId={licenseId}
        {...props}
      />
      <DoneParticipationsTable licenseId={licenseId} />
      <PanelBody>
        <LinkButtonContainer>
          <LinkButton to={`/bijeenkomsten-zoeken/op-locatie${location.search}`}>
            Zoek bijeenkomst op locatie
          </LinkButton>
          <LinkButton to={`/bijeenkomsten-zoeken/online${location.search}`}>
            Zoek online bijeenkomst
          </LinkButton>

          <LinkButton to={`/waar-ben-ik-aangemeld${location.search}`}>
            Waar ben ik aangemeld?
          </LinkButton>
        </LinkButtonContainer>
      </PanelBody>
    </Panel>
  );
}
