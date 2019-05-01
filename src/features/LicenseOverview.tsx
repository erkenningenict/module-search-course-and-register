import * as React from 'react';

import { Button } from 'primereact/button';
import { RouteComponentProps } from 'react-router';

import Col from '../components/ui/Col';
import LicenseCard from '../components/ui/LicenseCard';
import Panel from '../components/ui/Panel';
import Row from '../components/ui/Row';

import { ICertificering, IMy } from '../shared/Model';
import { MY_PERSON_QUERY } from '../shared/Queries';

import GqlQuery from '../components/graphql/GqlQuery';
import './LicenseOverview.scss';

class LicenseOverview extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Panel title="Selecteer licentie">
        <GqlQuery<IMy> query={MY_PERSON_QUERY}>
          {(data: IMy) => {
            // Sort by date ascending
            const validLicenses = data.my.Certificeringen.filter(
              (license) => license.Status === 'Geldig',
            ).sort((a, b) =>
              a.BeginDatum > b.BeginDatum ? 1 : a.BeginDatum < b.BeginDatum ? -1 : 0,
            );

            if (validLicenses.length === 0) {
              return (
                <div>
                  <p>U heeft geen geldige licenties. Ontkoppelen is niet mogelijk.</p>
                </div>
              );
            }

            return (
              <div>
                <p>
                  U heeft {validLicenses.length} geldige licentie
                  {validLicenses.length > 1 ? 's' : ''}. Selecteer een KBA licentie om te
                  ontkoppelen, indien mogelijk.
                </p>
                {validLicenses.map((license: ICertificering) => {
                  // Check if this license is already extended
                  const unlinkNotAllowedReason = this.isUnlinkAllowed(
                    license,
                    data.my.Certificeringen,
                  );
                  return (
                    <Row key={license.CertificeringID}>
                      <Col>
                        <LicenseCard license={license}>
                          <Button
                            label="Ontkoppelen"
                            type="button"
                            icon="fa fa-unlink"
                            className="p-button-danger"
                            disabled={unlinkNotAllowedReason !== null}
                            onClick={() => this.onUnlinkClick(license)}
                          />

                          {unlinkNotAllowedReason ? (
                            <p className="extend-warning">{unlinkNotAllowedReason}</p>
                          ) : null}
                        </LicenseCard>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            );
          }}
        </GqlQuery>
      </Panel>
    );
  }

  /**
   * Check if license can be unlinked: it should be valid, + KBA and not have an extension
   */
  private isUnlinkAllowed(license: ICertificering, allLicenses: ICertificering[]): string | null {
    if (license.Status !== 'Geldig') {
      return 'Licentie is niet geldig';
    }
    const today = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    if (license.EindDatum < today) {
      return 'Licentie is verlopen';
    }
    if (allLicenses.some((item) => '' + item.IsVerlengingVan === '' + license.CertificeringID)) {
      return 'Licentie is verlengd, ontkoppel de verlenger';
    }

    if (
      !(
        (license.Certificaat.Code.indexOf('+ KBA') > -1 &&
          license.Certificaat.Code.indexOf('+ KBA-GB') === -1) ||
        license.CertificeringAantekeningen.some(
          (annotation) => annotation.AantekeningCode === 'KBA',
        )
      )
    ) {
      return 'Licentie is geen KBA licentie';
    }

    return null;
  }

  private onUnlinkClick(license: ICertificering): void {
    this.props.history.push('/' + license.CertificeringID);
  }
}

export default LicenseOverview;
