import gql from 'graphql-tag';

export const MY_PERSON_QUERY = gql`
  {
    my {
      Persoon {
        PersoonID
        Voorletters
        Tussenvoegsel
        Achternaam
        Geslacht
        Nationaliteit
        Geboortedatum
        IsGbaGeregistreerd
        BSN
        Contactgegevens {
          ContactgegevensID
          Adresregel1
          Adresregel2
          Huisnummer
          HuisnummerToevoeging
          Postcode
          Woonplaats
          Land
          Email
        }
      }
      Certificeringen(alleenGeldig: false) {
        CertificeringID
        Nummer
        NummerWeergave
        BeginDatum
        EindDatum
        Status
        IsVerlengingVan
        DatumIngetrokkenVan
        DatumIngetrokkenTot
        UitstelVerleend
        UitstelTot
        Certificaat {
          Naam
          Code
        }
        CertificeringAantekeningen {
          AantekeningCode
        }
      }
    }
  }
`;

export const MY_STUDYRESULTS_QUERY = gql`
  query StudyResults($licenseId: Int) {
    my {
      Certificeringen(alleenGeldig: false) {
        CertificeringID
        Nummer
        NummerWeergave
        BeginDatum
        EindDatum
        Status
        IsVerlengingVan
        DatumIngetrokkenVan
        DatumIngetrokkenTot
        UitstelVerleend
        UitstelTot
        Certificaat {
          Naam
          Code
        }
        CertificeringAantekeningen {
          AantekeningCode
        }
      }
      Studieresultaten(isExamen: false, certificeringId: $licenseId) {
        StudieresultaatID
        Certificering {
          CertificeringID
          NummerWeergave
        }
        Cursus {
          Titel
        }
        Vak {
          Titel
          Competenties {
            Naam
          }
          Themas {
            Naam
          }
        }
        Status
        Datum
      }
    }
  }
`;

export const CERTIFICATES_QUERY = gql`
  {
    Certificaten {
      CertificaatID
      Code
      Naam
    }
  }
`;

export const TARIEF_DUPLICAAT_QUERY = gql`
  {
    tariefDuplicaat {
      TotaalExtBtw
    }
  }
`;
