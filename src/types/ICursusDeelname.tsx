export interface ICursusDeelname {
  Certificering: {
    CertificeringID: string;
    NummerWeergave: string;
  };
  Cursus: {
    CursusID: string;
    Titel: string;
    Sessies: Array<{
      Datum: number;
    }>;
    Vak: {
      Themas: Array<{ Naam: string }>;
      Competenties: Array<{ Naam: string }>;
    };
  };
  CursusDeelnameID: string;
  CursusID: number;
  Status: string;
}
