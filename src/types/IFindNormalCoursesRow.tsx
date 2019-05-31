import { ILocationAddress } from './ILocationAddress';

export interface INormalCourseDetails {
  Distance: number;
  RegisteredDate: string | null;
  CanUnRegister: boolean;
  CourseId: number;
  CourseCode: string;
  Date: string;
  StartTime: string;
  EndTime: string;
  Remarks: string | null;
  LocationName: string | null;
  LocationAddress: ILocationAddress;
  SpecialtyId: number;
  Code: string | null;
  Title: string;
  Theme: string;
  Competence: string;
  PromoText: string;
  Price: number;
  OrganizerId: number;
  Organizer: string | null;
  OrganizerPhone: string | null;
  OrganizerEmail: string | null;
  OrganizerWebsite: string | null;
  OrganizerContactperson: string | null;
  OrganizerAddress: string | null;
}
