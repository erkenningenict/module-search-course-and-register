import gql from 'graphql-tag';
import { IKennisgebied, ILand, IThema } from './Model';

export const GET_MY_PERSON_QUERY = gql`
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

export const GET_MY_SIGNED_UP_PARTICIPATIONS_LIST_QUERY = gql`
  query getMySignedUpParticipationsList {
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

export const GET_MY_SIGNED_UP_PARTICIPATION_DETAILS_QUERY = gql`
  query getMySignedUpParticipationsDetails($input: Boolean!) {
    my {
      Roles
      AangemeldeCursusDeelnames {
        CursusDeelnameID
        CursusID
        CursusCode
        Thema
        Competentie
        PromotieTekst
        Opmerkingen
        Titel
        Prijs
        Status
        Datum
        Begintijd
        Eindtijd
        Locatie
        LocationAddress {
          Street
          HouseNr
          HouseNrExtension
          Zipcode
          City
        }
        Organizer
        OrganizerEmail
        OrganizerPhone
      }
    }
  }
`;

export interface IMy {
  my: {
    Roles: string[];
    Persoon?: IPersoon;
    Certificeringen?: ICertificering[];
    AangemeldeCursusDeelnames?: ISignedUpParticipation[];
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

export interface ISignedUpParticipation {
  CursusDeelnameID: number;
  CursusID: number;
  Titel: string;
  Datum: Date;
  Begintijd: Date;
  Eindtijd: Date;
  Prijs: number;
  Locatie: string;
  Status: string;
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

export interface IListsQuery {
  Themas: IThema[];
  Competenties: Array<{
    CompetentieID: string;
    Naam: string;
  }>;
  Kennisgebieden: IKennisgebied[];
  Landen: ILand[];
}

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

export interface ISearchSpecialty {
  SpecialtyId: string;
  Code: string;
  Title: string;
  Price: number;
  Competence: string;
  Theme: string;
  Organizer: string;
  OrganizerEmail: string;
  OrganizerPhone: string;
  OrganizerWebsite: string;
  PromoText: string;
}

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
  }
`;

export interface IGetParticipation {
  CursusDeelnameID: string;
  Status: string;
  Certificering: {
    CertificeringID: string;
    NummerWeergave: string;
  };
  Cursus: {
    CursusID: string;
    Titel: string;
    Sessies: Array<{
      Datum: Date;
      Begintijd: Date;
      Eindtijd: Date;
    }>;
    Prijs: number;
    Promotietekst: string;
    Vak: {
      Titel: string;
      Kosten: number;
      Themas: Array<{
        Naam: string;
      }>;
      Competenties: Array<{
        Naam: string;
      }>;
    };
  };
}

export const GET_PARTICIPATION_DETAILS = gql`
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
              Adresregel1
              Huisnummer
              HuisnummerToevoeging
              Postcode
              Woonplaats
            }
          }
        }
        Vak {
          VakID
          Titel
          Kosten
          Promotietekst
          DigitaalAanbod
          Themas {
            Naam
          }
          Competenties {
            Naam
          }
          VakgroepID
          Vakgroep {
            Naam
            Contactgegevens {
              Adresregel1
              Huisnummer
              HuisnummerToevoeging
              Postcode
              Woonplaats
              Telefoon
              Email
              Website
            }
          }
          ExameninstellingID
          Exameninstelling {
            Naam
            Contactgegevens {
              Adresregel1
              Huisnummer
              HuisnummerToevoeging
              Postcode
              Woonplaats
              Telefoon
              Email
              Website
            }
          }
        }
      }
    }
  }
`;

export interface IParticipationDetails {
  CursusDeelnameID: string;
  Status: string;
  Certificering: {
    CertificeringID: string;
    NummerWeergave: string;
  };
  Cursus: {
    CursusID: number;
    Titel: string;
    Promotietekst: string;
    Prijs: number;
    CursusCode: string;
    Sessies: {
      Datum: Date;
      Begintijd: Date;
      Eindtijd: Date;
      Lokatie: {
        Naam: string;
        Contactgegevens: {
          Adresregel1: string;
          Huisnummer: string;
          HuisnummerToevoeging: string;
          Postcode: string;
          Woonplaats: string;
        };
      };
    };
    Vak: {
      VakID: string;
      Titel: string;
      Kosten: number;
      Promotietekst: string;
      DigitaalAanbod: boolean;
      Themas: Array<{
        Naam: string;
      }>;
      Competenties: Array<{
        Naam: string;
      }>;
      VakgroepID: number;
      Vakgroep: {
        Naam: string;
        Contactgegevens: {
          Adresregel1: string;
          Huisnummer: string;
          HuisnummerToevoeging: string;
          Postcode: string;
          Woonplaats: string;
          Telefoon: string;
          Email: string;
          Website: string;
        };
      };
      ExameninstellingID: number;
      Exameninstelling: {
        Naam: string;
        Contactgegevens: {
          Adresregel1: string;
          Huisnummer: string;
          HuisnummerToevoeging: string;
          Postcode: string;
          Woonplaats: string;
          Telefoon: string;
          Email: string;
          Website: string;
        };
      };
    };
  };
}

export const IS_LICENSE_VALID_FOR_SPECIALTY = gql`
  query isLicenseValidForSpecialty($input: isLicenseValidForSpecialtyInput!) {
    isLicenseValidForSpecialty(input: $input) {
      success
    }
  }
`;

export interface IIsLicenseValidForSpecialtyInput {
  licenseId: number;
  specialtyId: number;
}

export interface IIsLicenseValidForSpecialty {
  success: boolean;
}
