import * as React from 'react';
import Moment from 'react-moment';

import { Card } from 'primereact/card';

import { ICertificering } from '../../shared/Model';

import './LicenseCard.scss';

interface ILicenseCardProps {
  license: ICertificering;
}

class LicenseCard extends React.Component<ILicenseCardProps, {}> {
  public render() {
    // Check if license KBA annotation is available and is not a KBA combination license
    const addKbaName =
      this.props.license.CertificeringAantekeningen.some(
        (annotation) => annotation.AantekeningCode === 'KBA',
      ) &&
      !(
        this.props.license.Certificaat.Code.includes('KBA') &&
        !this.props.license.Certificaat.Code.includes('KBA-GB')
      )
        ? ' + KBA'
        : '';

    const header = <h2>{this.props.license.Certificaat.Naam + addKbaName}</h2>;

    return (
      <Card
        title={this.props.license.NummerWeergave}
        subTitle={this.props.license.Certificaat.Code + addKbaName}
        header={header}
        footer={this.props.children}
        className="license-card"
      >
        {this.isLicenseActive(this.props.license) ? (
          <i className="fas fa-check-circle license-status-active" />
        ) : null}
        {!this.isLicenseActive(this.props.license) ? (
          <i className="fas fa-clock license-status-extend" />
        ) : null}
        Geldig van <Moment format="DD-MM-YYYY">{this.props.license.BeginDatum}</Moment> t/m{' '}
        <Moment format="DD-MM-YYYY">{this.props.license.EindDatum}</Moment>
      </Card>
    );
  }

  private isLicenseActive(license: ICertificering): boolean {
    const today = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    return (
      license.Status === 'Geldig' &&
      license.BeginDatum <= today &&
      (license.EindDatum >= today ||
        (license.UitstelVerleend !== undefined &&
          license.UitstelVerleend === 1 &&
          license.UitstelTot !== undefined &&
          license.UitstelTot >= today))
    );
  }
}

export default LicenseCard;
