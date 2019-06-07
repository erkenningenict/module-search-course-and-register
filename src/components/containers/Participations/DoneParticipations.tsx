import React, { useState } from 'react';
import DoneParticipationSelectLicense from '../../DoneParticipations/DoneParticipationsSelectLicense';
import DoneParticipationsTable from '../../DoneParticipations/DoneParticipationsTable';
import LinkButton from '../../ui/LinkButton';
import LinkButtonContainer from '../../ui/LinkButtonContainer';
import Panel from '../../ui/Panel';

export default function DoneParticipations(props) {
  const [licenseId, setLicenseId] = useState(0);
  return (
    <Panel title="Welke bijeenkomsten heb ik al gevolgd?" doNotIncludeBody={true}>
      <DoneParticipationSelectLicense
        setLicenseId={(license: number) => setLicenseId(license)}
        licenseId={licenseId}
      />
      <DoneParticipationsTable licenseId={licenseId} />
      <div className="panel-body">
        <LinkButtonContainer>
          <LinkButton
            to={{
              pathname: `/bijeenkomsten-zoeken/op-locatie`,
              search: props.location.search,
            }}
            name="Zoek bijeenkomst op locatie"
          />
          <LinkButton
            to={{
              pathname: `/bijeenkomsten-zoeken/online`,
              search: props.location.search,
            }}
            name="Zoek online bijeenkomst"
          />
        </LinkButtonContainer>
      </div>
    </Panel>
  );
}
