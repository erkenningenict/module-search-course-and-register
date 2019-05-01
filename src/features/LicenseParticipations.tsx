import * as React from 'react';

import { Button } from 'primereact/button';
import Moment from 'react-moment';
import { Redirect, RouteComponentProps } from 'react-router';

import GqlQuery from '../components/graphql/GqlQuery';
import Col from '../components/ui/Col';
import Panel from '../components/ui/Panel';
import Row from '../components/ui/Row';

import { ICertificaat, IMy, IStudieresultaat } from '../shared/Model';
import { MY_STUDYRESULTS_QUERY } from '../shared/Queries';

interface IMatchParams {
  licenseId: string;
}

class LicenseParticipations extends React.Component<RouteComponentProps<IMatchParams>> {
  public render() {
    return (
      <Panel title="Bijeenkomsten">
        <h3>Bijeenkomsten</h3>
        <GqlQuery<IMy>
          query={MY_STUDYRESULTS_QUERY}
          variables={{ licenseId: +this.props.match.params.licenseId }}
        >
          {(result: IMy) => {
            // Get current license
            const license = result.my.Certificeringen.find(
              (item) => '' + item.CertificeringID === this.props.match.params.licenseId,
            );

            if (!license) {
              return <Redirect to="/" />;
            }

            const studyResultsSorted = result.my.Studieresultaten.sort((a, b) =>
              a.Datum > b.Datum ? -1 : a.Datum < b.Datum ? 1 : 0,
            );
            const studyResults = studyResultsSorted.filter(
              (studyResult) => studyResult.Vak.Themas[0].Naam !== 'KBA',
            );
            const studyResultsKba = studyResultsSorted.filter(
              (studyResult) => studyResult.Vak.Themas[0].Naam === 'KBA',
            );

            return (
              <div>
                {result.my.Studieresultaten.length === 0 ? (
                  <Row>
                    <Col>
                      <p>
                        U heeft op licentie {license.NummerWeergave} geen bijeenkomsten
                        geregistreerd staan.
                      </p>
                    </Col>
                  </Row>
                ) : (
                  <div>
                    <Row>
                      <Col>
                        <p>
                          U heeft op licentie {license.NummerWeergave} bijeenkomsten geregistreerd
                          staan. Deze worden op de nieuwe licenties geplaatst, zoals hieronder
                          weergegeven.
                        </p>
                      </Col>
                    </Row>
                    {this.getStudyResultsTable(
                      license.Certificaat.Naam.replace(' + KBA', ''),
                      studyResults,
                    )}
                    {this.getStudyResultsTable('KBA', studyResultsKba)}
                  </div>
                )}
                <Row>
                  <Col>
                    <Button
                      label="Terug"
                      type="button"
                      icon="fas fa-times"
                      className="p-button-secondary"
                      onClick={() => this.props.history.push(`/${license.CertificeringID}`)}
                    />
                    <Button
                      label="Volgende"
                      type="button"
                      icon="fas fa-check"
                      className="p-button-success"
                      onClick={() => this.props.history.push(`/${license.CertificeringID}/confirm`)}
                    />
                  </Col>
                </Row>
              </div>
            );
          }}
        </GqlQuery>
      </Panel>
    );
  }

  private getStudyResultsTable(name: string, studyResults: IStudieresultaat[]) {
    return (
      <Row>
        <Col>
          <h4>{name}</h4>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th style={{ width: '50%' }}>Titel</th>
                <th style={{ width: '90px' }}>Datum</th>
                <th style={{ width: '170px' }}>Thema</th>
                <th>Competentie</th>
              </tr>

              {studyResults.map((item) => (
                <tr>
                  <td>{item.Cursus.Titel ? item.Cursus.Titel : item.Vak.Titel}</td>
                  <td>
                    <Moment format="DD-MM-YYYY">{item.Datum}</Moment>
                  </td>
                  <td>{item.Vak.Themas[0].Naam}</td>
                  <td>{item.Vak.Competenties[0].Naam}</td>
                </tr>
              ))}
              {studyResults.length ? null : (
                <tr>
                  <i>Er zijn geen bijeenkomsten gevolgd voor deze licentie.</i>
                </tr>
              )}
            </tbody>
          </table>
        </Col>
      </Row>
    );
  }

  private getCertificateByCode(
    certificates: ICertificaat[],
    code: string,
  ): ICertificaat | undefined {
    return certificates.find((certificate) => certificate.Code === code);
  }
}

export default LicenseParticipations;
