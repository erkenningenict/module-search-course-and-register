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

export interface ICompetentie {
  CompetentieID: string;
  Naam: string;
}

export interface IKennisgebied {
  KennisgebiedID: string;
  Naam: string;
}

export interface IThema {
  ThemaID: string;
  Naam: string;
}

export interface ILand {
  Value: string;
  Text: string;
}
