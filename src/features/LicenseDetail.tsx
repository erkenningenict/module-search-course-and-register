import * as React from 'react';

import { Button } from 'primereact/button';
import { Redirect, RouteComponentProps } from 'react-router';

import GqlQuery from '../components/graphql/GqlQuery';
import Col from '../components/ui/Col';
import LicenseCard from '../components/ui/LicenseCard';
import Panel from '../components/ui/Panel';
import Row from '../components/ui/Row';

import { ICertificaat, ICertificering, IMy } from '../shared/Model';
import { CERTIFICATES_QUERY, MY_PERSON_QUERY } from '../shared/Queries';

interface IMatchParams {
  licenseId: string;
}

class LicenseDetail extends React.Component<RouteComponentProps<IMatchParams>> {
  public render() {
    return (
      <Panel title="Licentie keuze">
        <GqlQuery<IMy> query={MY_PERSON_QUERY}>
          {(result: IMy) => {
            // Get current license
            const license = result.my.Certificeringen.find(
              (item) => '' + item.CertificeringID === this.props.match.params.licenseId,
            );

            if (!license) {
              return <Redirect to="/" />;
            }

            return (
              <div>
                <Row>
                  <Col>
                    <p>U wilt licentie {license.NummerWeergave} ontkoppelen.</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <LicenseCard license={license} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Uw licentie wordt ontkoppeld naar:
                    {this.getNewCertificates(license)}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      label="Terug"
                      type="button"
                      icon="fas fa-times"
                      className="p-button-secondary"
                      onClick={() => this.props.history.push('/')}
                    />
                    <Button
                      label="Volgende"
                      type="button"
                      icon="fas fa-check"
                      className="p-button-success"
                      onClick={() =>
                        this.props.history.push(`/${license.CertificeringID}/participations`)
                      }
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

  private getNewCertificates(license: ICertificering): JSX.Element {
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
          return (
            <ul>
              <li>
                {baseCertificate.Naam} (<b>{baseCertificate.Code}</b>)
              </li>
              <li>
                {kbaCertificate.Naam} (<b>{kbaCertificate.Code}</b>)
              </li>
            </ul>
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

export default LicenseDetail;
