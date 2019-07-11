import { Alert, PanelBody } from '@erkenningen/ui';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { GET_MY_PERSON_QUERY, ICertificering, IMy } from '../../shared/Queries';
import FormSelect from '../ui/FormSelect';

interface IDoneParticipationSelectLicenseProps {
  licenseId: number;
  setLicenseId: (licenseId: number) => void;
}

export default function DoneParticipationSelectLicense(
  props: IDoneParticipationSelectLicenseProps & RouteComponentProps<any>,
) {
  const [certs, setCerts] = useState();
  let certificeringen: ICertificering[] = [];

  return (
    <Query<IMy, { input: boolean }>
      query={GET_MY_PERSON_QUERY}
      fetchPolicy="network-only"
      variables={{
        input: false,
      }}
    >
      {({ loading, data, error }) => {
        if (loading) {
          return <p>Gegevens worden geladen...</p> as React.ReactNode;
        }

        if (error) {
          // Check if it's an authentication error, then redirect to login
          if (error.graphQLErrors) {
            for (const err of error.graphQLErrors) {
              if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
                return props.history.push('/bijeenkomsten-zoeken/op-locatie') as React.ReactNode;
              } else {
                return <p>Fout</p> as React.ReactNode;
              }
            }
          }
          return (
            <Alert type="danger">
              Er is een fout opgetreden bij het ophalen van de accountgegevens. Probeer het nog een
              keer of neem contact op met de helpdesk.
            </Alert>
          ) as React.ReactNode;
        }
        if (!data || !data.my || data.my.Roles === null) {
          return null;
        }
        if (data.my.Roles && data.my.Roles.indexOf('Student') === -1) {
          data.my.Certificeringen = undefined;
        }
        if (data) {
          certificeringen = (data && data.my && data.my.Certificeringen) || [];
          if (!certs && certificeringen.length > 0) {
            setCerts(certificeringen);
          }

          if (props.licenseId === 0 && certs && certs.length > 0) {
            props.setLicenseId(parseInt(certs[certs.length - 1].CertificeringID, 10));
          }
        }
        return (
          <div>
            <PanelBody>
              <p>Kies een van uw licenties om de gevolgde bijeenkomsten te tonen.</p>
            </PanelBody>
            <form className="form form-horizontal" onSubmit={(e: any) => e.preventDefault()}>
              {certs && (
                <FormSelect
                  id="license"
                  label="Kies licentie"
                  value={props.licenseId.toString()}
                  options={certificeringen.map((item: any) => ({
                    value: item.CertificeringID.toString(),
                    label: `${item.NummerWeergave} - ${item.Certificaat.Naam}`,
                  }))}
                  onChange={(event: any) => props.setLicenseId(parseInt(event.value, 10))}
                  name="licenseId"
                  loading={false}
                />
              )}
              {certificeringen.length === 0 && (
                <PanelBody>
                  <Alert type="warning">
                    U heeft geen geldige licentie, daarom kunt u zich niet voor een bijeenkomst
                    aanmelden!
                  </Alert>
                </PanelBody>
              )}
            </form>
            <hr />
          </div>
        ) as React.ReactNode;
      }}
    </Query>
  );
}
