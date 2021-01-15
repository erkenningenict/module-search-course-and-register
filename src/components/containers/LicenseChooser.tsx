import { Alert } from '@erkenningen/ui/components/alert';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../shared/Auth';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import FormSelect from '../ui/FormSelect';

export function LicenseChooser(props: any) {
  const [certs, setCerts] = useState<any>();
  const user = useContext(UserContext);
  const licenseId = useContext(SelectedLicenseContext);
  if (!user) {
    return props.children;
  }
  const certificeringen = user?.Certificeringen || [];
  if (!certs && certificeringen.length > 0) {
    setCerts(certificeringen);
  }

  useEffect(() => {
    if (licenseId === 0 && certs && certs?.length > 0) {
      props.setLicenseId(certs[0].CertificeringID);
    }
  });

  if (
    props.location.pathname.match(
      /\/bijeenkomsten-zoeken\/op-locatie\/informatie-en-aanmelden\/(d*)/,
    ) &&
    !!props.seenOverview
  ) {
    return props.children;
  }
  return (
    <>
      <PanelBody>
        <p> Kies uw licentie waarmee u een bijeenkomst wilt zoeken en aanmelden.</p>
      </PanelBody>
      <form className="form form-horizontal" onSubmit={(e: any) => e.preventDefault()}>
        {certs && (
          <FormSelect
            id="license"
            label="Kies uw licentie"
            value={licenseId}
            options={certificeringen.map((item: any) => ({
              value: item.CertificeringID,
              label: `${item.NummerWeergave} - ${item.Certificaat.Naam}`,
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
      {props.children}
    </>
  );
}
