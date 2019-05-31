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
}
