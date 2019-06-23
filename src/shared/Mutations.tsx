import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation registerForCourse($input: registerForCourseInput!) {
    registerForCourse(input: $input) {
      success
      message
    }
  }
`;

export interface IRegisterForCourseInput {
  licenseId: number;
  specialtyId?: number;
  code: string;
  courseId: number;
  isDigitalSpecialty: boolean;
  title: string;
  courseDateTime: Date;
  knowledgeArea: string;
  birthPlace: string;
  invoiceAddress: string;
  street: string;
  houseNr: string;
  houseNrExtension: string | null;
  zipcode: string;
  city: string;
  country: string;
  email: string;
  phoneNr: string | null;
}

export const UNREGISTER = gql`
  mutation unRegisterForCourse($CursusDeelnameID: Int!) {
    unRegisterForCourse(CursusDeelnameID: $CursusDeelnameID) {
      success
      message
    }
  }
`;
