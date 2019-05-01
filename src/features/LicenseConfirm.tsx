import * as React from 'react';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Redirect, RouteComponentProps } from 'react-router';

import { GraphQLError } from 'graphql';
import { Mutation, MutationFn } from 'react-apollo';
import GqlQuery from '../components/graphql/GqlQuery';
import Alert from '../components/ui/Alert';
import Col from '../components/ui/Col';
import LicenseCard from '../components/ui/LicenseCard';
import Panel from '../components/ui/Panel';
import Row from '../components/ui/Row';
import Spinner from '../components/ui/Spinner';
import { ICertificaat, ICertificering, IMy } from '../shared/Model';
import {
  DECOUPLE_LICENSE,
  IDecoupleLicenseResult,
  IDecoupleLicenseVars,
} from '../shared/Mutations';
import { CERTIFICATES_QUERY, MY_PERSON_QUERY } from '../shared/Queries';

interface ILicenseConfirmState {
  confirmVisible: boolean;
  sendEmailConfirmation: boolean;
  confirmationEmail: string;
  errors: GraphQLError[];
  loading: boolean;
}

interface IMatchParams {
  licenseId: string;
}

class LicenseConfirm extends React.Component<
  RouteComponentProps<IMatchParams>,
  ILicenseConfirmState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      confirmVisible: false,
      sendEmailConfirmation: true,
      confirmationEmail: '',
      errors: [],
      loading: false,
    };

    this.confirm = this.confirm.bind(this);
    this.onConfirmHide = this.onConfirmHide.bind(this);
    this.onConfirmAccept = this.onConfirmAccept.bind(this);
  }

  public render() {
    return (
      <Panel title="Bevestigen ontkoppelen">
        {this.state.loading ? (
          <Spinner text="Bezig met ontkoppelen licentie..." global={true} />
        ) : null}
        <GqlQuery<IMy> query={MY_PERSON_QUERY}>
          {(result: IMy) => {
            // Get current license
            const license = result.my.Certificeringen.find(
              (item) => '' + item.CertificeringID === this.props.match.params.licenseId,
            );

            if (!license) {
              return <Redirect to="/" />;
            }

            const confirmActions = (mutation: any) => (
              <div>
                <Button
                  label="Nee"
                  type="button"
                  icon="fas fa-times"
                  className="p-button-secondary"
                  onClick={this.onConfirmHide}
                />
                <Button
                  label="Ja"
                  type="button"
                  icon="fas fa-check"
                  className="p-button-success"
                  onClick={() => this.onConfirmAccept(license, mutation)}
                />
              </div>
            );

            return (
              <div>
                <Row>
                  <Col>
                    <p>Dit worden uw nieuwe licenties met ingang van heden.</p>
                  </Col>
                </Row>
                {this.getNewLicenses(license)}
                <Row>
                  <Col>
                    <p>Druk op bevestigen om de ontkoppeling definitief te maken.</p>
                  </Col>
                </Row>
                {this.state.errors && this.state.errors.length
                  ? this.state.errors.map((error, index) => (
                      <Alert key={index} type="danger">
                        {error.message}
                      </Alert>
                    ))
                  : null}
                <Row>
                  <Col>
                    <Button
                      label="Terug"
                      type="button"
                      icon="fas fa-times"
                      className="p-button-secondary"
                      onClick={() =>
                        this.props.history.push(`/${license.CertificeringID}/participations`)
                      }
                    />
                    <Button
                      label="Bevestigen"
                      type="button"
                      icon="fas fa-check"
                      className="p-button-success"
                      onClick={() => this.confirm(result)}
                    />
                  </Col>
                </Row>

                <Mutation<IDecoupleLicenseResult, IDecoupleLicenseVars> mutation={DECOUPLE_LICENSE}>
                  {(mutation) => {
                    return (
                      <Dialog
                        header="Licentie ontkoppelen"
                        visible={this.state.confirmVisible}
                        footer={confirmActions(mutation)}
                        onHide={this.onConfirmHide}
                      >
                        Weet u zeker dat u de licentie wilt ontkoppelen?
                        <br />
                        <br />
                        <Alert type="warning">
                          Let op: het ontkoppelen kan niet ongedaan gemaakt worden!
                        </Alert>
                        <input
                          type="checkbox"
                          onChange={(event) =>
                            this.setState({ sendEmailConfirmation: event.target.checked })
                          }
                          checked={this.state.sendEmailConfirmation}
                        />{' '}
                        <label htmlFor="confirmationEmail" className="form-control-static">
                          Stuur een e-mailbevestiging naar:
                        </label>
                        <input
                          id="confirmationEmail"
                          type="text"
                          className="form-control"
                          onChange={(event) =>
                            this.setState({ confirmationEmail: event.target.value })
                          }
                          value={this.state.confirmationEmail}
                        />
                      </Dialog>
                    );
                  }}
                </Mutation>
              </div>
            );
          }}
        </GqlQuery>
      </Panel>
    );
  }

  private confirm(result: IMy): void {
    this.setState({
      confirmVisible: true,
      confirmationEmail: result.my.Persoon.Contactgegevens.Email,
    });
  }

  private onConfirmHide(): void {
    this.setState({ confirmVisible: false });
  }

  private onConfirmAccept(
    license: ICertificering,
    mutation: MutationFn<IDecoupleLicenseResult, IDecoupleLicenseVars>,
  ): void {
    this.setState({ confirmVisible: false, loading: true });

    // Determine confirmation email
    let confirmationEmail = '';
    if (this.state.sendEmailConfirmation) {
      confirmationEmail =
        this.state.confirmationEmail.length > 0 ? this.state.confirmationEmail : '';
    }
    mutation({
      variables: {
        input: {
          licenseId: +license.CertificeringID,
          confirmationEmail,
        },
      },
    })
      .then((response: any) => {
        this.props.history.push(
          `/${license.CertificeringID}/card/${
            response.data.decoupleLicense.kbaLicense.CertificeringID
          }`,
        );
      })
      .catch((err: any) => {
        this.setState({ errors: [err], loading: false });
      });
  }

  private getNewLicenses(license: ICertificering): JSX.Element {
    return (
      <GqlQuery<{ Certificaten: ICertificaat[] }> query={CERTIFICATES_QUERY}>
        {(result: { Certificaten: ICertificaat[] }) => {
          const baseCertificate = this.getCertificateByCode(
            result.Certificaten,
            license.Certificaat.Code.replace(' + KBA', ''),
          );
          const kbaCertificate = this.getCertificateByCode(result.Certificaten, 'KBA');

          if (!baseCertificate || !kbaCertificate) {
            return null;
          }

          // Create new licenses
          const updatedLicense: ICertificering = {
            ...license,
            Certificaat: baseCertificate,
            CertificeringAantekeningen: [],
          };
          const kbaLicense: ICertificering = {
            CertificeringID: 0,
            Nummer: `31.${new Date().getFullYear()}.XXXXXXX`,
            NummerWeergave: `31.${new Date().getFullYear()}.XXXXXXX`,
            BeginDatum: license.BeginDatum,
            EindDatum: license.EindDatum,
            Status: license.Status,
            Certificaat: kbaCertificate,
            CertificeringAantekeningen: [],
          };

          return (
            <div>
              <Row>
                <Col>
                  <LicenseCard license={updatedLicense} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <LicenseCard license={kbaLicense} />
                </Col>
              </Row>
            </div>
          );
        }}
      </GqlQuery>
    );
  }

  private getCertificateByCode(
    certificates: ICertificaat[],
    code: string,
  ): ICertificaat | undefined {
    return certificates.find((certificate) => certificate.Code === code);
  }
}

export default LicenseConfirm;
