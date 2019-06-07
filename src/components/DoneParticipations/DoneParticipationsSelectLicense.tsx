import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router';
import { GET_MY_PERSON_QUERY, ICertificering } from '../../shared/Queries';
import Alert from '../ui/Alert';
import FormSelect from '../ui/FormSelect';

export default function DoneParticipationSelectLicense(props: any) {
  const [certs, setCerts] = useState();
  let certificeringen: ICertificering[] = [];

  return (
    <>
      <Query
        query={GET_MY_PERSON_QUERY}
        fetchPolicy="no-cache"
        variables={{
          input: false,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Gegevens worden geladen...</p>;
          }

          if (error) {
            // Check if it's an authentication error, then redirect to login
            if (error.graphQLErrors) {
              for (const err of error.graphQLErrors) {
                if (err.extensions && err.extensions.code === 'UNAUTHENTICATED') {
                  // Redirect to DNN login
                  console.log('#DH# unauth', props);
                  //   return (
                  //     <p>U bent niet ingelogd. Log in om verder te gaan.</p>
                  //   ) as React.ReactElement;
                  //   return <Redirect push={true} to="/Default.aspx?tabid=154" />;
                  return props.history.push('/bijeenkomsten-zoeken/op-locatie');
                  //   return <Redirect push={true} to="/bijeenkomsten-zoeken/op-locatie" />;
                } else {
                  return <p>Fout</p>;
                }
              }
            }
            return (
              <Alert type="danger">
                Er is een fout opgetreden bij het ophalen van de accountgegevens. Probeer het nog
                een keer of neem contact op met de helpdesk.
              </Alert>
            ) as React.ReactElement;
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
              <div className="panel-body">
                <p>Kies een van uw licenties om de gevolgde bijeenkomsten te tonen.</p>
              </div>
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
                  <Alert type="warning">
                    U heeft geen geldige licentie, daarom kunt u zich niet voor een bijeenkomst
                    aanmelden!
                  </Alert>
                )}
              </form>
              <hr />
            </div>
          ) as React.ReactNode;
        }}
      </Query>
    </>
  );
}
