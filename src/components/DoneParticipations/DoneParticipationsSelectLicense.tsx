import React, { useEffect, useState } from 'react';
import { Alert } from '@erkenningen/ui/components/alert';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { toDutchDate } from '@erkenningen/ui/utils';
import { RouteComponentProps } from 'react-router';
import { Certificering, useGetMyQuery } from '../../generated/graphql';
import FormSelect from '../ui/FormSelect';

interface DoneParticipationSelectLicenseProps {
  licenseId: number;
  setLicenseId: (licenseId: number) => void;
}

export default function DoneParticipationSelectLicense(
  props: DoneParticipationSelectLicenseProps & RouteComponentProps<any>,
) {
  const [certs, setCerts] = useState<Certificering[]>();

  useEffect(() => {
    if (props.licenseId === 0 && certs && certs.length > 0) {
      props.setLicenseId(certs[certs.length - 1].CertificeringID);
    }
  });

  const { loading, data, error } = useGetMyQuery({
    variables: {
      input: false,
    },
    fetchPolicy: 'network-only',
  });
  let certificeringen: Certificering[] = [];
  if (loading) {
    return <p>Gegevens worden geladen...</p>;
  }
  if (error) {
    // Check if it's an authentication error, then redirect to login
    if (error.graphQLErrors) {
      for (const err of error.graphQLErrors) {
        if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
          props.history.push('/bijeenkomsten-zoeken/op-locatie');
          return null;
        }
      }
    }
    return (
      <Alert type="danger">
        Er is een fout opgetreden bij het ophalen van de accountgegevens. Probeer het nog een keer
        of neem contact op met de helpdesk.
      </Alert>
    );
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
            value={props.licenseId}
            options={certificeringen.map((item) => ({
              value: item.CertificeringID,
              label: `${item.NummerWeergave} - ${item?.Certificaat?.Naam} (geldig ${toDutchDate(
                item.BeginDatum,
              )} - ${toDutchDate(item.EindDatum)})`,
            }))}
            onChange={(event: any) => props.setLicenseId(event.value)}
            name="licenseId"
            loading={false}
          />
        )}
        {certificeringen.length === 0 && (
          <PanelBody>
            <Alert type="warning">
              U heeft geen geldige licentie, daarom kunt u zich niet voor een bijeenkomst aanmelden!
            </Alert>
          </PanelBody>
        )}
      </form>
      <hr />
    </div>
  );
}
