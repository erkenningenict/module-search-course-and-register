import { Formik } from 'formik';
import { Button } from 'primereact/button';
import * as React from 'react';
import { useContext } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { toDutchDate } from '../../helpers/date-utils';
import { IRegisterForCourseInput, REGISTER } from '../../shared/Mutations';
import { LISTS_QUERY } from '../../shared/Queries';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { UserContext } from '../../shared/UserContext';
import Alert from '../ui/Alert';
import FormSelect from '../ui/FormSelect';
import FormText from '../ui/FormText';
import Spinner from '../ui/Spinner';

interface IIdLabel {
  Id: number;
  Label: string;
}

export interface IRegisterCourseDetails {
  specialtyId?: number;
  code: string;
  courseId: string;
  isDigitalSpecialty: boolean;
  title: string;
  courseDateTime: Date;
}

interface IRegister {
  registerCourseDetails: IRegisterCourseDetails;
  onCancel: any;
}

const MessageRequired = 'Dit is een verplicht veld';
const RegisterSchema = Yup.object().shape({
  Street: Yup.string()
    .min(2, 'Te weinig tekens')
    .max(100, 'Max 100 tekens')
    .required(MessageRequired),
  HouseNr: Yup.number()
    .transform((n) => (isNaN(n) ? undefined : n))
    .integer('Huisnummer moet een getal zijn')
    .positive('Huisnummer mag niet negatief zijn')
    .min(1, 'Huisnummer moet groter dan 0 zijn')
    .required(MessageRequired),
  HouseNrAddition: Yup.string().max(10, 'Max 10 tekens'),
  Zipcode: Yup.string()
    .required(MessageRequired)
    .when('Country', {
      is: 'Nederland',
      then: Yup.string().matches(
        /^[1-9][0-9]{3}[\s][A-Z]{2}$/,
        'Nederlandse postcode moet geformatteerd zijn als "1234 AB". Buitenlandse postcode? Wijzig eerst het land.',
      ),
    }),
  Country: Yup.string()
    .min(2, 'Te weinig tekens')
    .max(100, 'Max 100 tekens')
    .required(MessageRequired),
  City: Yup.string()
    .min(2, 'Te weinig tekens')
    .max(100, 'Max 100 tekens')
    .required(MessageRequired),
  EmailAddress: Yup.string()
    .email('E-mailadres is incorrect')
    .max(200, 'Max 200 tekens')
    .required(MessageRequired),
  KnowledgeArea: Yup.string()
    .min(2, 'Selecteer een sector')
    .required('Selecteer een sector'),
});

export function Register(properties: IRegister) {
  const licenseId = useContext(SelectedLicenseContext);
  const user = useContext(UserContext);
  const registerCourseDetails = properties.registerCourseDetails;
  const returnToListLink = <Link to="/bijeenkomsten-zoeken/op-locatie">Terug</Link>;

  return (
    <>
      <div className="panel-body">
        <p>
          Deze gegevens worden aan de organisator doorgegeven. De organisator verwerkt deze gegevens
          volgens haar richtlijnen. De richtlijnen zijn bij de organisator beschikbaar. License{' '}
          {licenseId}
        </p>
      </div>
      <Mutation mutation={REGISTER}>
        {(
          registerCourse,
          { loading: mutationLoading, error: mutationError, data: mutationData },
        ) => (
          <Query query={LISTS_QUERY}>
            {({ loading, error, data }) => {
              if (loading || mutationLoading) {
                return (
                  <div>
                    <Spinner />
                  </div>
                ) as React.ReactElement;
              }
              if (error) {
                return (
                  <Alert type="danger">Fout bij ophalen lijsten...</Alert>
                ) as React.ReactElement;
              }
              if (mutationError) {
                return (
                  <Alert type="danger">Fout bij opslaan gegevens...</Alert>
                ) as React.ReactElement;
              }
              if (mutationData && mutationData.registerForCourse.success) {
                return (
                  <div className="panel-body">
                    <Alert type="success">Uw aanvraag is gedaan.</Alert>
                    {returnToListLink}
                  </div>
                ) as React.ReactElement;
              }
              const userData = user && user.my && user.my.Persoon;
              const contactData = user && user.my && user.my.Persoon.Contactgegevens;
              if (!userData || !contactData) {
                return <p>Er zijn geen gegevens gevonden.</p> as React.ReactElement;
              }
              return (
                <Formik
                  initialValues={{
                    Street: contactData.Adresregel1,
                    HouseNr: contactData.Huisnummer,
                    HouseNrAddition: contactData.HuisnummerToevoeging,
                    Country: contactData.Land,
                    Zipcode: contactData.Postcode,
                    City: contactData.Woonplaats,
                    PhoneNr: contactData.Telefoon,
                    BirthPlace: '',
                    EmailAddress: contactData.Email,
                    KnowledgeArea: '',
                    AccountAddress: '',
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    // console.log('#DH# ', registerCourseDetails);
                    const input: IRegisterForCourseInput = {
                      licenseId,
                      code: registerCourseDetails.code,
                      courseDateTime: registerCourseDetails.courseDateTime,
                      title: registerCourseDetails.title,
                      birthPlace: values.BirthPlace,
                      courseId: parseInt(registerCourseDetails.courseId, 10),
                      isDigitalSpecialty: registerCourseDetails.isDigitalSpecialty,
                      specialtyId: registerCourseDetails.specialtyId,
                      invoiceAddress: values.AccountAddress,
                      knowledgeArea: values.KnowledgeArea,
                    };
                    registerCourse({ variables: { input } });
                    // setTimeout(() => {
                    //   alert(JSON.stringify(values, null, 2));
                    //   //   setSearchData(values);
                    //   //   setSubmitting(false);
                    // }, 400);
                  }}
                  render={(props: any) => {
                    return (
                      <form onSubmit={props.handleSubmit} className="form form-horizontal">
                        <div className="form-group">
                          <label className="control-label col-md-3">Mijn naam</label>
                          <div className="col-md-6">
                            <p className="form-control-static">
                              {userData.Voorletters} {userData.Tussenvoegsel}
                              {userData.Tussenvoegsel ? ' ' : ''}
                              {userData.Achternaam}
                            </p>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="control-label col-md-3">Mijn geboortedatum</label>
                          <div className="col-md-6">
                            <p className="form-control-static">
                              {toDutchDate(userData.Geboortedatum)}
                            </p>
                          </div>
                        </div>
                        <FormText
                          id="street"
                          label="Straat"
                          placeholder="Straat"
                          name="Street"
                          readonly={!!userData.IsGbaGeregistreerd}
                          form={props}
                        />
                        <FormText
                          id="houseNr"
                          label="Huisnummer "
                          placeholder="Huisnummer (getal)"
                          name="HouseNr"
                          readonly={!!userData.IsGbaGeregistreerd}
                          form={props}
                        />
                        <FormText
                          id="houseNrAddition"
                          label="Huisnummer toev."
                          placeholder="Huisnummer toevoeging"
                          name="HouseNrAddition"
                          readonly={!!userData.IsGbaGeregistreerd}
                          form={props}
                        />

                        <FormSelect
                          id="country"
                          label="Land"
                          options={data.Landen.map((item: any) => ({
                            value: item.Value,
                            label: item.Text,
                          }))}
                          name="Country"
                          loading={loading}
                          readonly={!!userData.IsGbaGeregistreerd}
                          form={props}
                        />
                        <FormText
                          id="zipcode"
                          label="Postcode"
                          placeholder="Postcode (1234 AA)"
                          name="Zipcode"
                          readonly={!!userData.IsGbaGeregistreerd}
                          form={props}
                        />
                        <FormText
                          id="city"
                          label="Plaats"
                          placeholder="Plaats"
                          name="City"
                          readonly={!!userData.IsGbaGeregistreerd}
                          form={props}
                        />
                        <FormText
                          id="birthPlace"
                          label="Geboorteplaats"
                          placeholder="Geboorteplaats"
                          name="BirthPlace"
                          form={props}
                        />
                        <FormText
                          id="phoneNr"
                          label="Telefoonnummer"
                          placeholder="Telefoon nr (0612345678)"
                          name="PhoneNr"
                          form={props}
                        />
                        <FormText
                          id="email"
                          label="Emailadres"
                          placeholder="Emailadres (mijn.adres@domein.nl)"
                          name="EmailAddress"
                          form={props}
                        />
                        <FormSelect
                          id="knowledgeArea"
                          label="Sector"
                          options={data.Kennisgebieden.map((item: any) => ({
                            value: item.Naam,
                            label: item.Naam,
                          }))}
                          name="KnowledgeArea"
                          loading={loading}
                          form={props}
                        />
                        <FormText
                          id="accountAddress"
                          label="De rekening moet naar"
                          placeholder="Alleen invullen als de rekening niet naar uw eigen adres gestuurd moet worden"
                          name="AccountAddress"
                          form={props}
                          isTextArea={true}
                          helpText="Alleen invullen als de rekening niet naar uw eigen adres gestuurd moet worden. Vul in dat geval de naam en het VOLLEDIGE adres in van de organisatie waar de rekening naar toe moet."
                        />
                        <div className="form-group">
                          <div className="col-md-offset-3 col-md-6">
                            <Button
                              type="submit"
                              label="Aanmelden"
                              icon="pi pi-check"
                              disabled={props.isSubmitting}
                            />
                            {returnToListLink}
                          </div>
                        </div>
                      </form>
                    );
                  }}
                />
              ) as React.ReactElement;
            }}
          </Query>
        )}
      </Mutation>
    </>
  );
}
