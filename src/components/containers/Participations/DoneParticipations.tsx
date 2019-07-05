import { LinkButtonContainer, Panel } from '@erkenningen/ui';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import DoneParticipationSelectLicense from '../../DoneParticipations/DoneParticipationsSelectLicense';
import DoneParticipationsTable from '../../DoneParticipations/DoneParticipationsTable';
import LinkButton from '../../ui/LinkButton';

interface IDoneParticipationsProps extends RouteComponentProps<any> {}

export default function DoneParticipations(props: IDoneParticipationsProps) {
  const [licenseId, setLicenseId] = useState(0);
  return (
    <Panel title="Welke bijeenkomsten heb ik al gevolgd?" doNotIncludeBody={true}>
      <DoneParticipationSelectLicense
        setLicenseId={(license: number) => setLicenseId(license)}
        licenseId={licenseId}
        {...props}
      />
      <DoneParticipationsTable licenseId={licenseId} />
      <div className="panel-body">
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
      </div>
    </Panel>
  );
}
