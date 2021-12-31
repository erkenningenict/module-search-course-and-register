import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The Email scalar type represents E-Mail addresses compliant to RFC 822. */
  Email: any;
  /** Safe string custom scalar type that does not allow xss attacks */
  SafeString: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AangemeldeCursusDeelname = {
  __typename?: 'AangemeldeCursusDeelname';
  Begintijd: Scalars['String'];
  CursusDeelnameID: Scalars['Int'];
  CursusID: Scalars['Int'];
  Datum: Scalars['Date'];
  Eindtijd: Scalars['String'];
  IsDigitaalAanbod: Scalars['Boolean'];
  Locatie: Scalars['String'];
  Prijs: Scalars['Float'];
  Status: CursusDeelnameStatusEnum;
  Titel: Scalars['String'];
};

export type AddVisitationCommentInput = {
  commentaar: Scalars['SafeString'];
  visitatieId: Scalars['Int'];
};

export type AssignMonitorInput = {
  MonitorID?: InputMaybe<Scalars['Int']>;
  SessieID?: InputMaybe<Scalars['Int']>;
};

export type BasicPersonData = {
  Email?: InputMaybe<Scalars['Email']>;
  PersoonID: Scalars['Int'];
};

export type Beoordeling = {
  __typename?: 'Beoordeling';
  Beoordelaar?: Maybe<Persoon>;
  BeoordelingID: Scalars['Int'];
  DatumGepland?: Maybe<Scalars['Date']>;
  DatumRapport?: Maybe<Scalars['Date']>;
  PersoonID?: Maybe<Scalars['Int']>;
  Rapport?: Maybe<Scalars['String']>;
  RapportCijfer?: Maybe<Scalars['Int']>;
  Status: BeoordelingStatusEnum;
  VakID: Scalars['Int'];
};

export enum BeoordelingStatusEnum {
  Afgekeurd = 'Afgekeurd',
  CommentaarGevraagd = 'CommentaarGevraagd',
  Goedgekeurd = 'Goedgekeurd',
  TerBeoordeling = 'TerBeoordeling'
}

export type Certificaat = {
  __typename?: 'Certificaat';
  CertificaatID: Scalars['Int'];
  Code: Scalars['String'];
  Naam: Scalars['String'];
};

export type Certificering = {
  __typename?: 'Certificering';
  BeginDatum: Scalars['Date'];
  Certificaat?: Maybe<Certificaat>;
  CertificaatID: Scalars['Int'];
  CertificeringAantekeningen?: Maybe<Array<Maybe<CertificeringAantekening>>>;
  CertificeringID: Scalars['Int'];
  DatumAangemaakt: Scalars['Date'];
  DatumIngetrokkenTot?: Maybe<Scalars['Date']>;
  DatumIngetrokkenVan?: Maybe<Scalars['Date']>;
  /** Date on which all required sessions were taken */
  DatumVoldaan?: Maybe<Scalars['Date']>;
  EindDatum: Scalars['Date'];
  IsVerlengingVan?: Maybe<Scalars['Int']>;
  NormVersieID: Scalars['Int'];
  Nummer: Scalars['String'];
  NummerWeergave: Scalars['String'];
  Opmerkingen: Scalars['String'];
  Passen?: Maybe<Array<Maybe<Pas>>>;
  Persoon?: Maybe<Persoon>;
  PersoonID: Scalars['Int'];
  Status: CertificeringStatusEnum;
  UitstelTot?: Maybe<Scalars['Date']>;
  UitstelVerleend?: Maybe<Scalars['Boolean']>;
};

export type CertificeringAantekening = {
  __typename?: 'CertificeringAantekening';
  /** Can only contain KBA of KBA-GB */
  AantekeningCode: Scalars['String'];
  CertificeringID: Scalars['Int'];
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  DatumGewijzigd?: Maybe<Scalars['Date']>;
  DatumPasAangemaakt?: Maybe<Scalars['Date']>;
  Opmerkingen?: Maybe<Scalars['String']>;
  PersoonIDAangemaakt?: Maybe<Scalars['Int']>;
  PersoonIDGewijzigd?: Maybe<Scalars['Int']>;
  VanafDatum: Scalars['Date'];
};

export enum CertificeringStatusEnum {
  DiplomaAfgekeurd = 'DiplomaAfgekeurd',
  Geldig = 'Geldig',
  Ingenomen = 'Ingenomen',
  Ingetrokken = 'Ingetrokken',
  TerGoedkeuring = 'TerGoedkeuring',
  Verlopen = 'Verlopen'
}

export type CheckForExistingPersonByBsnResult = {
  __typename?: 'checkForExistingPersonByBsnResult';
  /** If personFound = true, the remarks how person is found (only on BSN, or on BSN and birth date) */
  message?: Maybe<Scalars['String']>;
  /** If person is found, true, not found is false */
  personFoundInDatabase: Scalars['Boolean'];
  /** Optional check if the person is found in the Gba (only executed when not found in database) */
  personFoundInGba?: Maybe<Scalars['Boolean']>;
  /** If personFound = true, an array of the found persons (of type Persoon, but limited fields) */
  persons?: Maybe<Array<Maybe<Persoon>>>;
};

export type CheckForExistingPersonByPersonDataResult = {
  __typename?: 'checkForExistingPersonByPersonDataResult';
  /** If personFound = true, the remarks how person is found (only on BSN, or on BSN and birth date) */
  message?: Maybe<Scalars['String']>;
  /** If person is found, true, not found is false */
  personFoundInDatabase: Scalars['Boolean'];
  /** If personFound = true, an array of the found persons (of type Persoon, but limited fields) */
  persons?: Maybe<Array<Maybe<Persoon>>>;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  dateOfComment?: Maybe<Scalars['Date']>;
  sort?: Maybe<Scalars['Int']>;
  source?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Competentie = {
  __typename?: 'Competentie';
  Code: Scalars['String'];
  CompetentieID: Scalars['Int'];
  Naam: Scalars['String'];
  UniversiteitID?: Maybe<Scalars['Int']>;
};

export type Contactgegevens = {
  __typename?: 'Contactgegevens';
  Adresregel1: Scalars['String'];
  Adresregel2?: Maybe<Scalars['String']>;
  ContactgegevensID: Scalars['Int'];
  DisplayAddress?: Maybe<Scalars['String']>;
  Email?: Maybe<Scalars['String']>;
  EmailWerkgever?: Maybe<Scalars['String']>;
  Fax?: Maybe<Scalars['String']>;
  Huisnummer: Scalars['String'];
  HuisnummerToevoeging?: Maybe<Scalars['String']>;
  Land: Scalars['String'];
  Postcode: Scalars['String'];
  RekeningNummer?: Maybe<Scalars['String']>;
  Telefoon?: Maybe<Scalars['String']>;
  TerAttentieVan?: Maybe<Scalars['String']>;
  Website?: Maybe<Scalars['String']>;
  Woonplaats: Scalars['String'];
};

export type ContactgegevensInput = {
  Adresregel1: Scalars['SafeString'];
  Email?: InputMaybe<Scalars['SafeString']>;
  Huisnummer: Scalars['SafeString'];
  HuisnummerToevoeging?: InputMaybe<Scalars['SafeString']>;
  Land: Scalars['SafeString'];
  Postcode: Scalars['SafeString'];
  Telefoon?: InputMaybe<Scalars['SafeString']>;
  Website?: InputMaybe<Scalars['SafeString']>;
  Woonplaats: Scalars['SafeString'];
};

export type CreateCourseInput = {
  Begintijd: Scalars['Date'];
  Datum: Scalars['Date'];
  Docent?: InputMaybe<Scalars['SafeString']>;
  Eindtijd: Scalars['Date'];
  IsBesloten: Scalars['Boolean'];
  LokatieID: Scalars['Int'];
  MaximumCursisten: Scalars['Int'];
  Opmerkingen?: InputMaybe<Scalars['SafeString']>;
  Prijs: Scalars['Float'];
  Promotietekst: Scalars['SafeString'];
  Titel: Scalars['SafeString'];
  VakID: Scalars['Int'];
};

export type CreateDeclarationInvoiceInput = {
  NrOfDayParts?: InputMaybe<Scalars['Int']>;
  NrOfKilometers?: InputMaybe<Scalars['Int']>;
  Other?: InputMaybe<Scalars['Float']>;
  OtherDescription?: InputMaybe<Scalars['SafeString']>;
  PublicTransport?: InputMaybe<Scalars['Float']>;
  VisitatieID: Scalars['Int'];
};

export type CreateInvoiceCollectionInput = {
  invoiceIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type CreateInvoiceCollectionResult = {
  __typename?: 'CreateInvoiceCollectionResult';
  invoiceCollectionId?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateLicenseInput = {
  certificateId: Scalars['Int'];
  endDate: Scalars['Date'];
  /** licenseId that the new license should be based off from */
  isExtensionOf: Scalars['Int'];
  personId: Scalars['Int'];
  remark?: InputMaybe<Scalars['SafeString']>;
  startDate: Scalars['Date'];
};

export type CreatePasInput = {
  amount?: InputMaybe<Scalars['Int']>;
  createInvoice?: InputMaybe<Scalars['Boolean']>;
  licenseId: Scalars['Int'];
  recipient?: InputMaybe<Scalars['SafeString']>;
  remark?: InputMaybe<Scalars['SafeString']>;
  requestDate: Scalars['Date'];
};

export type CreatePasResult = {
  __typename?: 'CreatePasResult';
  Pas?: Maybe<Pas>;
  success: Scalars['Boolean'];
};

export type CreatePersonByBsn = {
  /** BSN can be 8 or 9 digits long */
  BSN: Scalars['Int'];
  /** Email address is required */
  Email: Scalars['Email'];
  /**
   * Use i.e. `new Date(Date.UTC(1955, 8, 3)).getTime()`
   * which is: 3 sept 1955 00:00:00 GMT+2 (CEST)
   * Needed to match SQL Server database field value for a Date field
   */
  Geboortedatum: Scalars['Date'];
};

export type CreatePersonByPersonData = {
  /** Max 50 chars */
  Achternaam: Scalars['SafeString'];
  /** Max 100 chars */
  Adresregel1: Scalars['SafeString'];
  /** Max 100 chars */
  Adresregel2?: InputMaybe<Scalars['SafeString']>;
  /** Email address is required */
  Email: Scalars['Email'];
  /**
   * Use i.e. `new Date(Date.UTC(1955, 8, 3)).getTime()`
   * which is: 3 sept 1955 00:00:00 GMT+2 (CEST)
   * Needed to match SQL Server database field value for a Date field
   */
  Geboortedatum: Scalars['Date'];
  /** Can only be 'o', 'm, 'v' */
  Geslacht: Scalars['SafeString'];
  /** Max 20 chars */
  Huisnummer: Scalars['Int'];
  /** Max 20 chars */
  HuisnummerToevoeging?: InputMaybe<Scalars['SafeString']>;
  /** Use Landen endpoint */
  Land: Scalars['SafeString'];
  /** Use Nationaliteiten endpoint */
  Nationaliteit: Scalars['SafeString'];
  /** Max 20 chars */
  Postcode: Scalars['SafeString'];
  /** Max 50 chars */
  Tussenvoegsel?: InputMaybe<Scalars['SafeString']>;
  /** Max 50 chars */
  Voorletters: Scalars['SafeString'];
  /** Max 100 chars */
  Woonplaats: Scalars['SafeString'];
};

export enum CrediteurTypeEnum {
  Persoon = 'persoon',
  Universiteit = 'universiteit'
}

export type Cursus = {
  __typename?: 'Cursus';
  /**  Only available when sub query is available  */
  AantalCursusDeelnames?: Maybe<Scalars['Int']>;
  AantalDeelnamesAangemeld?: Maybe<Scalars['Int']>;
  /**  Only available when associated entity CursusDeelname is available  */
  AantalDeelnamesVoorlopig?: Maybe<Scalars['Int']>;
  AocKenmerk?: Maybe<Scalars['String']>;
  CursusCode?: Maybe<Scalars['String']>;
  CursusDeelnames?: Maybe<Array<Maybe<CursusDeelname>>>;
  CursusID: Scalars['Int'];
  CursusleiderID?: Maybe<Scalars['Int']>;
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  DatumGewijzigd?: Maybe<Scalars['Date']>;
  ExamenCursusID?: Maybe<Scalars['Int']>;
  IsBesloten?: Maybe<Scalars['Boolean']>;
  MaximumCursisten?: Maybe<Scalars['Int']>;
  Opmerkingen?: Maybe<Scalars['String']>;
  PersoonIDAangemaakt?: Maybe<Scalars['Int']>;
  PersoonIDGewijzigd?: Maybe<Scalars['Int']>;
  Prijs?: Maybe<Scalars['Float']>;
  Promotietekst?: Maybe<Scalars['String']>;
  Sessies?: Maybe<Array<Maybe<Sessie>>>;
  Status: CursusStatusEnum;
  Titel?: Maybe<Scalars['String']>;
  Vak: Vak;
  VakID?: Maybe<Scalars['Int']>;
};

export type CursusDeelname = {
  __typename?: 'CursusDeelname';
  Certificering?: Maybe<Certificering>;
  CertificeringID?: Maybe<Scalars['Int']>;
  Cursus: Cursus;
  CursusDeelnameID: Scalars['Int'];
  CursusID: Scalars['Int'];
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  Opmerkingen?: Maybe<Scalars['String']>;
  Persoon?: Maybe<Persoon>;
  PersoonID: Scalars['Int'];
  Status: CursusDeelnameStatusEnum;
};

export enum CursusDeelnameStatusEnum {
  Aangemeld = 'Aangemeld',
  Aanwezig = 'Aanwezig',
  Afgemeld = 'Afgemeld',
  Afgewezen = 'Afgewezen',
  Betaald = 'Betaald',
  Geregistreerd = 'Geregistreerd',
  Geslaagd = 'Geslaagd',
  GeslaagdPraktijkGezaktTheorie = 'GeslaagdPraktijk_GezaktTheorie',
  GeslaagdTheorieGezaktPraktijk = 'GeslaagdTheorie_GezaktPraktijk',
  Gezakt = 'Gezakt',
  Voorlopig = 'Voorlopig'
}

export type CursusNodes = {
  __typename?: 'CursusNodes';
  nodes?: Maybe<Array<Maybe<Cursus>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
};

export type CursusSessie = {
  __typename?: 'CursusSessie';
  CanUnRegister: Scalars['Boolean'];
  Competence: Scalars['String'];
  CourseCode: Scalars['String'];
  CourseId: Scalars['Int'];
  Date: Scalars['Date'];
  Distance?: Maybe<Scalars['Int']>;
  EndTime: Scalars['String'];
  LocationAddress?: Maybe<LocationAddress>;
  LocationName: Scalars['String'];
  Organizer: Scalars['String'];
  OrganizerEmail?: Maybe<Scalars['String']>;
  OrganizerPhone?: Maybe<Scalars['String']>;
  OrganizerWebsite?: Maybe<Scalars['String']>;
  Price: Scalars['Float'];
  PromoText?: Maybe<Scalars['String']>;
  Registered: Scalars['Boolean'];
  RegisteredDate?: Maybe<Scalars['Date']>;
  SpecialtyId: Scalars['Int'];
  SpecialtyWebsite?: Maybe<Scalars['String']>;
  StartTime: Scalars['String'];
  Theme: Scalars['String'];
  Title: Scalars['String'];
};

export enum CursusStatusEnum {
  Betaald = 'Betaald',
  DeelnemersAangemeld = 'DeelnemersAangemeld',
  Goedgekeurd = 'Goedgekeurd',
  Voorlopig = 'Voorlopig'
}

export enum DebiteurTypeEnum {
  Exameninstelling = 'exameninstelling',
  Persoon = 'persoon',
  Universiteit = 'universiteit',
  Vakgroep = 'vakgroep'
}

export type DeclarationInvoiceCreatedResult = {
  __typename?: 'DeclarationInvoiceCreatedResult';
  FactuurNummer: Scalars['String'];
  InvoiceLink: Scalars['String'];
};

export type DecoupleLicenseInput = {
  confirmationEmail?: InputMaybe<Scalars['String']>;
  /** Current XX + KBA license which should be decoupled */
  licenseId: Scalars['Int'];
};

export type DecoupleLicenseResult = {
  __typename?: 'decoupleLicenseResult';
  kbaLicense?: Maybe<Certificering>;
  updatedLicense?: Maybe<Certificering>;
};

export type DeleteExamInput = {
  CursusID?: InputMaybe<Scalars['Int']>;
};

export type DeleteExamResult = {
  __typename?: 'DeleteExamResult';
  success: Scalars['Boolean'];
};

export type DigitaalExamen = {
  __typename?: 'DigitaalExamen';
  AssementId: Scalars['String'];
  DigitaalExamenId: Scalars['Int'];
  ExamenNaam: Scalars['String'];
  ExamenType: Scalars['String'];
};

export type DiscussieVisitatie = {
  __typename?: 'DiscussieVisitatie';
  Commentaar?: Maybe<Scalars['String']>;
  DatumTijd?: Maybe<Scalars['Date']>;
  DiscussieVisitatieID: Scalars['Int'];
  IsAuteurInspecteur?: Maybe<Scalars['Boolean']>;
  IsAuteurVakgroep?: Maybe<Scalars['Boolean']>;
  Persoon?: Maybe<Persoon>;
  PersoonID?: Maybe<Scalars['Int']>;
  VakgroepID?: Maybe<Scalars['Int']>;
  VisitatieID: Scalars['Int'];
};

export type Exam = {
  __typename?: 'Exam';
  Cursus?: Maybe<Cursus>;
  Vaknorm?: Maybe<Vaknorm>;
};

export type ExamenInstelling = {
  __typename?: 'ExamenInstelling';
  Code: Scalars['String'];
  Contactgegevens: Contactgegevens;
  ExamenInstellingID: Scalars['Int'];
  Examinator: Examinator;
  IsActief: Scalars['Boolean'];
  IsBtwPlichtig: Scalars['Boolean'];
  Naam: Scalars['String'];
};

export type ExamenInstellingLink = {
  __typename?: 'ExamenInstellingLink';
  Actief: Scalars['Boolean'];
  ExamenInstelling?: Maybe<ExamenInstelling>;
  ExamenInstellingID: Scalars['Int'];
  ExaminatorID: Scalars['Int'];
  PersoonID: Scalars['Int'];
};

export type Examinator = {
  __typename?: 'Examinator';
  Actief: Scalars['Boolean'];
  ExamenInstelling?: Maybe<ExamenInstelling>;
  ExamenInstellingID: Scalars['Int'];
  ExaminatorID: Scalars['Int'];
  Persoon?: Maybe<Persoon>;
  PersoonID: Scalars['Int'];
};

export type ExamsInput = {
  examCode?: InputMaybe<Scalars['SafeString']>;
  from?: InputMaybe<Scalars['Date']>;
  locationId?: InputMaybe<Scalars['Int']>;
  orderBy: OrderByArgs;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
  status?: InputMaybe<CursusStatusEnum>;
  title?: InputMaybe<Scalars['SafeString']>;
  to?: InputMaybe<Scalars['Date']>;
  withoutParticipants?: InputMaybe<Scalars['Boolean']>;
};

export type ExamSpecialtiesInput = {
  examenInstellingId?: InputMaybe<Scalars['Int']>;
  validOnly?: InputMaybe<Scalars['Boolean']>;
};

export enum FactuurHistorieStatusEnum {
  Aangemaakt = 'Aangemaakt',
  Betaald = 'Betaald',
  Creditfactuur = 'Creditfactuur',
  DoorBeAfgehandeld = 'Door_BE_Afgehandeld',
  Oninbaar = 'Oninbaar',
  OnjuistAangemaakt = 'OnjuistAangemaakt'
}

export type FactuurNodes = {
  __typename?: 'FactuurNodes';
  nodes?: Maybe<Array<Maybe<Invoice>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['ID'];
  mimetype: Scalars['String'];
  path: Scalars['String'];
};

export type FilterInvoicesInput = {
  CrediteurID?: InputMaybe<Scalars['Int']>;
  CrediteurType?: InputMaybe<Scalars['SafeString']>;
  CursusCode?: InputMaybe<Scalars['SafeString']>;
  DebiteurID?: InputMaybe<Scalars['Int']>;
  DebiteurType?: InputMaybe<DebiteurTypeEnum>;
  ExamenInstellingID?: InputMaybe<Scalars['Int']>;
  FactuurNummer?: InputMaybe<Scalars['SafeString']>;
  ForReviewersOnly?: InputMaybe<Scalars['Boolean']>;
  FromDate?: InputMaybe<Scalars['Date']>;
  InvoiceCollectionFilter?: InputMaybe<InvoiceCollectionsFilterEnum>;
  InvoiceStatusFilterList?: InputMaybe<Array<InputMaybe<Scalars['SafeString']>>>;
  PaymentStatus?: InputMaybe<PaymentStatusEnum>;
  ToDate?: InputMaybe<Scalars['Date']>;
  VakgroepID?: InputMaybe<Scalars['Int']>;
};

export type GetInspectionPlanningInput = {
  isInspector: Scalars['Boolean'];
  isRector: Scalars['Boolean'];
  plannable: Scalars['Boolean'];
  shouldOnlyBePlanned: Scalars['Boolean'];
  showStatsForPeriod: Scalars['Boolean'];
  startDate: Scalars['Date'];
  targetSettings: TargetSettings;
};

export type GetInspectionReportsInput = {
  competentieId: Scalars['Int'];
  datumVisitatieTot: Scalars['Date'];
  datumVisitatieVan: Scalars['Date'];
  examenInstellingId: Scalars['Int'];
  inspecteurId: Scalars['Int'];
  rapportCijfer: Scalars['Int'];
  themaId: Scalars['Int'];
  vakgroepId: Scalars['Int'];
  vakId: Scalars['Int'];
  volgensIntentieAanbod: Scalars['Int'];
};

export enum InkoopVerkoopEnum {
  Inkoop = 'INKOOP',
  Verkoop = 'VERKOOP'
}

export type InspectionPlanningData = {
  __typename?: 'InspectionPlanningData';
  NrOfDaysSinceLastVisit?: Maybe<Scalars['Int']>;
  OrganizerTargetActual: Scalars['Float'];
  SessieData: PlanningData;
  ShouldBeVisited: Scalars['Boolean'];
  SpecialtyTargetActual: Scalars['Float'];
};

export type InspectionResult = {
  __typename?: 'InspectionResult';
  InspectionStatisticsOverall?: Maybe<VisitingData>;
  PlanningData: Array<Maybe<InspectionPlanningData>>;
  StatisticsPerOrganizer?: Maybe<Array<Maybe<StatisticsPerOrganizer>>>;
};

export type Inspector = {
  __typename?: 'Inspector';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Invoice = {
  __typename?: 'Invoice';
  BedragExBtw: Scalars['Float'];
  BedragIncBtw: Scalars['Float'];
  BtwBedrag: Scalars['Float'];
  CrediteurID: Scalars['Int'];
  CrediteurType: Scalars['String'];
  CreditFactuurID?: Maybe<Scalars['Int']>;
  CreditFactuurNummer?: Maybe<Scalars['String']>;
  CreditInvoiceLink?: Maybe<Scalars['String']>;
  CursusCode: Scalars['String'];
  DebiteurID: Scalars['Int'];
  DebiteurNaam: Scalars['String'];
  DebiteurType: DebiteurTypeEnum;
  FactuurDatum: Scalars['Date'];
  FactuurID: Scalars['Int'];
  FactuurJaar: Scalars['Int'];
  FactuurNummer: Scalars['String'];
  FactuurStatus: Scalars['String'];
  InVerzamelfactuur: Scalars['Int'];
  InvoiceLink: Scalars['String'];
  IsBetaald: Scalars['Boolean'];
  IsCreditFactuur?: Maybe<Scalars['Boolean']>;
  Kenmerk?: Maybe<Scalars['String']>;
  KenmerkJaarFactuurNummer: Scalars['String'];
  OrigineleFactuurID?: Maybe<Scalars['Int']>;
  OrigineleFactuurNummer?: Maybe<Scalars['String']>;
  OrigineleInvoiceLink?: Maybe<Scalars['String']>;
  ProductCode: Scalars['String'];
  ProductNaam: Scalars['String'];
  StatusOpmerkingen?: Maybe<Scalars['String']>;
  VerzamelFactuurBedrag: Scalars['Float'];
  VerzamelFactuurBTWBedrag: Scalars['Float'];
  VerzamelFactuurDatum?: Maybe<Scalars['Date']>;
  VerzamelFactuurDatumBetaald?: Maybe<Scalars['Date']>;
  VerzamelFactuurID: Scalars['Int'];
  VerzamelFactuurIsBetaald: Scalars['Boolean'];
  VerzamelFactuurOpmerking?: Maybe<Scalars['String']>;
};

export enum InvoiceCollectionsFilterEnum {
  Both = 'BOTH',
  InvoiceCollections = 'INVOICE_COLLECTIONS',
  NormalInvoices = 'NORMAL_INVOICES'
}

export type IsLicenseValidForSpecialtyInput = {
  courseId?: InputMaybe<Scalars['Int']>;
  licenseId: Scalars['Int'];
  specialtyId?: InputMaybe<Scalars['Int']>;
};

export type IsLicenseValidForSpecialtyResult = {
  __typename?: 'isLicenseValidForSpecialtyResult';
  success: Scalars['Boolean'];
};

export type Kennisgebied = {
  __typename?: 'Kennisgebied';
  KennisgebiedID: Scalars['Int'];
  Naam: Scalars['String'];
  UniversiteitID?: Maybe<Scalars['Int']>;
};

export type Landen = {
  __typename?: 'Landen';
  Text: Scalars['String'];
  Value: Scalars['String'];
};

export type LastVisitData = {
  __typename?: 'LastVisitData';
  AccordingIntention?: Maybe<Scalars['Boolean']>;
  InspectorId?: Maybe<Scalars['Int']>;
  ReportCreatedDate?: Maybe<Scalars['Date']>;
  ReportGrade?: Maybe<Scalars['Float']>;
  VisitedDate?: Maybe<Scalars['Date']>;
};

export type LocationAddress = {
  __typename?: 'LocationAddress';
  City?: Maybe<Scalars['String']>;
  Email?: Maybe<Scalars['String']>;
  HouseNr: Scalars['String'];
  HouseNrExtension?: Maybe<Scalars['String']>;
  Street: Scalars['String'];
  Website?: Maybe<Scalars['String']>;
  Zipcode?: Maybe<Scalars['String']>;
};

export type Lokatie = {
  __typename?: 'Lokatie';
  Contactgegevens: Contactgegevens;
  ContactgegevensID?: Maybe<Scalars['Int']>;
  ExamenInstellingID?: Maybe<Scalars['Int']>;
  IsActief: Scalars['Boolean'];
  LokatieID: Scalars['Int'];
  Naam: Scalars['String'];
  Routebeschrijving: Scalars['String'];
  VakgroepID?: Maybe<Scalars['Int']>;
};

export type ManuallyProcessGraduatesResult = {
  __typename?: 'manuallyProcessGraduatesResult';
  message: Scalars['String'];
};

export type Monitor = {
  __typename?: 'Monitor';
  Achternaam: Scalars['SafeString'];
  Email: Scalars['Email'];
  ExamenInstellingID: Scalars['Int'];
  Geslacht: Scalars['SafeString'];
  MonitorID: Scalars['Int'];
  SortableFullName?: Maybe<Scalars['SafeString']>;
  Tussenvoegsel?: Maybe<Scalars['SafeString']>;
  Voornaam: Scalars['SafeString'];
};

export type MultiUploadResult = {
  __typename?: 'MultiUploadResult';
  result: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addVisitationComment?: Maybe<DiscussieVisitatie>;
  assignMonitor?: Maybe<Scalars['Boolean']>;
  /**
   * Checks if person exists in the database by bsn and birth date and if not,
   * checks the person in the GBA
   */
  checkForExistingPersonByBsn?: Maybe<CheckForExistingPersonByBsnResult>;
  /** Checks if the person exists by initials, last name and birth date in the database */
  checkForExistingPersonByPersonData?: Maybe<CheckForExistingPersonByPersonDataResult>;
  createCourse?: Maybe<Cursus>;
  createDeclarationInvoice: DeclarationInvoiceCreatedResult;
  createDuplicateCardWithoutInvoice: Scalars['Boolean'];
  createInvoiceCollection: CreateInvoiceCollectionResult;
  /** The createLicense mutation is used to create a new license and a card for a person */
  createLicense: Certificering;
  createPas?: Maybe<CreatePasResult>;
  /** The `decoupleLicense` can be used to decouple an XX + KBA license */
  decoupleLicense: DecoupleLicenseResult;
  deleteExam?: Maybe<DeleteExamResult>;
  /** Manually start processing of graduates */
  manuallyProcessGraduates: ManuallyProcessGraduatesResult;
  multipleUpload: Array<File>;
  multiUpload: MultiUploadResult;
  registerCardReturn: Scalars['Boolean'];
  /** Register for course */
  registerForCourse: RegisterResult;
  removeParticipant?: Maybe<RemoveParticipantResult>;
  /** The `requestDuplicate` can be used to request a license card duplicate */
  requestDuplicate: RequestDuplicateResult;
  /** The `requestLicense` can be used to request a certificate */
  requestLicense: RequestLicenseResult;
  saveExam?: Maybe<SaveExamResult>;
  /** Create or update a location */
  saveLocation: Lokatie;
  /** Create or update a monitor */
  saveMonitor: Monitor;
  singleUpload: File;
  submitParticipants?: Maybe<SubmitParticipantsResult>;
  unassignMonitor?: Maybe<Scalars['Boolean']>;
  /** Un-register for course. Input is CursusDeelnameID */
  unRegisterForCourse: UnRegisterResult;
  updateInvoiceStatus: UpdateInvoiceStatusResult;
  updatePlanning: UpdatePlanningResult;
  updateVisitationReport: Visitatie;
  uploadParticipantsExcel?: Maybe<UploadParticipantsExcelResult>;
};


export type MutationAddVisitationCommentArgs = {
  input: AddVisitationCommentInput;
};


export type MutationAssignMonitorArgs = {
  input: AssignMonitorInput;
};


export type MutationCheckForExistingPersonByBsnArgs = {
  birthDate: Scalars['Date'];
  bsn: Scalars['Int'];
};


export type MutationCheckForExistingPersonByPersonDataArgs = {
  birthDate: Scalars['Date'];
  initials: Scalars['String'];
  lastName: Scalars['String'];
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationCreateDeclarationInvoiceArgs = {
  input: CreateDeclarationInvoiceInput;
};


export type MutationCreateDuplicateCardWithoutInvoiceArgs = {
  pasId: Scalars['Int'];
};


export type MutationCreateInvoiceCollectionArgs = {
  input: CreateInvoiceCollectionInput;
};


export type MutationCreateLicenseArgs = {
  input: CreateLicenseInput;
};


export type MutationCreatePasArgs = {
  input: CreatePasInput;
};


export type MutationDecoupleLicenseArgs = {
  input: DecoupleLicenseInput;
};


export type MutationDeleteExamArgs = {
  input: DeleteExamInput;
};


export type MutationMultipleUploadArgs = {
  files: Array<Scalars['Upload']>;
};


export type MutationMultiUploadArgs = {
  file1: Scalars['Upload'];
  file2: Scalars['Upload'];
};


export type MutationRegisterCardReturnArgs = {
  input: RegisterCardReturnInput;
};


export type MutationRegisterForCourseArgs = {
  input: RegisterForCourseInput;
};


export type MutationRemoveParticipantArgs = {
  input: RemoveParticipantInput;
};


export type MutationRequestDuplicateArgs = {
  input: RequestDuplicateInput;
};


export type MutationRequestLicenseArgs = {
  createPersonByBsnInput?: InputMaybe<CreatePersonByBsn>;
  createPersonByPersonDataInput?: InputMaybe<CreatePersonByPersonData>;
  input: RequestLicenseInput;
  personDataInput?: InputMaybe<BasicPersonData>;
};


export type MutationSaveExamArgs = {
  input: SaveExamInput;
};


export type MutationSaveLocationArgs = {
  input: SaveLocationInput;
};


export type MutationSaveMonitorArgs = {
  input: SaveMonitorInput;
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationSubmitParticipantsArgs = {
  input: SubmitParticipantsInput;
};


export type MutationUnassignMonitorArgs = {
  input: UnassignMonitorInput;
};


export type MutationUnRegisterForCourseArgs = {
  CursusDeelnameID: Scalars['Int'];
};


export type MutationUpdateInvoiceStatusArgs = {
  input: UpdateInvoiceStatusInput;
};


export type MutationUpdatePlanningArgs = {
  inspectorId: Scalars['Int'];
  sessieId: Scalars['Int'];
  visitDate: Scalars['Date'];
};


export type MutationUpdateVisitationReportArgs = {
  input: UpdateVisitationReportInput;
};


export type MutationUploadParticipantsExcelArgs = {
  input: UploadParticipantsExcelInput;
};

export type My = {
  __typename?: 'My';
  AangemeldeCursusDeelnames?: Maybe<Array<Maybe<AangemeldeCursusDeelname>>>;
  /**
   * Fetches only current licenses when 'alleenGeldig' is true.
   * When false (default), fetches all licenses.
   * 'perDatum' sets the date that the licenses should be valid (default today)
   */
  Certificeringen?: Maybe<Array<Maybe<Certificering>>>;
  CursusDeelnames?: Maybe<Array<Maybe<CursusDeelname>>>;
  /** Link to exameninstelling(en), via Examinator table */
  ExamenInstellingLinks?: Maybe<Array<Maybe<ExamenInstellingLink>>>;
  Persoon: Persoon;
  Roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  Studieresultaten?: Maybe<Array<Maybe<Studieresultaat>>>;
  StudyProgress: Array<StudyProgress>;
  /** Link to vakgroep(en), via Hoogleraar table */
  VakgroepLinks?: Maybe<Array<Maybe<VakgroepLink>>>;
};


export type MyCertificeringenArgs = {
  alleenGeldig?: InputMaybe<Scalars['Boolean']>;
  inclusiefPassen?: InputMaybe<Scalars['Boolean']>;
  perDatum?: InputMaybe<Scalars['Date']>;
};


export type MyCursusDeelnamesArgs = {
  certificeringId?: InputMaybe<Scalars['Int']>;
};


export type MyExamenInstellingLinksArgs = {
  activeOnly?: InputMaybe<Scalars['Boolean']>;
};


export type MyStudieresultatenArgs = {
  certificeringId?: InputMaybe<Scalars['Int']>;
  isExamen?: InputMaybe<Scalars['Boolean']>;
};


export type MyStudyProgressArgs = {
  skipParticipationDetails?: InputMaybe<Scalars['Boolean']>;
};


export type MyVakgroepLinksArgs = {
  activeOnly?: InputMaybe<Scalars['Boolean']>;
};

export type Nationaliteiten = {
  __typename?: 'Nationaliteiten';
  Text: Scalars['String'];
  Value: Scalars['String'];
};

export type NormVersie = {
  __typename?: 'NormVersie';
  BeginDatum?: Maybe<Scalars['Date']>;
  Definitief?: Maybe<Scalars['Boolean']>;
  EindDatum?: Maybe<Scalars['Date']>;
  NormVersieID: Scalars['Int'];
  Opmerkingen?: Maybe<Scalars['String']>;
  UniversiteitID?: Maybe<Scalars['Int']>;
  Versienummer?: Maybe<Scalars['String']>;
};

export type OrderByArgs = {
  field: Scalars['String'];
  sortDirection: SortDirectionEnum;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
};

export type ParticipationPoint = {
  __typename?: 'ParticipationPoint';
  CountedPoints: Scalars['Int'];
  DonePoints: Scalars['Int'];
  RequiredPoints: Scalars['Int'];
  ThemaId: Scalars['Int'];
  ThemaNaam: Scalars['String'];
};

export type Pas = {
  __typename?: 'Pas';
  Aantal: Scalars['Int'];
  BriefVerstuurd: Scalars['Boolean'];
  CertificeringID: Scalars['Int'];
  ContactgegevensID?: Maybe<Scalars['Int']>;
  DatumAanvraag: Scalars['Date'];
  DatumUitgeleverd?: Maybe<Scalars['Date']>;
  Geadresseerde?: Maybe<Scalars['String']>;
  Licentie?: Maybe<Certificering>;
  PasAdres?: Maybe<Contactgegevens>;
  PasID: Scalars['Int'];
  PasRetouren?: Maybe<Array<Maybe<PasRetour>>>;
  Status: PasStatusEnum;
};

export type PasRetour = {
  __typename?: 'PasRetour';
  AangemaaktDoor: Scalars['String'];
  DatumAangemaakt: Scalars['Date'];
  DatumRetour: Scalars['Date'];
  PasID: Scalars['Int'];
  PasRetourID: Scalars['Int'];
};

export enum PasStatusEnum {
  Aangevraagd = 'Aangevraagd',
  Betaald = 'Betaald',
  Error = 'Error',
  OnHold = 'OnHold',
  Uitgeleverd = 'Uitgeleverd'
}

export enum PaymentStatusEnum {
  All = 'ALL',
  NotPaid = 'NOT_PAID',
  Paid = 'PAID'
}

export type Persoon = {
  __typename?: 'Persoon';
  Achternaam: Scalars['String'];
  Actief?: Maybe<Scalars['Boolean']>;
  BSN?: Maybe<Scalars['Int']>;
  /** Fetches all licenses */
  Certificeringen?: Maybe<Array<Maybe<Certificering>>>;
  /** Gets the contact data */
  Contactgegevens: Contactgegevens;
  /** Name in format 'Voorletters [tussenvoegsel] Achternaam */
  FullName?: Maybe<Scalars['String']>;
  GbaNummer: Scalars['String'];
  GbaUpdate?: Maybe<Scalars['Date']>;
  Geboortedatum?: Maybe<Scalars['Date']>;
  Geslacht: Scalars['String'];
  IsGbaGeregistreerd?: Maybe<Scalars['Boolean']>;
  Nationaliteit: Scalars['String'];
  PersoonID: Scalars['Int'];
  Roepnaam: Scalars['String'];
  /** Name in format 'Achternaam, Voorletters [tussenvoegsel]' */
  SortableFullName?: Maybe<Scalars['String']>;
  Tussenvoegsel: Scalars['String'];
  Voorletters: Scalars['String'];
};


export type PersoonCertificeringenArgs = {
  alleenGeldig?: InputMaybe<Scalars['Boolean']>;
  perDatum?: InputMaybe<Scalars['Date']>;
};

export type PlanningData = {
  __typename?: 'PlanningData';
  BeginDatum: Scalars['Date'];
  BeginDatumTijd?: Maybe<Scalars['Date']>;
  Begintijd?: Maybe<Scalars['String']>;
  CursusCode?: Maybe<Scalars['Int']>;
  CursusID: Scalars['Int'];
  CursusStatus?: Maybe<Scalars['String']>;
  DatumRapport?: Maybe<Scalars['Date']>;
  DatumVisitatie?: Maybe<Scalars['Date']>;
  Eindtijd?: Maybe<Scalars['String']>;
  InstellingID: Scalars['Int'];
  InstellingNaam: Scalars['String'];
  LocatieID?: Maybe<Scalars['Int']>;
  LocatieToevoeging?: Maybe<Scalars['String']>;
  Naam?: Maybe<Scalars['String']>;
  PersoonID?: Maybe<Scalars['Int']>;
  Rapportcijfer?: Maybe<Scalars['Int']>;
  SessieID: Scalars['Int'];
  SessieType?: Maybe<Scalars['String']>;
  Titel?: Maybe<Scalars['String']>;
  VakID: Scalars['Int'];
  VakType: Scalars['String'];
  VisitatieID?: Maybe<Scalars['Int']>;
  VisitatieStatus?: Maybe<Scalars['String']>;
  VolgensIntentieAanbod?: Maybe<Scalars['Boolean']>;
  Woonplaats?: Maybe<Scalars['String']>;
};

export enum ProductConfiguratieCodeEnum {
  Ad = 'AD',
  Aeikg = 'AEIKG',
  Aekg = 'AEKG',
  Aekt = 'AEKT',
  Beec = 'BEEC',
  Beke = 'BEKE',
  Bevi = 'BEVI',
  D1 = 'D1',
  D2 = 'D2',
  D3 = 'D3',
  D4 = 'D4',
  Detk = 'DETK',
  Mgeg = 'MGEG',
  Mgegi = 'MGEGI',
  Mgek = 'MGEK',
  Mgeki = 'MGEKI',
  Mgem = 'MGEM',
  Mgemi = 'MGEMI'
}

export enum ProductEnum {
  D1 = 'D1',
  D2 = 'D2',
  D3 = 'D3',
  D4 = 'D4'
}

export type Query = {
  __typename?: 'Query';
  Certificaten?: Maybe<Array<Maybe<Certificaat>>>;
  /** Gets an array of Certificate's by the code of the pre-education (vooropleiding) */
  certificatesByPreEducation: Array<Maybe<Certificaat>>;
  Certificering?: Maybe<Certificering>;
  Certificeringen?: Maybe<Array<Maybe<Certificering>>>;
  Competenties: Array<Maybe<Competentie>>;
  Contactgegevens?: Maybe<Contactgegevens>;
  CursusDeelnameDetails?: Maybe<CursusDeelname>;
  CursusDeelnames?: Maybe<Array<Maybe<CursusDeelname>>>;
  CursusSessies?: Maybe<Array<Maybe<CursusSessie>>>;
  ExamDetails?: Maybe<Exam>;
  ExamenInstellingen: Array<Maybe<ExamenInstelling>>;
  Exams?: Maybe<CursusNodes>;
  ExamSpecialties?: Maybe<Array<Maybe<Vak>>>;
  getInspectionPlanning?: Maybe<InspectionResult>;
  getInspectionReports?: Maybe<Array<Maybe<Visitatie>>>;
  getInspectors?: Maybe<Array<Maybe<Inspector>>>;
  getStudyProgressByLicenseId: StudyProgress;
  getStudyProgressByPersonId: Array<StudyProgress>;
  hasDuplicatePending: Scalars['Boolean'];
  invoices: FactuurNodes;
  /** In the input, either specialtyId or courseId must be supplied */
  isLicenseValidForSpecialty: IsLicenseValidForSpecialtyResult;
  Kennisgebieden: Array<Maybe<Kennisgebied>>;
  Landen: Array<Maybe<Landen>>;
  /** Fetches data of the current logged in person */
  my?: Maybe<My>;
  Nationaliteiten: Array<Maybe<Nationaliteiten>>;
  Persoon?: Maybe<Persoon>;
  /** Get all pre education categories ordered by ID */
  preEducationCategories: Array<Maybe<VooropleidingCategorie>>;
  searchCard?: Maybe<Certificering>;
  SearchExamOrganizers?: Maybe<Array<Maybe<SearchExamOrganizerResult>>>;
  SearchLocations?: Maybe<Array<Maybe<Lokatie>>>;
  SearchMonitors?: Maybe<Array<Maybe<Monitor>>>;
  SearchOrganizers?: Maybe<Array<Maybe<SearchOrganizerResult>>>;
  SearchSpecialties?: Maybe<Array<Maybe<SearchSpecialtyResult>>>;
  Sessie?: Maybe<Sessie>;
  Specialties?: Maybe<Array<Maybe<Vak>>>;
  Specialty?: Maybe<Vak>;
  tariefByCertificaatCode?: Maybe<TotaalExtBtwTarief>;
  tariefDuplicaat?: Maybe<TotaalExtBtwTarief>;
  Themas: Array<Maybe<Thema>>;
  uploads?: Maybe<Array<Maybe<File>>>;
  Vakgroepen: Array<Maybe<Vakgroep>>;
  Visitation?: Maybe<Visitatie>;
  VisitationDeclaration?: Maybe<VisitationDeclaration>;
  Visitations?: Maybe<VisitationInfoNodes>;
  /**
   * Gets a list of all available pre educations (vooropleidingen)
   * Optionally pass a array of codes (similar in vooropleiding.code) to filter the list (i.e. ["30.00", "30.01"])
   */
  Vooropleidingen: Array<Maybe<Vooropleiding>>;
};


export type QueryCertificatenArgs = {
  idList?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryCertificatesByPreEducationArgs = {
  code: Scalars['String'];
};


export type QueryCertificeringArgs = {
  certificeringId: Scalars['Int'];
};


export type QueryCertificeringenArgs = {
  personId: Scalars['Int'];
};


export type QueryContactgegevensArgs = {
  ContactgegevensID: Scalars['Int'];
};


export type QueryCursusDeelnameDetailsArgs = {
  cursusDeelnameId: Scalars['Int'];
};


export type QueryCursusDeelnamesArgs = {
  certificeringId?: InputMaybe<Scalars['Int']>;
};


export type QueryCursusSessiesArgs = {
  input: SearchCourseSessionsInput;
};


export type QueryExamDetailsArgs = {
  input: SearchExamInput;
};


export type QueryExamenInstellingenArgs = {
  findById?: InputMaybe<Scalars['Int']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
};


export type QueryExamsArgs = {
  input: ExamsInput;
};


export type QueryExamSpecialtiesArgs = {
  input: ExamSpecialtiesInput;
};


export type QueryGetInspectionPlanningArgs = {
  input: GetInspectionPlanningInput;
};


export type QueryGetInspectionReportsArgs = {
  input: GetInspectionReportsInput;
};


export type QueryGetStudyProgressByLicenseIdArgs = {
  certificeringId: Scalars['Int'];
  skipParticipationDetails?: InputMaybe<Scalars['Boolean']>;
  studyResultsMustBePaid?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetStudyProgressByPersonIdArgs = {
  personId: Scalars['Int'];
  skipParticipationDetails?: InputMaybe<Scalars['Boolean']>;
  studyResultsMustBePaid?: InputMaybe<Scalars['Boolean']>;
};


export type QueryHasDuplicatePendingArgs = {
  licenseId: Scalars['Int'];
};


export type QueryInvoicesArgs = {
  filterInvoices?: InputMaybe<FilterInvoicesInput>;
  orderBy?: InputMaybe<OrderByArgs>;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
};


export type QueryIsLicenseValidForSpecialtyArgs = {
  input: IsLicenseValidForSpecialtyInput;
};


export type QueryPersoonArgs = {
  PersoonID: Scalars['Int'];
};


export type QuerySearchCardArgs = {
  licenseNumber: Scalars['SafeString'];
};


export type QuerySearchLocationsArgs = {
  input: SearchLocationsInput;
};


export type QuerySearchMonitorsArgs = {
  input: SearchMonitorsInput;
};


export type QuerySearchSpecialtiesArgs = {
  input: SearchSpecialtyInput;
};


export type QuerySessieArgs = {
  sessieId: Scalars['Int'];
};


export type QuerySpecialtiesArgs = {
  input: SpecialtiesInput;
};


export type QuerySpecialtyArgs = {
  fullDetails?: InputMaybe<Scalars['Boolean']>;
  vakId: Scalars['Int'];
};


export type QueryTariefByCertificaatCodeArgs = {
  certificaatCode: Scalars['String'];
  individueleAanvraag?: InputMaybe<Scalars['Boolean']>;
};


export type QueryVakgroepenArgs = {
  findById?: InputMaybe<Scalars['Int']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
};


export type QueryVisitationArgs = {
  input: VisitationInput;
};


export type QueryVisitationDeclarationArgs = {
  input: VisitationInput;
};


export type QueryVisitationsArgs = {
  input: VisitationsInput;
};


export type QueryVooropleidingenArgs = {
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type RegisterCardReturnInput = {
  DatumRetour: Scalars['Date'];
  PasID: Scalars['Int'];
};

export type RegisterForCourseInput = {
  birthPlace?: InputMaybe<Scalars['SafeString']>;
  city?: InputMaybe<Scalars['SafeString']>;
  code?: InputMaybe<Scalars['SafeString']>;
  country?: InputMaybe<Scalars['SafeString']>;
  courseDateTime?: InputMaybe<Scalars['Date']>;
  courseId: Scalars['Int'];
  email?: InputMaybe<Scalars['Email']>;
  houseNr?: InputMaybe<Scalars['SafeString']>;
  houseNrExtension?: InputMaybe<Scalars['SafeString']>;
  invoiceAddress?: InputMaybe<Scalars['SafeString']>;
  isDigitalSpecialty: Scalars['Boolean'];
  knowledgeArea?: InputMaybe<Scalars['SafeString']>;
  licenseId: Scalars['Int'];
  phoneNr?: InputMaybe<Scalars['SafeString']>;
  specialtyId?: InputMaybe<Scalars['Int']>;
  street?: InputMaybe<Scalars['SafeString']>;
  title: Scalars['SafeString'];
  zipcode?: InputMaybe<Scalars['SafeString']>;
};

export type RegisterResult = {
  __typename?: 'RegisterResult';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type RemoveParticipantInput = {
  CursusDeelnameID?: InputMaybe<Scalars['Int']>;
  CursusID?: InputMaybe<Scalars['Int']>;
};

export type RemoveParticipantResult = {
  __typename?: 'RemoveParticipantResult';
  success: Scalars['Boolean'];
};

export type RequestDuplicateInput = {
  /** Nr of cards */
  count?: InputMaybe<Scalars['Int']>;
  /** Licenses which should be duplicated */
  licenseIds: Array<InputMaybe<Scalars['Int']>>;
  /** Remark for invoice (required for anything other than KBA) */
  remark?: InputMaybe<Scalars['SafeString']>;
};

export type RequestDuplicateResult = {
  __typename?: 'requestDuplicateResult';
  /** One or multiple passes (1 for each license) */
  cards: Array<Pas>;
  /**
   * The link to the invoice in format
   * window.open('iDeal/Factuur.aspx?SafeKey=ZR6HXPxJ00YCgPIvrf3ciG00iwRcs0FDOXkJ6S9AYiOnRSYChcmsCc+/DyH1KeCh1ZL95PyapQQxIqFviIvWpWZjgR77CTAvsd1k/DFhQb5VXOx7SoHu+I0+NQiOpn1nTkeXHTYqsmggI81XDjnLowbb5qmDhynQpJqCMerD5iw=','FactuurVenster','left=100,top=50,width=700,height=800,location=0,resizable=1,toolbar=1')
   */
  invoiceLink: Scalars['String'];
};

export type RequestLicenseInput = {
  /** License the user is requesting, based on the limited list of pre-educations */
  CertificaatID: Scalars['Int'];
  /** Optional: Current license that the new license should be based off from */
  CertificeringID?: InputMaybe<Scalars['Int']>;
  /**
   * Date of pre-education result received
   * Must be between max 5 years in past or today
   */
  dateReceived: Scalars['Date'];
  /**
   * File to upload 1.
   * Eigen Verklaring or KVK uittreksel (legitimatiebewijs) or Registration certificate (inschrijvingsbewijs opleiding adviseren)
   */
  file1: Scalars['Upload'];
  /**
   * File to upload 2.
   * For normal license request: Diploma
   */
  file2?: InputMaybe<Scalars['Upload']>;
  /**
   * File to upload 3.
   * For normal license request: cijferlijst
   * For registration certificate: none
   */
  file3?: InputMaybe<Scalars['Upload']>;
  /** The Id of the pre-education (vooropleiding) */
  preEducationId: Scalars['Int'];
  /** Optional remarks */
  remarks?: InputMaybe<Scalars['SafeString']>;
};

export type RequestLicenseResult = {
  __typename?: 'requestLicenseResult';
  invoiceLink: Scalars['String'];
  requestFormPdfLink: Scalars['String'];
  VrijstellingsVerzoekID: Scalars['Int'];
};

export type SaveExamInput = {
  Begintijd: Scalars['Date'];
  CursusID?: InputMaybe<Scalars['Int']>;
  Datum: Scalars['Date'];
  Docent?: InputMaybe<Scalars['SafeString']>;
  Eindtijd: Scalars['Date'];
  IsBesloten?: InputMaybe<Scalars['Boolean']>;
  LokatieID: Scalars['Int'];
  MaximumCursisten: Scalars['Int'];
  Opmerkingen?: InputMaybe<Scalars['SafeString']>;
  Prijs: Scalars['Float'];
  Promotietekst: Scalars['SafeString'];
  SessieID?: InputMaybe<Scalars['Int']>;
  Titel: Scalars['SafeString'];
  VakID: Scalars['Int'];
};

export type SaveExamResult = {
  __typename?: 'SaveExamResult';
  Cursus: Cursus;
};

export type SaveLocationInput = {
  Contactgegevens?: InputMaybe<ContactgegevensInput>;
  ContactgegevensID?: InputMaybe<Scalars['Int']>;
  ExamenInstellingID?: InputMaybe<Scalars['Int']>;
  IsActief: Scalars['Boolean'];
  LokatieID?: InputMaybe<Scalars['Int']>;
  Naam: Scalars['SafeString'];
  Routebeschrijving?: InputMaybe<Scalars['SafeString']>;
  VakgroepID?: InputMaybe<Scalars['Int']>;
};

export type SaveMonitorInput = {
  Achternaam: Scalars['SafeString'];
  Email: Scalars['Email'];
  ExamenInstellingID?: InputMaybe<Scalars['Int']>;
  Geslacht: Scalars['SafeString'];
  MonitorID?: InputMaybe<Scalars['Int']>;
  Tussenvoegsel?: InputMaybe<Scalars['SafeString']>;
  Voornaam: Scalars['SafeString'];
};

export type SearchCourseSessionsInput = {
  competenceId?: InputMaybe<Scalars['Int']>;
  currentCourseId?: InputMaybe<Scalars['Int']>;
  distanceRadius?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Scalars['Date']>;
  isOnlineCourse: Scalars['Boolean'];
  knowledgeAreaId?: InputMaybe<Scalars['Int']>;
  themeId?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<Scalars['Date']>;
  zipcodeNumbers?: InputMaybe<Scalars['Int']>;
};

export type SearchExamInput = {
  examId: Scalars['Int'];
};

export type SearchExamOrganizerResult = {
  __typename?: 'SearchExamOrganizerResult';
  ExamenInstellingID: Scalars['Int'];
  Naam?: Maybe<Scalars['String']>;
};

export type SearchLocationsInput = {
  ExamenInstellingID?: InputMaybe<Scalars['Int']>;
  VakgroepID?: InputMaybe<Scalars['Int']>;
};

export type SearchMonitorsInput = {
  ExamenInstellingID?: InputMaybe<Scalars['Int']>;
};

export type SearchOrganizerResult = {
  __typename?: 'SearchOrganizerResult';
  Naam?: Maybe<Scalars['String']>;
  VakgroepID: Scalars['Int'];
};

export type SearchSpecialtyInput = {
  competenceId?: InputMaybe<Scalars['Int']>;
  isOnlineCourse: Scalars['Boolean'];
  knowledgeAreaId?: InputMaybe<Scalars['Int']>;
  specialtyId?: InputMaybe<Scalars['Int']>;
  themeId?: InputMaybe<Scalars['Int']>;
};

export type SearchSpecialtyResult = {
  __typename?: 'SearchSpecialtyResult';
  Code: Scalars['String'];
  Competence: Scalars['String'];
  Organizer: Scalars['String'];
  OrganizerEmail?: Maybe<Scalars['String']>;
  OrganizerPhone?: Maybe<Scalars['String']>;
  OrganizerWebsite?: Maybe<Scalars['String']>;
  Price: Scalars['Float'];
  PromoText?: Maybe<Scalars['String']>;
  SpecialtyId: Scalars['Int'];
  SpecialtyWebsite?: Maybe<Scalars['String']>;
  Theme: Scalars['String'];
  Title: Scalars['String'];
};

export type Sessie = {
  __typename?: 'Sessie';
  Begintijd: Scalars['Date'];
  Cursus?: Maybe<Cursus>;
  CursusID: Scalars['Int'];
  Datum: Scalars['Date'];
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  DatumBegintijd: Scalars['Date'];
  DatumEindtijd: Scalars['Date'];
  DatumGewijzigd?: Maybe<Scalars['Date']>;
  DigitaalExamen?: Maybe<DigitaalExamen>;
  DigitaalExamenId?: Maybe<Scalars['Int']>;
  Docent: Scalars['String'];
  Eindtijd: Scalars['Date'];
  Lokatie?: Maybe<Lokatie>;
  LokatieID: Scalars['Int'];
  LokatieToevoeging: Scalars['String'];
  Monitors?: Maybe<Array<Maybe<Monitor>>>;
  Opmerkingen: Scalars['String'];
  PersoonIDAangemaakt?: Maybe<Scalars['Int']>;
  PersoonIDGewijzigd?: Maybe<Scalars['Int']>;
  SessieID: Scalars['Int'];
  SessieType: Scalars['String'];
  Visitatie?: Maybe<Visitatie>;
};

export enum SortDirectionEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SpecialtiesInput = {
  vakgroepId?: InputMaybe<Scalars['Int']>;
};

export type StatisticsPerOrganizer = {
  __typename?: 'StatisticsPerOrganizer';
  OrganizerId: Scalars['Int'];
  OrganizerName: Scalars['String'];
  OrganizerType: Scalars['String'];
  SpecialtyStatistics?: Maybe<Array<Maybe<StatisticsPerSpecialty>>>;
  VisitingData?: Maybe<VisitingData>;
};

export type StatisticsPerSpecialty = {
  __typename?: 'StatisticsPerSpecialty';
  Title: Scalars['String'];
  VakID: Scalars['Int'];
  VakType: Scalars['String'];
  VisitingData?: Maybe<VisitingData>;
};

export type Studieresultaat = {
  __typename?: 'Studieresultaat';
  Certificering?: Maybe<Certificering>;
  Cursus: Cursus;
  Datum: Scalars['Date'];
  NormVersie: NormVersie;
  Persoon: Persoon;
  Status: StudieresultaatStatusEnum;
  StudieresultaatID: Scalars['Int'];
  Vak: Vak;
};

export enum StudieresultaatStatusEnum {
  Betaald = 'Betaald',
  Definitief = 'Definitief',
  Voorlopig = 'Voorlopig'
}

export type StudyProgress = {
  __typename?: 'StudyProgress';
  Certificering: Certificering;
  Completed: Scalars['Boolean'];
  CountedPoints: Scalars['Int'];
  DonePoints: Scalars['Int'];
  ParticipationPoints?: Maybe<Array<Maybe<ParticipationPoint>>>;
  PointsToDo: Scalars['Int'];
  RequiredPoints: Scalars['Int'];
  RequiredPointsTodo: Scalars['Int'];
  Studieresultaten?: Maybe<Array<Maybe<Studieresultaat>>>;
};

export type SubmitParticipantsInput = {
  CursusID?: InputMaybe<Scalars['Int']>;
};

export type SubmitParticipantsResult = {
  __typename?: 'SubmitParticipantsResult';
  success: Scalars['Boolean'];
};

export type TargetSettings = {
  organizerMargin: Scalars['Float'];
  organizerTarget: Scalars['Float'];
  overallMargin: Scalars['Float'];
  overallTarget: Scalars['Float'];
  specialtyMargin: Scalars['Float'];
  specialtyTarget: Scalars['Float'];
};

export type Thema = {
  __typename?: 'Thema';
  Code: Scalars['String'];
  Naam: Scalars['String'];
  ThemaID: Scalars['Int'];
  UniversiteitID?: Maybe<Scalars['Int']>;
};

export type TotaalExtBtwTarief = {
  __typename?: 'TotaalExtBtwTarief';
  TotaalExtBtw?: Maybe<Scalars['Float']>;
};

export type UnassignMonitorInput = {
  MonitorID?: InputMaybe<Scalars['Int']>;
  SessieID?: InputMaybe<Scalars['Int']>;
};

export type UnRegisterResult = {
  __typename?: 'UnRegisterResult';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type UpdateInvoiceStatusInput = {
  actionDate: Scalars['Date'];
  invoiceId: Scalars['Int'];
  isInvoiceCollection: Scalars['Boolean'];
  remarks?: InputMaybe<Scalars['SafeString']>;
  status: FactuurHistorieStatusEnum;
};

export type UpdateInvoiceStatusResult = {
  __typename?: 'UpdateInvoiceStatusResult';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdatePlanningResult = {
  __typename?: 'UpdatePlanningResult';
  planned: Scalars['Boolean'];
};

export type UpdateVisitationReportInput = {
  DatumRapport?: InputMaybe<Scalars['Date']>;
  Rapport: Scalars['SafeString'];
  Rapportcijfer: Scalars['Int'];
  ratings?: InputMaybe<Array<VisitatieBeoordelingCategorieInput>>;
  Status: VisitatieStatusEnum;
  VisitatieID: Scalars['Int'];
  VolgensIntentieAanbod: Scalars['Boolean'];
  VragenJson: Scalars['SafeString'];
};

export type UploadParticipantsExcelInput = {
  CursusID?: InputMaybe<Scalars['Int']>;
  file: Scalars['Upload'];
};

export type UploadParticipantsExcelResult = {
  __typename?: 'UploadParticipantsExcelResult';
  success: Scalars['Boolean'];
  validationErrors?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Vaardigheid = {
  __typename?: 'Vaardigheid';
  Code: Scalars['String'];
  Omschrijving: Scalars['String'];
  VaardigheidID: Scalars['Int'];
};

export type Vak = {
  __typename?: 'Vak';
  Afkorting?: Maybe<Scalars['String']>;
  BeoordelaarNaam?: Maybe<Scalars['String']>;
  Beoordelingen?: Maybe<Array<Maybe<Beoordeling>>>;
  Code?: Maybe<Scalars['String']>;
  CompetentieID?: Maybe<Scalars['Int']>;
  CompetentieNaam?: Maybe<Scalars['String']>;
  Competenties?: Maybe<Array<Maybe<Competentie>>>;
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  DigitaalAanbod?: Maybe<Scalars['Boolean']>;
  Docenten?: Maybe<Scalars['String']>;
  Doelgroep?: Maybe<Scalars['String']>;
  Doelstelling?: Maybe<Scalars['String']>;
  EvaluatieWijze?: Maybe<Scalars['String']>;
  ExamenInstelling?: Maybe<ExamenInstelling>;
  ExamenInstellingID?: Maybe<Scalars['Int']>;
  ExamenType?: Maybe<Scalars['String']>;
  GewijzigdDatum?: Maybe<Scalars['Date']>;
  Inhoud?: Maybe<Scalars['String']>;
  IsExamenVak?: Maybe<Scalars['Boolean']>;
  Kosten?: Maybe<Scalars['Float']>;
  MaximumCursisten?: Maybe<Scalars['Int']>;
  MaximumDatum?: Maybe<Scalars['Date']>;
  MinimumDatum?: Maybe<Scalars['Date']>;
  NormVersieID: Scalars['Int'];
  Praktijk?: Maybe<Scalars['String']>;
  Promotietekst?: Maybe<Scalars['String']>;
  Samenhang?: Maybe<Scalars['String']>;
  Samenvatting?: Maybe<Scalars['String']>;
  Status: VakStatusEnum;
  ThemaID?: Maybe<Scalars['Int']>;
  ThemaNaam?: Maybe<Scalars['String']>;
  Themas?: Maybe<Array<Maybe<Thema>>>;
  Tijdsduur?: Maybe<Scalars['String']>;
  Titel?: Maybe<Scalars['String']>;
  VakDiscussie?: Maybe<Array<Maybe<VakDiscussie>>>;
  Vakgroep?: Maybe<Vakgroep>;
  VakgroepID?: Maybe<Scalars['Int']>;
  VakID: Scalars['Int'];
  VakKennisgebieden?: Maybe<Array<Maybe<Kennisgebied>>>;
  VakVaardigheden?: Maybe<Array<Maybe<Vaardigheid>>>;
  Vernieuwend?: Maybe<Scalars['String']>;
  Website?: Maybe<Scalars['String']>;
  Werkvorm?: Maybe<Scalars['String']>;
};

export type VakDiscussie = {
  __typename?: 'VakDiscussie';
  comments?: Maybe<Array<Maybe<Comment>>>;
  title?: Maybe<Scalars['String']>;
};

export enum VakExamenTypeEnum {
  Ad = 'AD',
  Agn = 'AGN',
  Ak = 'AK',
  Be = 'BE',
  Bk = 'BK',
  Bv = 'BV',
  Dk = 'DK',
  Ec = 'EC',
  Ek = 'EK',
  Et = 'ET',
  HercertificeringsExamen = 'HERCERTIFICERINGS_EXAMEN',
  StartExamen = 'START_EXAMEN',
  Tb = 'TB'
}

export type Vakgroep = {
  __typename?: 'Vakgroep';
  ApiKey?: Maybe<Scalars['String']>;
  Code: Scalars['String'];
  Contactgegevens: Contactgegevens;
  ContactgegevensID: Scalars['Int'];
  IsActief: Scalars['Boolean'];
  IsBtwPlichtig: Scalars['Boolean'];
  Naam: Scalars['String'];
  UniversiteitID: Scalars['Int'];
  VakgroepID: Scalars['Int'];
  WebserviceEnabled: Scalars['Boolean'];
};

export type VakgroepLink = {
  __typename?: 'VakgroepLink';
  Actief: Scalars['Boolean'];
  HoogleraarID: Scalars['Int'];
  PersoonID: Scalars['Int'];
  Vakgroep?: Maybe<Vakgroep>;
  VakgroepID: Scalars['Int'];
};

export type Vaknorm = {
  __typename?: 'Vaknorm';
  CompetentieID: Scalars['Int'];
  MinimumPunten: Scalars['Int'];
  NormVersieID: Scalars['Int'];
  ThemaID: Scalars['Int'];
  VaknormID: Scalars['Int'];
};

export enum VakStatusEnum {
  Afgekeurd = 'Afgekeurd',
  Goedgekeurd = 'Goedgekeurd',
  Ingediend = 'Ingediend',
  Ingetrokken = 'Ingetrokken',
  InOntwerp = 'InOntwerp',
  Voorlopig = 'Voorlopig',
  WordtBeoordeeld = 'WordtBeoordeeld'
}

export type Visitatie = {
  __typename?: 'Visitatie';
  AangemaaktDoor?: Maybe<Scalars['String']>;
  Cursus?: Maybe<Cursus>;
  DatumAangemaakt?: Maybe<Scalars['Date']>;
  DatumGewijzigd?: Maybe<Scalars['Date']>;
  DatumRapport?: Maybe<Scalars['Date']>;
  DatumVisitatie?: Maybe<Scalars['Date']>;
  DiscussieVisitaties?: Maybe<Array<Maybe<DiscussieVisitatie>>>;
  GewijzigdDoor?: Maybe<Scalars['String']>;
  Inspecteur?: Maybe<Persoon>;
  IsDeclarationPossible?: Maybe<Scalars['Boolean']>;
  IsDeclarationSubmitted?: Maybe<Scalars['Boolean']>;
  LastChangeBy?: Maybe<Scalars['String']>;
  LastChangeDate?: Maybe<Scalars['Date']>;
  PersoonID: Scalars['Int'];
  Rapport?: Maybe<Scalars['String']>;
  Rapportcijfer?: Maybe<Scalars['Int']>;
  Sessie?: Maybe<Sessie>;
  SessieID: Scalars['Int'];
  Status: VisitatieStatusEnum;
  VisitatieBeoordelingCategorieen?: Maybe<Array<Maybe<VisitatieBeoordelingCategorie>>>;
  VisitatieID: Scalars['Int'];
  VolgensIntentieAanbod: Scalars['Boolean'];
  VragenJson?: Maybe<Scalars['SafeString']>;
};

export type VisitatieBeoordelingCategorie = {
  __typename?: 'VisitatieBeoordelingCategorie';
  AangemaaktDoor?: Maybe<Scalars['String']>;
  CategorieNaam: Scalars['String'];
  CategorieTemplateID: Scalars['Int'];
  Cijfer?: Maybe<Scalars['Float']>;
  DatumAangemaakt: Scalars['Date'];
  DatumGewijzigd: Scalars['Date'];
  GewijzigdDoor?: Maybe<Scalars['String']>;
  TotaalPunten?: Maybe<Scalars['Float']>;
  VanafDatum: Scalars['Date'];
  Versie: Scalars['String'];
  VisitatieBeoordelingCategorieID: Scalars['ID'];
  VisitatieID: Scalars['Int'];
  Vragen?: Maybe<Array<Maybe<VisitatieBeoordelingCategorieVraag>>>;
  Weging: Scalars['Float'];
};

export type VisitatieBeoordelingCategorieInput = {
  CategorieNaam: Scalars['String'];
  CategorieTemplateID: Scalars['Int'];
  Cijfer?: InputMaybe<Scalars['Float']>;
  TotaalPunten?: InputMaybe<Scalars['Float']>;
  VanafDatum: Scalars['Date'];
  Versie: Scalars['String'];
  VisitatieBeoordelingCategorieID: Scalars['ID'];
  VisitatieID: Scalars['Int'];
  Vragen?: InputMaybe<Array<InputMaybe<VisitatieBeoordelingCategorieVraagInput>>>;
  Weging: Scalars['Float'];
};

export type VisitatieBeoordelingCategorieVraag = {
  __typename?: 'VisitatieBeoordelingCategorieVraag';
  AangemaaktDoor?: Maybe<Scalars['String']>;
  CategorieTemplateID: Scalars['Int'];
  Cijfer?: Maybe<Scalars['Float']>;
  DatumAangemaakt: Scalars['Date'];
  DatumGewijzigd: Scalars['Date'];
  GewijzigdDoor?: Maybe<Scalars['String']>;
  Naam: Scalars['String'];
  Toelichting?: Maybe<Scalars['String']>;
  TotaalPunten?: Maybe<Scalars['Float']>;
  VanafDatum: Scalars['Date'];
  Versie: Scalars['String'];
  VisitatieBeoordelingCategorieID: Scalars['ID'];
  VisitatieBeoordelingCategorieVraagID: Scalars['ID'];
  VraagTemplateID: Scalars['Int'];
  Weging: Scalars['Float'];
};

export type VisitatieBeoordelingCategorieVraagInput = {
  CategorieTemplateID: Scalars['Int'];
  Cijfer?: InputMaybe<Scalars['Float']>;
  Naam: Scalars['String'];
  Toelichting?: InputMaybe<Scalars['String']>;
  TotaalPunten?: InputMaybe<Scalars['Float']>;
  VanafDatum: Scalars['Date'];
  Versie: Scalars['String'];
  VisitatieBeoordelingCategorieID: Scalars['ID'];
  VisitatieBeoordelingCategorieVraagID: Scalars['ID'];
  VraagTemplateID: Scalars['Int'];
  Weging: Scalars['Float'];
};

export enum VisitatieStatusEnum {
  Ingediend = 'Ingediend',
  Ingepland = 'Ingepland',
  RapportWordtOpgesteld = 'RapportWordtOpgesteld'
}

export type VisitationDeclaration = {
  __typename?: 'VisitationDeclaration';
  FactuurNummer?: Maybe<Scalars['String']>;
  HasInvoice: Scalars['Boolean'];
  InvoiceLink?: Maybe<Scalars['String']>;
  TariffDayPart: Scalars['Float'];
  TariffKm: Scalars['Float'];
  Visitatie?: Maybe<Visitatie>;
};

export type VisitationInfoNodes = {
  __typename?: 'VisitationInfoNodes';
  nodes?: Maybe<Array<Maybe<Visitatie>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
};

export type VisitationInput = {
  visitatieId: Scalars['Int'];
};

export type VisitationsInput = {
  courseCode?: InputMaybe<Scalars['SafeString']>;
  from?: InputMaybe<Scalars['Date']>;
  orderBy: OrderByArgs;
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
  status?: InputMaybe<VisitatieStatusEnum>;
  title?: InputMaybe<Scalars['SafeString']>;
  to?: InputMaybe<Scalars['Date']>;
};

export type VisitingData = {
  __typename?: 'VisitingData';
  AverageRate?: Maybe<Scalars['Float']>;
  AverageScoreAccordingIntention?: Maybe<Scalars['Float']>;
  LastVisitData?: Maybe<LastVisitData>;
  NrOfCourses: Scalars['Int'];
  NrOfVisits: Scalars['Int'];
  VisitTarget: Scalars['Float'];
  VisitTargetActual: Scalars['Float'];
};

export type Vooropleiding = {
  __typename?: 'Vooropleiding';
  Categorie: VooropleidingCategorie;
  Certificaten?: Maybe<Array<Maybe<Certificaat>>>;
  Code: Scalars['String'];
  IsActief: Scalars['Boolean'];
  Naam: Scalars['String'];
  Omschrijving: Scalars['String'];
  UniversiteitID: Scalars['Int'];
  VooropleidingCategorieID: Scalars['Int'];
  VooropleidingID: Scalars['Int'];
};

export type VooropleidingCategorie = {
  __typename?: 'VooropleidingCategorie';
  Naam: Scalars['String'];
  VooropleidingCategorieID: Scalars['Int'];
};

export enum VrijstellingCertificaatStatusEnum {
  Betaald = 'Betaald',
  VoorlopigBetaald = 'VoorlopigBetaald'
}

export enum VrijstellingsVerzoekBetaalStatusEnum {
  Betaald = 'Betaald'
}

export enum VrijstellingsVerzoekStatusEnum {
  Aangevraagd = 'Aangevraagd',
  Afgekeurd = 'Afgekeurd',
  Betaald = 'Betaald',
  Geannuleerd = 'Geannuleerd',
  Goedgekeurd = 'Goedgekeurd'
}

export type GetMyQueryVariables = Exact<{
  input: Scalars['Boolean'];
}>;


export type GetMyQuery = { __typename?: 'Query', my?: { __typename?: 'My', Roles?: Array<string>, Persoon: { __typename?: 'Persoon', PersoonID: number, BSN?: number, Voorletters: string, Tussenvoegsel: string, Achternaam: string, Geboortedatum?: any, IsGbaGeregistreerd?: boolean, Contactgegevens: { __typename?: 'Contactgegevens', Adresregel1: string, Adresregel2?: string, Huisnummer: string, HuisnummerToevoeging?: string, Postcode: string, Woonplaats: string, Land: string, Email?: string, Telefoon?: string } }, Certificeringen?: Array<{ __typename?: 'Certificering', CertificeringID: number, Nummer: string, NummerWeergave: string, BeginDatum: any, EindDatum: any, Opmerkingen: string, Status: CertificeringStatusEnum, DatumVoldaan?: any, Certificaat?: { __typename?: 'Certificaat', CertificaatID: number, Code: string, Naam: string } }> } };

export type CertificeringFieldsFragment = { __typename?: 'Certificering', CertificeringID: number, Nummer: string, NummerWeergave: string, BeginDatum: any, EindDatum: any, Opmerkingen: string, Status: CertificeringStatusEnum, DatumVoldaan?: any, Certificaat?: { __typename?: 'Certificaat', CertificaatID: number, Code: string, Naam: string } };

export type GetMySignedUpParticipationsListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMySignedUpParticipationsListQuery = { __typename?: 'Query', my?: { __typename?: 'My', Roles?: Array<string>, AangemeldeCursusDeelnames?: Array<{ __typename?: 'AangemeldeCursusDeelname', CursusDeelnameID: number, CursusID: number, Titel: string, Prijs: number, Status: CursusDeelnameStatusEnum, Datum: any, Begintijd: string, Eindtijd: string, Locatie: string }> } };

export type AangemeldeCursusDeelnameFieldsFragment = { __typename?: 'AangemeldeCursusDeelname', CursusDeelnameID: number, CursusID: number, Titel: string, Prijs: number, Status: CursusDeelnameStatusEnum, Datum: any, Begintijd: string, Eindtijd: string, Locatie: string };

export type GetMySignedUpParticipationsDetailsQueryVariables = Exact<{
  input: Scalars['Boolean'];
}>;


export type GetMySignedUpParticipationsDetailsQuery = { __typename?: 'Query', my?: { __typename?: 'My', Roles?: Array<string>, AangemeldeCursusDeelnames?: Array<{ __typename?: 'AangemeldeCursusDeelname', CursusDeelnameID: number, CursusID: number, Titel: string, Prijs: number, Status: CursusDeelnameStatusEnum, Datum: any, Begintijd: string, Eindtijd: string, Locatie: string }> } };

export type GetListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListsQuery = { __typename?: 'Query', Themas: Array<{ __typename?: 'Thema', ThemaID: number, Naam: string }>, Competenties: Array<{ __typename?: 'Competentie', CompetentieID: number, Naam: string }>, Kennisgebieden: Array<{ __typename?: 'Kennisgebied', KennisgebiedID: number, Naam: string }>, Landen: Array<{ __typename?: 'Landen', Value: string, Text: string }> };

export type GetCursusSessiesQueryVariables = Exact<{
  input: SearchCourseSessionsInput;
}>;


export type GetCursusSessiesQuery = { __typename?: 'Query', CursusSessies?: Array<{ __typename?: 'CursusSessie', CanUnRegister: boolean, CourseId: number, SpecialtyId: number, CourseCode: string, Title: string, Date: any, StartTime: string, EndTime: string, Price: number, LocationName: string, Distance?: number, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: string, OrganizerPhone?: string, OrganizerWebsite?: string, PromoText?: string, Registered: boolean, RegisteredDate?: any, SpecialtyWebsite?: string, LocationAddress?: { __typename?: 'LocationAddress', Street: string, HouseNr: string, HouseNrExtension?: string, Zipcode?: string, City?: string, Email?: string, Website?: string } }> };

export type GetCursusSessiesDetailsQueryVariables = Exact<{
  input: SearchCourseSessionsInput;
  inputCheck: IsLicenseValidForSpecialtyInput;
}>;


export type GetCursusSessiesDetailsQuery = { __typename?: 'Query', CursusSessies?: Array<{ __typename?: 'CursusSessie', CanUnRegister: boolean, CourseId: number, SpecialtyId: number, CourseCode: string, Title: string, Date: any, StartTime: string, EndTime: string, Price: number, LocationName: string, Distance?: number, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: string, OrganizerPhone?: string, OrganizerWebsite?: string, PromoText?: string, Registered: boolean, RegisteredDate?: any, SpecialtyWebsite?: string, LocationAddress?: { __typename?: 'LocationAddress', Street: string, HouseNr: string, HouseNrExtension?: string, Zipcode?: string, City?: string, Email?: string, Website?: string } }>, isLicenseValidForSpecialty: { __typename?: 'isLicenseValidForSpecialtyResult', success: boolean } };

export type GetSearchSpecialtiesQueryVariables = Exact<{
  input: SearchSpecialtyInput;
}>;


export type GetSearchSpecialtiesQuery = { __typename?: 'Query', SearchSpecialties?: Array<{ __typename?: 'SearchSpecialtyResult', SpecialtyId: number, Code: string, Title: string, Price: number, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: string, OrganizerPhone?: string, OrganizerWebsite?: string, PromoText?: string, SpecialtyWebsite?: string }> };

export type GetSpecialtyDetailsQueryVariables = Exact<{
  input: SearchSpecialtyInput;
  inputCheck: IsLicenseValidForSpecialtyInput;
}>;


export type GetSpecialtyDetailsQuery = { __typename?: 'Query', SearchSpecialties?: Array<{ __typename?: 'SearchSpecialtyResult', SpecialtyId: number, Code: string, Title: string, Price: number, Competence: string, Theme: string, Organizer: string, OrganizerEmail?: string, OrganizerPhone?: string, OrganizerWebsite?: string, PromoText?: string, SpecialtyWebsite?: string }>, isLicenseValidForSpecialty: { __typename?: 'isLicenseValidForSpecialtyResult', success: boolean } };

export type GetCursusDeelnamesQueryVariables = Exact<{
  licenseId?: InputMaybe<Scalars['Int']>;
}>;


export type GetCursusDeelnamesQuery = { __typename?: 'Query', CursusDeelnames?: Array<{ __typename?: 'CursusDeelname', CursusDeelnameID: number, Status: CursusDeelnameStatusEnum, Certificering?: { __typename?: 'Certificering', CertificeringID: number, NummerWeergave: string }, Cursus: { __typename?: 'Cursus', CursusID: number, Titel?: string, Prijs?: number, Promotietekst?: string, Sessies?: Array<{ __typename?: 'Sessie', Datum: any, Begintijd: any, Eindtijd: any }>, Vak: { __typename?: 'Vak', Titel?: string, Kosten?: number, Themas?: Array<{ __typename?: 'Thema', Naam: string }>, Competenties?: Array<{ __typename?: 'Competentie', Naam: string }> } } }> };

export type CursusDeelnameFieldsFragment = { __typename?: 'CursusDeelname', CursusDeelnameID: number, Status: CursusDeelnameStatusEnum, Certificering?: { __typename?: 'Certificering', CertificeringID: number, NummerWeergave: string }, Cursus: { __typename?: 'Cursus', CursusID: number, Titel?: string, Prijs?: number, Promotietekst?: string, Sessies?: Array<{ __typename?: 'Sessie', Datum: any, Begintijd: any, Eindtijd: any }>, Vak: { __typename?: 'Vak', Titel?: string, Kosten?: number, Themas?: Array<{ __typename?: 'Thema', Naam: string }>, Competenties?: Array<{ __typename?: 'Competentie', Naam: string }> } } };

export type GetCursusDeelnameDetailsQueryVariables = Exact<{
  participationId: Scalars['Int'];
}>;


export type GetCursusDeelnameDetailsQuery = { __typename?: 'Query', CursusDeelnameDetails?: { __typename?: 'CursusDeelname', CursusDeelnameID: number, Status: CursusDeelnameStatusEnum, Certificering?: { __typename?: 'Certificering', CertificeringID: number, NummerWeergave: string }, Cursus: { __typename?: 'Cursus', CursusID: number, Titel?: string, Promotietekst?: string, Prijs?: number, CursusCode?: string, Sessies?: Array<{ __typename?: 'Sessie', Datum: any, Begintijd: any, Eindtijd: any, Lokatie?: { __typename?: 'Lokatie', Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', Adresregel1: string, Huisnummer: string, HuisnummerToevoeging?: string, Postcode: string, Woonplaats: string, Telefoon?: string, Email?: string, Website?: string } } }>, Vak: { __typename?: 'Vak', VakID: number, Titel?: string, Kosten?: number, Promotietekst?: string, DigitaalAanbod?: boolean, Website?: string, ThemaNaam?: string, CompetentieNaam?: string, VakgroepID?: number, ExamenInstellingID?: number, Vakgroep?: { __typename?: 'Vakgroep', Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', Adresregel1: string, Huisnummer: string, HuisnummerToevoeging?: string, Postcode: string, Woonplaats: string, Telefoon?: string, Email?: string, Website?: string } }, ExamenInstelling?: { __typename?: 'ExamenInstelling', Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', Adresregel1: string, Huisnummer: string, HuisnummerToevoeging?: string, Postcode: string, Woonplaats: string, Telefoon?: string, Email?: string, Website?: string } } } } } };

export type VakgroepFieldsFragment = { __typename?: 'Vakgroep', Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', Adresregel1: string, Huisnummer: string, HuisnummerToevoeging?: string, Postcode: string, Woonplaats: string, Telefoon?: string, Email?: string, Website?: string } };

export type ExamenInstellingFieldsFragment = { __typename?: 'ExamenInstelling', Naam: string, Contactgegevens: { __typename?: 'Contactgegevens', Adresregel1: string, Huisnummer: string, HuisnummerToevoeging?: string, Postcode: string, Woonplaats: string, Telefoon?: string, Email?: string, Website?: string } };

export type OrganizerContactDataFieldsFragment = { __typename?: 'Contactgegevens', Adresregel1: string, Huisnummer: string, HuisnummerToevoeging?: string, Postcode: string, Woonplaats: string, Telefoon?: string, Email?: string, Website?: string };

export type LocationContactDataFieldsFragment = { __typename?: 'Contactgegevens', Adresregel1: string, Huisnummer: string, HuisnummerToevoeging?: string, Postcode: string, Woonplaats: string, Telefoon?: string, Email?: string, Website?: string };

export type RegisterForCourseMutationVariables = Exact<{
  input: RegisterForCourseInput;
}>;


export type RegisterForCourseMutation = { __typename?: 'Mutation', registerForCourse: { __typename?: 'RegisterResult', success: boolean, message: string } };

export type UnRegisterForCourseMutationVariables = Exact<{
  CursusDeelnameID: Scalars['Int'];
}>;


export type UnRegisterForCourseMutation = { __typename?: 'Mutation', unRegisterForCourse: { __typename?: 'UnRegisterResult', success: boolean, message: string } };

export const CertificeringFieldsFragmentDoc = gql`
    fragment CertificeringFields on Certificering {
  CertificeringID
  Nummer
  NummerWeergave
  BeginDatum
  EindDatum
  Opmerkingen
  Status
  DatumVoldaan
  Certificaat {
    CertificaatID
    Code
    Naam
  }
}
    `;
export const AangemeldeCursusDeelnameFieldsFragmentDoc = gql`
    fragment AangemeldeCursusDeelnameFields on AangemeldeCursusDeelname {
  CursusDeelnameID
  CursusID
  Titel
  Prijs
  Status
  Datum
  Begintijd
  Eindtijd
  Locatie
}
    `;
export const CursusDeelnameFieldsFragmentDoc = gql`
    fragment CursusDeelnameFields on CursusDeelname {
  CursusDeelnameID
  Status
  Certificering {
    CertificeringID
    NummerWeergave
  }
  Cursus {
    CursusID
    Titel
    Sessies {
      Datum
      Begintijd
      Eindtijd
    }
    Prijs
    Promotietekst
    Vak {
      Titel
      Kosten
      Themas {
        Naam
      }
      Competenties {
        Naam
      }
    }
  }
}
    `;
export const OrganizerContactDataFieldsFragmentDoc = gql`
    fragment OrganizerContactDataFields on Contactgegevens {
  Adresregel1
  Huisnummer
  HuisnummerToevoeging
  Postcode
  Woonplaats
  Telefoon
  Email
  Website
}
    `;
export const VakgroepFieldsFragmentDoc = gql`
    fragment VakgroepFields on Vakgroep {
  Naam
  Contactgegevens {
    ...OrganizerContactDataFields
  }
}
    ${OrganizerContactDataFieldsFragmentDoc}`;
export const ExamenInstellingFieldsFragmentDoc = gql`
    fragment ExamenInstellingFields on ExamenInstelling {
  Naam
  Contactgegevens {
    ...OrganizerContactDataFields
  }
}
    ${OrganizerContactDataFieldsFragmentDoc}`;
export const LocationContactDataFieldsFragmentDoc = gql`
    fragment LocationContactDataFields on Contactgegevens {
  Adresregel1
  Huisnummer
  HuisnummerToevoeging
  Postcode
  Woonplaats
  Telefoon
  Email
  Website
}
    `;
export const GetMyDocument = gql`
    query getMy($input: Boolean!) {
  my {
    Roles
    Persoon {
      PersoonID
      BSN
      Voorletters
      Tussenvoegsel
      Achternaam
      Geboortedatum
      IsGbaGeregistreerd
      Contactgegevens {
        Adresregel1
        Adresregel2
        Huisnummer
        HuisnummerToevoeging
        Postcode
        Woonplaats
        Land
        Email
        Telefoon
      }
    }
    Certificeringen(alleenGeldig: $input) {
      ...CertificeringFields
    }
  }
}
    ${CertificeringFieldsFragmentDoc}`;

/**
 * __useGetMyQuery__
 *
 * To run a query within a React component, call `useGetMyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMyQuery(baseOptions: Apollo.QueryHookOptions<GetMyQuery, GetMyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyQuery, GetMyQueryVariables>(GetMyDocument, options);
      }
export function useGetMyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyQuery, GetMyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyQuery, GetMyQueryVariables>(GetMyDocument, options);
        }
export type GetMyQueryHookResult = ReturnType<typeof useGetMyQuery>;
export type GetMyLazyQueryHookResult = ReturnType<typeof useGetMyLazyQuery>;
export type GetMyQueryResult = Apollo.QueryResult<GetMyQuery, GetMyQueryVariables>;
export const GetMySignedUpParticipationsListDocument = gql`
    query getMySignedUpParticipationsList {
  my {
    Roles
    AangemeldeCursusDeelnames {
      ...AangemeldeCursusDeelnameFields
    }
  }
}
    ${AangemeldeCursusDeelnameFieldsFragmentDoc}`;

/**
 * __useGetMySignedUpParticipationsListQuery__
 *
 * To run a query within a React component, call `useGetMySignedUpParticipationsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMySignedUpParticipationsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMySignedUpParticipationsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMySignedUpParticipationsListQuery(baseOptions?: Apollo.QueryHookOptions<GetMySignedUpParticipationsListQuery, GetMySignedUpParticipationsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMySignedUpParticipationsListQuery, GetMySignedUpParticipationsListQueryVariables>(GetMySignedUpParticipationsListDocument, options);
      }
export function useGetMySignedUpParticipationsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMySignedUpParticipationsListQuery, GetMySignedUpParticipationsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMySignedUpParticipationsListQuery, GetMySignedUpParticipationsListQueryVariables>(GetMySignedUpParticipationsListDocument, options);
        }
export type GetMySignedUpParticipationsListQueryHookResult = ReturnType<typeof useGetMySignedUpParticipationsListQuery>;
export type GetMySignedUpParticipationsListLazyQueryHookResult = ReturnType<typeof useGetMySignedUpParticipationsListLazyQuery>;
export type GetMySignedUpParticipationsListQueryResult = Apollo.QueryResult<GetMySignedUpParticipationsListQuery, GetMySignedUpParticipationsListQueryVariables>;
export const GetMySignedUpParticipationsDetailsDocument = gql`
    query getMySignedUpParticipationsDetails($input: Boolean!) {
  my {
    Roles
    AangemeldeCursusDeelnames {
      CursusDeelnameID
      CursusID
      Titel
      Prijs
      Status
      Datum
      Begintijd
      Eindtijd
      Locatie
    }
  }
}
    `;

/**
 * __useGetMySignedUpParticipationsDetailsQuery__
 *
 * To run a query within a React component, call `useGetMySignedUpParticipationsDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMySignedUpParticipationsDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMySignedUpParticipationsDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMySignedUpParticipationsDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetMySignedUpParticipationsDetailsQuery, GetMySignedUpParticipationsDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMySignedUpParticipationsDetailsQuery, GetMySignedUpParticipationsDetailsQueryVariables>(GetMySignedUpParticipationsDetailsDocument, options);
      }
export function useGetMySignedUpParticipationsDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMySignedUpParticipationsDetailsQuery, GetMySignedUpParticipationsDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMySignedUpParticipationsDetailsQuery, GetMySignedUpParticipationsDetailsQueryVariables>(GetMySignedUpParticipationsDetailsDocument, options);
        }
export type GetMySignedUpParticipationsDetailsQueryHookResult = ReturnType<typeof useGetMySignedUpParticipationsDetailsQuery>;
export type GetMySignedUpParticipationsDetailsLazyQueryHookResult = ReturnType<typeof useGetMySignedUpParticipationsDetailsLazyQuery>;
export type GetMySignedUpParticipationsDetailsQueryResult = Apollo.QueryResult<GetMySignedUpParticipationsDetailsQuery, GetMySignedUpParticipationsDetailsQueryVariables>;
export const GetListsDocument = gql`
    query getLists {
  Themas {
    ThemaID
    Naam
  }
  Competenties {
    CompetentieID
    Naam
  }
  Kennisgebieden {
    KennisgebiedID
    Naam
  }
  Landen {
    Value
    Text
  }
}
    `;

/**
 * __useGetListsQuery__
 *
 * To run a query within a React component, call `useGetListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListsQuery(baseOptions?: Apollo.QueryHookOptions<GetListsQuery, GetListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListsQuery, GetListsQueryVariables>(GetListsDocument, options);
      }
export function useGetListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListsQuery, GetListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListsQuery, GetListsQueryVariables>(GetListsDocument, options);
        }
export type GetListsQueryHookResult = ReturnType<typeof useGetListsQuery>;
export type GetListsLazyQueryHookResult = ReturnType<typeof useGetListsLazyQuery>;
export type GetListsQueryResult = Apollo.QueryResult<GetListsQuery, GetListsQueryVariables>;
export const GetCursusSessiesDocument = gql`
    query getCursusSessies($input: searchCourseSessionsInput!) {
  CursusSessies(input: $input) {
    CanUnRegister
    CourseId
    SpecialtyId
    CourseCode
    Title
    Date
    StartTime
    EndTime
    Price
    LocationName
    LocationAddress {
      Street
      HouseNr
      HouseNrExtension
      Zipcode
      City
      Email
      Website
    }
    Distance
    Competence
    Theme
    Organizer
    OrganizerEmail
    OrganizerPhone
    OrganizerWebsite
    PromoText
    Registered
    RegisteredDate
    SpecialtyWebsite
  }
}
    `;

/**
 * __useGetCursusSessiesQuery__
 *
 * To run a query within a React component, call `useGetCursusSessiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCursusSessiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCursusSessiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCursusSessiesQuery(baseOptions: Apollo.QueryHookOptions<GetCursusSessiesQuery, GetCursusSessiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCursusSessiesQuery, GetCursusSessiesQueryVariables>(GetCursusSessiesDocument, options);
      }
export function useGetCursusSessiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCursusSessiesQuery, GetCursusSessiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCursusSessiesQuery, GetCursusSessiesQueryVariables>(GetCursusSessiesDocument, options);
        }
export type GetCursusSessiesQueryHookResult = ReturnType<typeof useGetCursusSessiesQuery>;
export type GetCursusSessiesLazyQueryHookResult = ReturnType<typeof useGetCursusSessiesLazyQuery>;
export type GetCursusSessiesQueryResult = Apollo.QueryResult<GetCursusSessiesQuery, GetCursusSessiesQueryVariables>;
export const GetCursusSessiesDetailsDocument = gql`
    query getCursusSessiesDetails($input: searchCourseSessionsInput!, $inputCheck: isLicenseValidForSpecialtyInput!) {
  CursusSessies(input: $input) {
    CanUnRegister
    CourseId
    SpecialtyId
    CourseCode
    Title
    Date
    StartTime
    EndTime
    Price
    LocationName
    LocationAddress {
      Street
      HouseNr
      HouseNrExtension
      Zipcode
      City
      Email
      Website
    }
    Distance
    Competence
    Theme
    Organizer
    OrganizerEmail
    OrganizerPhone
    OrganizerWebsite
    PromoText
    Registered
    RegisteredDate
    SpecialtyWebsite
  }
  isLicenseValidForSpecialty(input: $inputCheck) {
    success
  }
}
    `;

/**
 * __useGetCursusSessiesDetailsQuery__
 *
 * To run a query within a React component, call `useGetCursusSessiesDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCursusSessiesDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCursusSessiesDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      inputCheck: // value for 'inputCheck'
 *   },
 * });
 */
export function useGetCursusSessiesDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetCursusSessiesDetailsQuery, GetCursusSessiesDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCursusSessiesDetailsQuery, GetCursusSessiesDetailsQueryVariables>(GetCursusSessiesDetailsDocument, options);
      }
export function useGetCursusSessiesDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCursusSessiesDetailsQuery, GetCursusSessiesDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCursusSessiesDetailsQuery, GetCursusSessiesDetailsQueryVariables>(GetCursusSessiesDetailsDocument, options);
        }
export type GetCursusSessiesDetailsQueryHookResult = ReturnType<typeof useGetCursusSessiesDetailsQuery>;
export type GetCursusSessiesDetailsLazyQueryHookResult = ReturnType<typeof useGetCursusSessiesDetailsLazyQuery>;
export type GetCursusSessiesDetailsQueryResult = Apollo.QueryResult<GetCursusSessiesDetailsQuery, GetCursusSessiesDetailsQueryVariables>;
export const GetSearchSpecialtiesDocument = gql`
    query getSearchSpecialties($input: searchSpecialtyInput!) {
  SearchSpecialties(input: $input) {
    SpecialtyId
    Code
    Title
    Price
    Competence
    Theme
    Organizer
    OrganizerEmail
    OrganizerPhone
    OrganizerWebsite
    PromoText
    SpecialtyWebsite
  }
}
    `;

/**
 * __useGetSearchSpecialtiesQuery__
 *
 * To run a query within a React component, call `useGetSearchSpecialtiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchSpecialtiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchSpecialtiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetSearchSpecialtiesQuery(baseOptions: Apollo.QueryHookOptions<GetSearchSpecialtiesQuery, GetSearchSpecialtiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSearchSpecialtiesQuery, GetSearchSpecialtiesQueryVariables>(GetSearchSpecialtiesDocument, options);
      }
export function useGetSearchSpecialtiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSearchSpecialtiesQuery, GetSearchSpecialtiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSearchSpecialtiesQuery, GetSearchSpecialtiesQueryVariables>(GetSearchSpecialtiesDocument, options);
        }
export type GetSearchSpecialtiesQueryHookResult = ReturnType<typeof useGetSearchSpecialtiesQuery>;
export type GetSearchSpecialtiesLazyQueryHookResult = ReturnType<typeof useGetSearchSpecialtiesLazyQuery>;
export type GetSearchSpecialtiesQueryResult = Apollo.QueryResult<GetSearchSpecialtiesQuery, GetSearchSpecialtiesQueryVariables>;
export const GetSpecialtyDetailsDocument = gql`
    query getSpecialtyDetails($input: searchSpecialtyInput!, $inputCheck: isLicenseValidForSpecialtyInput!) {
  SearchSpecialties(input: $input) {
    SpecialtyId
    Code
    Title
    Price
    Competence
    Theme
    Organizer
    OrganizerEmail
    OrganizerPhone
    OrganizerWebsite
    PromoText
    SpecialtyWebsite
  }
  isLicenseValidForSpecialty(input: $inputCheck) {
    success
  }
}
    `;

/**
 * __useGetSpecialtyDetailsQuery__
 *
 * To run a query within a React component, call `useGetSpecialtyDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpecialtyDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpecialtyDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      inputCheck: // value for 'inputCheck'
 *   },
 * });
 */
export function useGetSpecialtyDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetSpecialtyDetailsQuery, GetSpecialtyDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpecialtyDetailsQuery, GetSpecialtyDetailsQueryVariables>(GetSpecialtyDetailsDocument, options);
      }
export function useGetSpecialtyDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpecialtyDetailsQuery, GetSpecialtyDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpecialtyDetailsQuery, GetSpecialtyDetailsQueryVariables>(GetSpecialtyDetailsDocument, options);
        }
export type GetSpecialtyDetailsQueryHookResult = ReturnType<typeof useGetSpecialtyDetailsQuery>;
export type GetSpecialtyDetailsLazyQueryHookResult = ReturnType<typeof useGetSpecialtyDetailsLazyQuery>;
export type GetSpecialtyDetailsQueryResult = Apollo.QueryResult<GetSpecialtyDetailsQuery, GetSpecialtyDetailsQueryVariables>;
export const GetCursusDeelnamesDocument = gql`
    query getCursusDeelnames($licenseId: Int) {
  CursusDeelnames(certificeringId: $licenseId) {
    ...CursusDeelnameFields
  }
}
    ${CursusDeelnameFieldsFragmentDoc}`;

/**
 * __useGetCursusDeelnamesQuery__
 *
 * To run a query within a React component, call `useGetCursusDeelnamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCursusDeelnamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCursusDeelnamesQuery({
 *   variables: {
 *      licenseId: // value for 'licenseId'
 *   },
 * });
 */
export function useGetCursusDeelnamesQuery(baseOptions?: Apollo.QueryHookOptions<GetCursusDeelnamesQuery, GetCursusDeelnamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCursusDeelnamesQuery, GetCursusDeelnamesQueryVariables>(GetCursusDeelnamesDocument, options);
      }
export function useGetCursusDeelnamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCursusDeelnamesQuery, GetCursusDeelnamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCursusDeelnamesQuery, GetCursusDeelnamesQueryVariables>(GetCursusDeelnamesDocument, options);
        }
export type GetCursusDeelnamesQueryHookResult = ReturnType<typeof useGetCursusDeelnamesQuery>;
export type GetCursusDeelnamesLazyQueryHookResult = ReturnType<typeof useGetCursusDeelnamesLazyQuery>;
export type GetCursusDeelnamesQueryResult = Apollo.QueryResult<GetCursusDeelnamesQuery, GetCursusDeelnamesQueryVariables>;
export const GetCursusDeelnameDetailsDocument = gql`
    query getCursusDeelnameDetails($participationId: Int!) {
  CursusDeelnameDetails(cursusDeelnameId: $participationId) {
    CursusDeelnameID
    Status
    Certificering {
      CertificeringID
      NummerWeergave
    }
    Cursus {
      CursusID
      Titel
      Promotietekst
      Prijs
      CursusCode
      Sessies {
        Datum
        Begintijd
        Eindtijd
        Lokatie {
          Naam
          Contactgegevens {
            ...LocationContactDataFields
          }
        }
      }
      Vak {
        VakID
        Titel
        Kosten
        Promotietekst
        DigitaalAanbod
        Website
        ThemaNaam
        CompetentieNaam
        VakgroepID
        Vakgroep {
          ...VakgroepFields
        }
        ExamenInstellingID
        ExamenInstelling {
          ...ExamenInstellingFields
        }
      }
    }
  }
}
    ${LocationContactDataFieldsFragmentDoc}
${VakgroepFieldsFragmentDoc}
${ExamenInstellingFieldsFragmentDoc}`;

/**
 * __useGetCursusDeelnameDetailsQuery__
 *
 * To run a query within a React component, call `useGetCursusDeelnameDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCursusDeelnameDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCursusDeelnameDetailsQuery({
 *   variables: {
 *      participationId: // value for 'participationId'
 *   },
 * });
 */
export function useGetCursusDeelnameDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetCursusDeelnameDetailsQuery, GetCursusDeelnameDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCursusDeelnameDetailsQuery, GetCursusDeelnameDetailsQueryVariables>(GetCursusDeelnameDetailsDocument, options);
      }
export function useGetCursusDeelnameDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCursusDeelnameDetailsQuery, GetCursusDeelnameDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCursusDeelnameDetailsQuery, GetCursusDeelnameDetailsQueryVariables>(GetCursusDeelnameDetailsDocument, options);
        }
export type GetCursusDeelnameDetailsQueryHookResult = ReturnType<typeof useGetCursusDeelnameDetailsQuery>;
export type GetCursusDeelnameDetailsLazyQueryHookResult = ReturnType<typeof useGetCursusDeelnameDetailsLazyQuery>;
export type GetCursusDeelnameDetailsQueryResult = Apollo.QueryResult<GetCursusDeelnameDetailsQuery, GetCursusDeelnameDetailsQueryVariables>;
export const RegisterForCourseDocument = gql`
    mutation registerForCourse($input: registerForCourseInput!) {
  registerForCourse(input: $input) {
    success
    message
  }
}
    `;
export type RegisterForCourseMutationFn = Apollo.MutationFunction<RegisterForCourseMutation, RegisterForCourseMutationVariables>;

/**
 * __useRegisterForCourseMutation__
 *
 * To run a mutation, you first call `useRegisterForCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterForCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerForCourseMutation, { data, loading, error }] = useRegisterForCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterForCourseMutation(baseOptions?: Apollo.MutationHookOptions<RegisterForCourseMutation, RegisterForCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterForCourseMutation, RegisterForCourseMutationVariables>(RegisterForCourseDocument, options);
      }
export type RegisterForCourseMutationHookResult = ReturnType<typeof useRegisterForCourseMutation>;
export type RegisterForCourseMutationResult = Apollo.MutationResult<RegisterForCourseMutation>;
export type RegisterForCourseMutationOptions = Apollo.BaseMutationOptions<RegisterForCourseMutation, RegisterForCourseMutationVariables>;
export const UnRegisterForCourseDocument = gql`
    mutation unRegisterForCourse($CursusDeelnameID: Int!) {
  unRegisterForCourse(CursusDeelnameID: $CursusDeelnameID) {
    success
    message
  }
}
    `;
export type UnRegisterForCourseMutationFn = Apollo.MutationFunction<UnRegisterForCourseMutation, UnRegisterForCourseMutationVariables>;

/**
 * __useUnRegisterForCourseMutation__
 *
 * To run a mutation, you first call `useUnRegisterForCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnRegisterForCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unRegisterForCourseMutation, { data, loading, error }] = useUnRegisterForCourseMutation({
 *   variables: {
 *      CursusDeelnameID: // value for 'CursusDeelnameID'
 *   },
 * });
 */
export function useUnRegisterForCourseMutation(baseOptions?: Apollo.MutationHookOptions<UnRegisterForCourseMutation, UnRegisterForCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnRegisterForCourseMutation, UnRegisterForCourseMutationVariables>(UnRegisterForCourseDocument, options);
      }
export type UnRegisterForCourseMutationHookResult = ReturnType<typeof useUnRegisterForCourseMutation>;
export type UnRegisterForCourseMutationResult = Apollo.MutationResult<UnRegisterForCourseMutation>;
export type UnRegisterForCourseMutationOptions = Apollo.BaseMutationOptions<UnRegisterForCourseMutation, UnRegisterForCourseMutationVariables>;