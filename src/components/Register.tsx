import React, { useContext } from 'react';
import { Alert } from '@erkenningen/ui/components/alert';
import { Button } from '@erkenningen/ui/components/button';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { toDutchDate } from '@erkenningen/ui/utils';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { Formik } from 'formik';
import { object, string } from 'yup';
import {
  Landen,
  RegisterForCourseInput,
  useGetListsQuery,
  useRegisterForCourseMutation,
} from '../generated/graphql';
import { UserContext } from '../shared/Auth';
import { SelectedLicenseContext } from '../shared/SelectedLicenseContext';
import { FormSelect, FormText } from '@erkenningen/ui/components/form';

export interface IRegisterCourseDetails {
  specialtyId: number;
  code: string;
  courseId: string;
  isDigitalSpecialty: boolean;
  title: string;
  courseDateTime: Date;
}

interface IRegister {
  registerCourseDetails: IRegisterCourseDetails;
  onCancel: any;
  returnToListLink: any;
}

const MessageRequired = 'Dit is een verplicht veld';
const numberRegEx = /^[1-9][0-9]{0,5}$/;
const RegisterSchema = object().shape({
  Street: string().min(2, 'Te weinig tekens').max(100, 'Max 100 tekens').required(MessageRequired),
  HouseNr: string()
    .required(MessageRequired)
    .matches(numberRegEx, 'Voer een geheel getal in, groter dan 0, maximaal 5 cijfers'),
  HouseNrAddition: string().max(10, 'Max 10 tekens'),
  Zipcode: string()
    .required(MessageRequired)
    .when('Country', {
      is: (val: string) => val === 'Nederland',
      then: () =>
        string().matches(/^[1-9][0-9]{3}[\s][A-Z]{2}$/, {
          message:
            'Nederlandse postcode moet geformatteerd zijn als "1234 AB". Buitenlandse postcode? Wijzig eerst het land.',
        }),
      otherwise: (schema) => schema.min(1),
    }),
  Country: string().min(2, 'Te weinig tekens').max(100, 'Max 100 tekens').required(MessageRequired),
  City: string().min(2, 'Te weinig tekens').max(100, 'Max 100 tekens').required(MessageRequired),
  EmailAddress: string()
    .email('E-mailadres is incorrect')
    .max(200, 'Max 200 tekens')
    .required(MessageRequired),
  KnowledgeArea: string().min(2, 'Selecteer een sector').required('Selecteer een sector'),
});

export function Register(properties: IRegister) {
  const licenseId = useContext(SelectedLicenseContext);
  const user = useContext(UserContext);
  const registerCourseDetails = properties.registerCourseDetails;

  const { loading, data, error } = useGetListsQuery();
  const [registerCourse, { loading: mutationLoading, error: mutationError, data: mutationData }] =
    useRegisterForCourseMutation();
  if (loading || mutationLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <Alert type="danger">Fout bij ophalen lijsten...</Alert>;
  }
  if (mutationError) {
    return (
      <PanelBody>
        <Alert type="danger">Fout bij opslaan gegevens...</Alert>
      </PanelBody>
    );
  }
  if (mutationData && mutationData.registerForCourse.success) {
    return (
      <PanelBody>
        <Alert type="success">Uw aanvraag is gedaan.</Alert>
        {properties.returnToListLink}
      </PanelBody>
    );
  }
  if (mutationData && !mutationData.registerForCourse.success) {
    return (
      <PanelBody>
        <Alert type="warning">{mutationData.registerForCourse.message}</Alert>
        {properties.returnToListLink}
      </PanelBody>
    );
  }
  if (!data) {
    return null;
  }
  const userData = user && user?.Persoon;
  const contactData = user && user?.Persoon && user?.Persoon?.Contactgegevens;
  if (!userData || !contactData) {
    return <p>Er zijn geen gegevens gevonden.</p>;
  }
  return (
    <>
      <PanelBody>
        <p>
          Deze gegevens worden aan de organisator doorgegeven. De organisator verwerkt deze gegevens
          volgens haar richtlijnen. De richtlijnen zijn bij de organisator beschikbaar.
        </p>
      </PanelBody>

      <Formik
        initialValues={{
          Street: contactData.Adresregel1 || '',
          HouseNr: contactData.Huisnummer || '',
          HouseNrAddition: contactData.HuisnummerToevoeging || '',
          Country: contactData.Land || '',
          Zipcode: contactData.Postcode || '',
          City: contactData.Woonplaats || '',
          PhoneNr: contactData.Telefoon || '',
          EmailAddress: contactData.Email || '',
          KnowledgeArea: '',
          AccountAddress: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          const input: RegisterForCourseInput = {
            licenseId,
            code: registerCourseDetails.code,
            courseDateTime: registerCourseDetails.courseDateTime,
            title: registerCourseDetails.title,
            courseId: parseInt(registerCourseDetails.courseId, 10),
            isDigitalSpecialty: registerCourseDetails.isDigitalSpecialty,
            specialtyId: registerCourseDetails.specialtyId,
            invoiceAddress: values.AccountAddress,
            knowledgeArea: values.KnowledgeArea,
            street: values.Street,
            houseNr: values.HouseNr,
            houseNrExtension: values.HouseNrAddition,
            country: values.Country,
            zipcode: values.Zipcode,
            city: values.City,
            phoneNr: values.PhoneNr,
            email: values.EmailAddress,
          };
          registerCourse({ variables: { input } });
        }}
      >
        {(props: any) => {
          return (
            <form onSubmit={props.handleSubmit} className="form form-horizontal">
              <div className="form-group">
                <label className="control-label col-md-3">Mijn naam</label>
                <div className="col-md-6 form-control-static">
                  {userData.Voorletters} {userData.Tussenvoegsel}
                  {userData.Tussenvoegsel ? ' ' : ''}
                  {userData.Achternaam}
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3">Mijn geboortedatum</label>
                <div className="col-md-6 form-control-static">
                  {toDutchDate(userData.Geboortedatum)}
                </div>
              </div>
              <FormText
                label="Straat"
                placeholder="Straat"
                name="Street"
                readonly={!!userData.IsGbaGeregistreerd}
                formItemProps={props}
              />
              <FormText
                label="Huisnummer "
                placeholder="Huisnummer (getal)"
                name="HouseNr"
                readonly={!!userData.IsGbaGeregistreerd}
                formItemProps={props}
              />
              <FormText
                label="Huisnummer toev."
                placeholder="Huisnummer toevoeging"
                name="HouseNrAddition"
                readonly={!!userData.IsGbaGeregistreerd}
                formItemProps={props}
              />

              <FormSelect
                label="Land"
                options={data.Landen.map((item: Landen) => ({
                  value: item.Value,
                  label: item.Text,
                }))}
                name="Country"
                filter={true}
                loading={loading}
                readonly={!!userData.IsGbaGeregistreerd}
                form={props}
              />
              <FormText
                label="Postcode"
                placeholder="Postcode (1234 AA)"
                name="Zipcode"
                readonly={!!userData.IsGbaGeregistreerd}
                formItemProps={props}
              />
              <FormText
                label="Plaats"
                placeholder="Plaats"
                name="City"
                readonly={!!userData.IsGbaGeregistreerd}
                formItemProps={props}
              />

              <FormText
                label="Telefoonnummer"
                placeholder="Telefoon nr (0612345678)"
                name="PhoneNr"
                formItemProps={props}
              />
              <FormText
                label="E-mailadres"
                placeholder="E-mailadres (mijn.adres@domein.nl)"
                name="EmailAddress"
                formItemProps={props}
              />
              <FormSelect
                label="Sector"
                options={data.Kennisgebieden.map((item) => ({
                  value: item.Naam,
                  label: item.Naam,
                }))}
                name="KnowledgeArea"
                filter={true}
                loading={loading}
                form={props}
              />
              <FormText
                label="De rekening moet naar"
                placeholder="Alleen invullen als de rekening niet naar uw eigen adres gestuurd moet worden"
                name="AccountAddress"
                formItemProps={props}
                isTextArea={true}
                helpText="Alleen invullen als de rekening niet naar uw eigen adres gestuurd moet worden. Vul in dat geval de naam en het VOLLEDIGE adres in van de organisatie waar de rekening naar toe moet."
              />
              <div className="form-group">
                <div
                  className="col-md-offset-3 col-md-6"
                  style={{ display: 'flex', alignItems: 'center', paddingBottom: '10px' }}
                >
                  <Button
                    type="submit"
                    label="Aanmelden"
                    icon="pi pi-check"
                    disabled={props.isSubmitting}
                  />
                  {properties.returnToListLink}
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
}
