import React, { useState } from 'react';
import { PanelBody, Panel } from '@erkenningen/ui/layout/panel';
import { LinkButtonContainer } from '@erkenningen/ui/components/link-button';
import DoneParticipationSelectLicense from '../../DoneParticipations/DoneParticipationsSelectLicense';
import DoneParticipationsTable from '../../DoneParticipations/DoneParticipationsTable';
import LinkButton from '../../ui/LinkButton';

export default function DoneParticipations(props) {
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
          <LinkButton
            to={{
              pathname: `/bijeenkomsten-zoeken/op-locatie`,
              search: props.location.search,
            }}
          >
            Zoek bijeenkomst op locatie
          </LinkButton>
          <LinkButton
            to={{
              pathname: `/bijeenkomsten-zoeken/online`,
              search: props.location.search,
            }}
          >
            Zoek online bijeenkomst
          </LinkButton>

          <LinkButton
            to={{
              pathname: `/waar-ben-ik-aangemeld`,
              search: props.location.search,
            }}
          >
            Waar ben ik aangemeld?
          </LinkButton>
        </LinkButtonContainer>
      </PanelBody>
    </Panel>
  );
}
