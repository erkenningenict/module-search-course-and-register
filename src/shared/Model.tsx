export interface IMy {
  my: {
    Persoon: IPersoon;
    Certificeringen: ICertificering[];
    Studieresultaten: IStudieresultaat[];
  };
}

export interface IPersoon {
  PersoonID?: number;
  Voorletters: string;
  Tussenvoegsel: string;
  Achternaam: string;
  Geslacht: string;
  Nationaliteit: string;
  Geboortedatum?: number;
  IsGbaGeregistreerd: boolean;
  BSN?: number;
  Contactgegevens: IContactgegevens;
}

export interface IContactgegevens {
  ContactgegevensID: number;
  Adresregel1: string;
  Adresregel2: string;
  Huisnummer: string;
  HuisnummerToevoeging: string;
  Postcode: string;
  Woonplaats: string;
  Land: string;
  Email: string;
}

export interface ICertificering {
  CertificeringID: number;
  Nummer: string;
  NummerWeergave: string;
  BeginDatum: number;
  EindDatum: number;
  Status: string;
  IsVerlengingVan?: number;
  DatumIngetrokkenVan?: number;
  DatumIngetrokkenTot?: number;
  UitstelVerleend?: number;
  UitstelTot?: number;
  Certificaat: ICertificaat;
  CertificeringAantekeningen: ICertificeringAantekening[];
}

export interface ICertificaat {
  CertificaatID: number;
  Naam: string;
  Code: string;
}

export interface ICertificeringAantekening {
  AantekeningCode: string;
}

export interface IStudieresultaat {
  StudieresultaatID: number;
  Status: string;
  Datum: number;
  Certificering: ICertificering;
  Cursus: ICursus;
  Vak: IVak;
}

export interface ICursus {
  Titel: string;
}

export interface IVak {
  Titel: string;
  Competenties: ICompetentie[];
  Themas: IThema[];
}

export interface ICompetentie {
  Naam: string;
}

export interface IThema {
  Naam: string;
}

export interface IFormOptions {
  Remarks: string;
}

export interface ITariefDuplicaat {
  tariefDuplicaat: {
    TotaalExtBtw: number;
  };
}
