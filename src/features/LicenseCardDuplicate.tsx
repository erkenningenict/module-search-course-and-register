import { GraphQLError } from 'graphql';
import { Button } from 'primereact/button';
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { Redirect, RouteComponentProps } from 'react-router';

import GqlQuery from '../components/graphql/GqlQuery';
import Col from '../components/ui/Col';
import LicenseCard from '../components/ui/LicenseCard';
import Panel from '../components/ui/Panel';
import Row from '../components/ui/Row';
import Spinner from '../components/ui/Spinner';
import { IMy, ITariefDuplicaat } from '../shared/Model';

import Alert from '../components/ui/Alert';
import {
  IRequestDuplicateResult,
  IRequestDuplicateVars,
  REQUEST_DUPLICATE,
} from '../shared/Mutations';
import { MY_PERSON_QUERY, TARIEF_DUPLICAAT_QUERY } from '../shared/Queries';

interface IMatchParams {
  licenseId: string;
  kbaLicenseId: string;
}

interface ILicenseCardDuplicateState {
  duplicateUpdatedLicense: boolean;
  duplicateKbaLicense: boolean;
  duplicateLicenseIds: number[];
  loading: boolean;
  errors: GraphQLError[];
  finished: boolean;
  invoiceLink: string;
}

class LicenseCardDuplicate extends React.Component<
  RouteComponentProps<IMatchParams>,
  ILicenseCardDuplicateState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      duplicateKbaLicense: false,
      duplicateUpdatedLicense: false,
      duplicateLicenseIds: [],
      loading: false,
      errors: [],
      finished: false,
      invoiceLink: '',
    };
  }

  public render() {
    return (
      <Panel title="Pas bestellen">
        {this.state.loading ? (
          <Spinner text="Bezig met bestellen pas(sen)..." global={true} />
        ) : null}
        {this.state.finished ? (
          <Row>
            <Col>
              <p>
                Bedankt voor uw bestelling. U kunt uw factuur{' '}
                <span dangerouslySetInnerHTML={this.getInvoiceJsLink()} /> bekijken en via iDEAL
                betalen.
              </p>
            </Col>
          </Row>
        ) : (
          <GqlQuery<IMy> query={MY_PERSON_QUERY} forceNetwork={true}>
            {(result: IMy) => {
              // Get updated and new KBA license
              const updatedLicense = result.my.Certificeringen.find(
                (item) => '' + item.CertificeringID === this.props.match.params.licenseId,
              );
              const kbaLicense = result.my.Certificeringen.find(
                (item) => '' + item.CertificeringID === this.props.match.params.kbaLicenseId,
              );

              if (!updatedLicense || !kbaLicense) {
                return <Redirect to="/" />;
              }

              return (
                <GqlQuery<ITariefDuplicaat> query={TARIEF_DUPLICAAT_QUERY}>
                  {(tariefResult: ITariefDuplicaat) => {
                    const totalCosts =
                      (this.state.duplicateKbaLicense
                        ? tariefResult.tariefDuplicaat.TotaalExtBtw
                        : 0) +
                      (this.state.duplicateUpdatedLicense
                        ? tariefResult.tariefDuplicaat.TotaalExtBtw
                        : 0);

                    const duplicateLicenseIds: number[] = [];
                    if (this.state.duplicateUpdatedLicense) {
                      duplicateLicenseIds.push(+updatedLicense.CertificeringID);
                    }
                    if (this.state.duplicateKbaLicense) {
                      duplicateLicenseIds.push(+kbaLicense.CertificeringID);
                    }

                    return (
                      <div>
                        <Row>
                          <Col>
                            <p>
                              Uw licentie is succesvol ontkoppeld! Per licentie kunt u optioneel een
                              nieuwe pas bestellen.
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <LicenseCard license={updatedLicense}>
                              <input
                                id="duplicateLicense"
                                type="checkbox"
                                checked={this.state.duplicateUpdatedLicense}
                                onChange={(event) =>
                                  this.setState({ duplicateUpdatedLicense: event.target.checked })
                                }
                              />
                              <label htmlFor="duplicateLicense" className="form-control-static">
                                &nbsp;Pas bestellen &euro;{' '}
                                {tariefResult.tariefDuplicaat.TotaalExtBtw.toFixed(2).replace(
                                  '.',
                                  ',',
                                )}
                              </label>
                            </LicenseCard>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <LicenseCard license={kbaLicense}>
                              <input
                                id="duplicateKbaLicense"
                                type="checkbox"
                                checked={this.state.duplicateKbaLicense}
                                onChange={(event) =>
                                  this.setState({ duplicateKbaLicense: event.target.checked })
                                }
                              />
                              <label htmlFor="duplicateKbaLicense" className="form-control-static">
                                &nbsp;Pas bestellen &euro;{' '}
                                {tariefResult.tariefDuplicaat.TotaalExtBtw.toFixed(2).replace(
                                  '.',
                                  ',',
                                )}
                              </label>
                            </LicenseCard>
                          </Col>
                        </Row>
                        {totalCosts > 0 ? (
                          <div>
                            <Row>
                              <Col>
                                <p>
                                  Deze bestelling bedraagt &euro;{' '}
                                  {totalCosts.toFixed(2).replace('.', ',')} in totaal.
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                {this.state.errors && this.state.errors.length
                                  ? this.state.errors.map((error, index) => (
                                      <Alert key={index} type="danger">
                                        {error.message}
                                      </Alert>
                                    ))
                                  : null}
                                <Mutation<IRequestDuplicateResult, IRequestDuplicateVars>
                                  mutation={REQUEST_DUPLICATE}
                                >
                                  {(mutation) => {
                                    return (
                                      <Button
                                        label="Bestellen"
                                        type="button"
                                        icon="fas fa-check"
                                        className="p-button-success"
                                        onClick={() => this.confirm(mutation, duplicateLicenseIds)}
                                      />
                                    );
                                  }}
                                </Mutation>
                              </Col>
                            </Row>
                          </div>
                        ) : (
                          <Row>
                            <Col>
                              <p>Selecteer tenminste 1 pas om een bestelling te kunnen maken.</p>
                            </Col>
                          </Row>
                        )}
                      </div>
                    );
                  }}
                </GqlQuery>
              );
            }}
          </GqlQuery>
        )}
      </Panel>
    );
  }

  private confirm(
    mutation: MutationFn<IRequestDuplicateResult, IRequestDuplicateVars>,
    licenseIds: number[],
  ): void {
    this.setState({ loading: true });

    mutation({
      variables: {
        input: {
          licenseIds,
        },
      },
    })
      .then((response: any) => {
        this.setState({
          loading: false,
          finished: true,
          invoiceLink: response.data.requestDuplicate.invoiceLink,
        });
      })
      .catch((err: any) => {
        this.setState({ errors: [err], loading: false });
      });
  }

  private getInvoiceJsLink(): { __html: string } {
    if (!this.state.invoiceLink) {
      return { __html: '' };
    }
    return {
      __html: `<a href="#" onclick="${this.state.invoiceLink};return false;">hier</a>`,
    };
  }
}

export default LicenseCardDuplicate;
