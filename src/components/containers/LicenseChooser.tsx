import React, { useContext, useEffect, useState } from 'react';
import { Alert } from '@erkenningen/ui/components/alert';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { UserContext } from '../../shared/Auth';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { FormSelect } from '@erkenningen/ui/components/form';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';

interface LicenseChooserProps {
  setLicenseId: (licenseId: number) => void;
  seenOverview: boolean;
  children: React.ReactNode;
}

const LicenseChooser: React.FC<LicenseChooserProps> = (props): JSX.Element => {
  const location = useLocation();
  const [certs, setCerts] = useState<any>();
  const user = useContext(UserContext);
  const licenseId = useContext(SelectedLicenseContext);
  if (!user) {
    return <>{props.children}</>;
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
    location.pathname.match(/\/bijeenkomsten-zoeken\/op-locatie\/informatie-en-aanmelden\/(d*)/) &&
    !!props.seenOverview
  ) {
    return <>{props.children}</>;
  }

  if (licenseId === 0) {
    return <>{props.children}</>;
  }
  return (
    <>
      <PanelBody>
        <p> Kies uw licentie waarmee u een bijeenkomst wilt zoeken en aanmelden.</p>
      </PanelBody>
      <Formik
        initialValues={{
          licenseId: licenseId.toString(),
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {(formProps: any) => (
          <form className="form form-horizontal" onSubmit={(e: any) => e.preventDefault()}>
            {certs && (
              <FormSelect
                label="Kies uw licentie"
                options={certificeringen.map((item: any) => ({
                  value: item.CertificeringID.toString(),
                  label: `${item.NummerWeergave} - ${item.Certificaat.Naam}`,
                }))}
                form={formProps}
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
        )}
      </Formik>
      <hr />
      <>{props.children}</>
    </>
  );
};

export default LicenseChooser;
