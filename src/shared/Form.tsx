import { FormikProps } from 'formik';
import * as Yup from 'yup';

// Validation schema
const dateNow = new Date();
const MessageRequired = 'Dit is een verplicht veld';
// const MessageEmail = "Ongeldig e-mailadres";
const ValidationSchema = Yup.object().shape({
  Persoon: Yup.object().shape({
    Voorletters: Yup.string()
      .required(MessageRequired)
      .matches(
        /^(([A-Z]|Adr|Chr|Fr|Fred|IJ|Jac|Joh|Ph|St|Th|Tj)(\.){1}?){1,5}$/,
        'Voorletters zijn geformatteerd volgens hoofdletters en punten: "A.B.C.D.E.", tenzij Adr.',
      ),
    Achternaam: Yup.string().required(MessageRequired),
    Geslacht: Yup.string()
      .required(MessageRequired)
      .oneOf(['m', 'v', 'o'], 'Selecteer een geslacht'),
    Geboortedatum: Yup.date()
      .strict(true)
      .typeError('Ongeldige datum')
      .required(MessageRequired)
      .min(
        new Date(dateNow.getFullYear() - 100, dateNow.getMonth(), dateNow.getDate()),
        'Geboortedatum mag niet meer dan 100 jaar in het verleden liggen',
      )
      .max(
        new Date(dateNow.getFullYear() - 18, dateNow.getMonth(), dateNow.getDate()),
        'Geboortedatum moet meer dan 18 jaar in het verleden liggen',
      ),
    Contactgegevens: Yup.object().shape({
      Adresregel1: Yup.string().required(MessageRequired),
      Huisnummer: Yup.number()
        .transform((n) => (isNaN(n) ? undefined : n))
        .integer('Huisnummer moet een getal zijn')
        .positive('Huisnummer mag niet negatief zijn')
        .min(1, 'Huisnummer moet groter dan 0 zijn')
        .required(MessageRequired),
      Postcode: Yup.string()
        .required(MessageRequired)
        .when('Land', {
          is: 'Nederland',
          then: Yup.string().matches(
            /^[1-9][0-9]{3}[\s][A-Z]{2}$/,
            'Nederlandse postcode moet geformatteerd zijn als "1234 AB". Buitenlandse postcode? Wijzig eerst het land.',
          ),
        }),
      Woonplaats: Yup.string().required(MessageRequired),
      Land: Yup.string().required(MessageRequired),
      Email: Yup.string()
        .required(MessageRequired)
        .email('E-mailadres is incorrect'),
    }),
  }),
});

export function validateField(form: FormikProps<any>, field: string, value: any = null): boolean {
  try {
    if (value) {
      Yup.reach(ValidationSchema, field).validateSync(value);
    } else {
      ValidationSchema.validateSyncAt(field, form.values);
    }
    form.setFieldError(field, '');
    return true;
  } catch (validationError) {
    if (validationError.errors) {
      form.setFieldError(field, validationError.errors[0]);
    }
  }
  return false;
}

export default ValidationSchema;
