import { PanelBody } from '@erkenningen/ui';
import { LinkButtonContainer, Panel } from '@erkenningen/ui';
import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { SignedUpParticipationDetails } from '../../SignedUpParticipations/SignedUpParticipationsDetails';
import SignedUpParticipationsTable from '../../SignedUpParticipations/SignedUpParticipationsTable';
import LinkButton from '../../ui/LinkButton';

interface ISignedUpParticipationsProps extends RouteComponentProps<any> {}

export default function SignedUpParticipations(props: ISignedUpParticipationsProps) {
  return (
    <Panel title="Waar ben ik aangemeld" doNotIncludeBody={true}>
      <Switch>
        <Route
          exact={true}
          path="/waar-ben-ik-aangemeld"
          render={(routerProps: any) => {
            return <SignedUpParticipationsTable />;
          }}
        />
        <Route
          exact={true}
          path="/waar-ben-ik-aangemeld/:participationId"
          component={SignedUpParticipationDetails}
        />
      </Switch>
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
              pathname: `/wat-heb-ik-al-gevolgd/`,
              search: props.location.search,
            }}
          >
            Wat heb ik al gevolgd?
          </LinkButton>
        </LinkButtonContainer>
      </PanelBody>
    </Panel>
  );
}
