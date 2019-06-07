import gql from 'graphql-tag';

export const GET_MY_PERSON_QUERY = gql`
  query getMy($input: Boolean!) {
    my {
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
        CertificeringID
        Nummer
        NummerWeergave
        EindDatum
        Status
        DatumVoldaan
        Certificaat {
          CertificaatID
          Code
          Naam
        }
      }
    }
  }
`;

export interface IMy {
  my: {
    Persoon: IPersoon;
    Certificeringen: ICertificering[];
  };
}

export interface IPersoon {
  __typename: 'Persoon';
  PersoonID: string;
  BSN: string | null;
  Voorletters: string;
  Tussenvoegsel: string;
  Achternaam: string;
  Roepnaam: string;
  Geslacht: string;
  Geboortedatum: any | null;
  Nationaliteit: string;
  Actief: boolean | null;
  IsGbaGeregistreerd: boolean | null;
  GbaNummer: string;
  GbaUpdate: any | null;

  /**
   * Gets the contact data
   */
  Contactgegevens: IContactgegevens;

  /**
   * Fetches all licenses
   */
  Certificeringen: Array<ICertificering | null> | null;
}

export interface IContactgegevens {
  __typename: 'Contactgegevens';
  ContactgegevensID: string;
  Adresregel1: string;
  Adresregel2: string | null;
  Huisnummer: string;
  HuisnummerToevoeging: string | null;
  Postcode: string;
  Woonplaats: string;
  Telefoon: string;
  Land: string;
  Email: string | null;
}

export interface ICertificaat {
  __typename: 'Certificaat';
  CertificaatID: string;
  Code: string;
  Naam: string;
}

export interface ICertificering {
  __typename: 'Certificering';
  CertificeringID: string;
  CertificaatID: number | null;
  NormVersieID: number | null;
  PersoonID: number | null;
  BeginDatum: any | null;
  EindDatum: any | null;
  Opmerkingen: string;
  Nummer: string;
  NummerWeergave: string;
  Status: string;

  /**
   * Datum waarop alle verplichte bijeenkomsten zijn gevolgd
   */
  DatumVoldaan: any | null;
  IsVerlengingVan: number | null;
  DatumAangemaakt: any | null;
  DatumIngetrokkenVan: any | null;
  DatumIngetrokkenTot: any | null;
  UitstelVerleend: boolean | null;
  UitstelTot: any | null;
  Certificaat: ICertificaat | null;
  CertificeringAantekeningen: Array<ICertificeringAantekening | null> | null;
}

interface ICertificeringAantekening {
  __typename: 'CertificeringAantekening';
  CertificeringID: string;

  /**
   * Can only contain KBA of KBA-GB
   */
  AantekeningCode: string;
  VanafDatum: any;
  DatumPasAangemaakt: any | null;
  Opmerkingen: string | null;
  DatumAangemaakt: any | null;
  DatumGewijzigd: any | null;
  PersoonIDAangemaakt: number | null;
  PersoonIDGewijzigd: number | null;
}

export const LISTS_QUERY = gql`
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

export const COURSE_SESSIONS_QUERY = gql`
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
    }
  }
`;

export const SEARCH_SPECIALTIES = gql`
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
    }
  }
`;

export const GET_PARTICIPATIONS = gql`
  query getCursusDeelnames($licenseId: Int) {
    CursusDeelnames(certificeringId: $licenseId) {
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
        }
        Vak {
          Themas {
            Naam
          }
          Competenties {
            Naam
          }
        }
      }
    }
  }
`;
