import gql from 'graphql-tag';
import { ICertificering } from './Model';

export const DECOUPLE_LICENSE = gql`
  mutation decoupleLicense($input: decoupleLicenseInput!) {
    decoupleLicense(input: $input) {
      updatedLicense {
        CertificeringID
        NummerWeergave
      }
      kbaLicense {
        CertificeringID
        NummerWeergave
      }
    }
  }
`;

export interface IDecoupleLicenseVars {
  input: IDecoupleLicenseInput;
}

export interface IDecoupleLicenseInput {
  licenseId: number;
  confirmationEmail?: string;
}

export interface IDecoupleLicenseResult {
  updatedLicense: ICertificering;
  kbaLicense: ICertificering;
}

export const REQUEST_DUPLICATE = gql`
  mutation requestDuplicate($input: requestDuplicateInput!) {
    requestDuplicate(input: $input) {
      invoiceLink
    }
  }
`;

export interface IRequestDuplicateVars {
  input: IRequestDuplicateInput;
}

export interface IRequestDuplicateInput {
  licenseIds: number[];
}

export interface IRequestDuplicateResult {
  invoiceLink: string;
}
