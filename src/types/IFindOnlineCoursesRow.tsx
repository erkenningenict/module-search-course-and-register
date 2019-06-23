export interface IOnlineCourseDetails {
  Code: string;
  SpecialtyId: string;
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
}
