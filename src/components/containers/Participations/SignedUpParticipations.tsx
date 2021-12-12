import React from 'react';
import { PanelBody, Panel } from '@erkenningen/ui/layout/panel';
import { LinkButton, LinkButtonContainer } from '@erkenningen/ui/components/link-button';
import SignedUpParticipationsTable from '../../SignedUpParticipations/SignedUpParticipationsTable';
import { useLocation } from 'react-router-dom';

export default function SignedUpParticipations(props) {
  const location = useLocation();
  return (
    <Panel title="Waar ben ik aangemeld" doNotIncludeBody={true}>
      <SignedUpParticipationsTable {...props} />
      <PanelBody>
        <LinkButtonContainer>
          <LinkButton to={`/bijeenkomsten-zoeken/op-locatie${location.search}`}>
            Zoek bijeenkomst op locatie
          </LinkButton>
          <LinkButton to={`/bijeenkomsten-zoeken/online${location.search}`}>
            Zoek online bijeenkomst
          </LinkButton>
          <LinkButton to={`/wat-heb-ik-al-gevolgd${location.search}`}>
            Wat heb ik al gevolgd?
          </LinkButton>
        </LinkButtonContainer>
      </PanelBody>
    </Panel>
  );
}
