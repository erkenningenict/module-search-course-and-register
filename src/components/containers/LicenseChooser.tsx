import React, { useContext, useState } from 'react';
import { ICertificering } from '../../shared/Queries';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { UserContext } from '../../shared/UserContext';
import Alert from '../ui/Alert';
import FormSelect from '../ui/FormSelect';

export function LicenseChooser(props: any) {
  const [certs, setCerts] = useState();
  const user = useContext(UserContext);
  const licenseId = useContext(SelectedLicenseContext);
  if (!user) {
    return props.children;
  }
  const certificeringen: ICertificering[] = (user && user.my && user.my.Certificeringen) || [];
  if (!certs && certificeringen.length > 0) {
    setCerts(certificeringen);
  }

  if (licenseId === 0 && certs && certs.length > 0) {
    props.setLicenseId(parseInt(certs[0].CertificeringID, 10));
  }

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
      <div className="panel-body">
        <p> Kies uw licentie waarmee u een bijeenkomst wilt zoeken en aanmelden.</p>
      </div>
      <form className="form form-horizontal" onSubmit={(e: any) => e.preventDefault()}>
        {certs && (
          <FormSelect
            id="license"
            label="Kies uw licentie"
            value={licenseId.toString()}
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
          <Alert type="warning">
            U heeft geen geldige licentie, daarom kunt u zich niet voor een bijeenkomst aanmelden!
          </Alert>
        )}
      </form>
      <hr />
      {props.children}
    </>
  );
}
