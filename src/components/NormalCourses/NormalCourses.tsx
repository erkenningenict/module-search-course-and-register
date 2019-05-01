import { TabPanel } from 'primereact/tabview';
import * as React from 'react';
import Alert from '../ui/Alert';
import Col from '../ui/Col';
import Row from '../ui/Row';

// import ButtonNext from 'components/ui/ButtonNext';
// import ButtonPrev from 'components/ui/ButtonPrev';
// import FormCalendar from 'components/ui/FormCalendar';
import { Formik } from 'formik';
import FormSelect from '../ui/FormSelect';
// import FormSelectQuery from 'components/ui/FormSelectQuery';
// import FormStep from 'components/ui/FormStep';
import FormText from '../ui/FormText';

// this.onSubmit = this.onSubmit.bind(this);
export function NormalCourses(props: any) {
  return (
    <div>
      <Formik
        initialValues={{ email: '', dateFrom: '', dateTo: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="form form-horizontal">
            <Row>
              <Col>
                {/* <Alert type="info">
            {this.props.values.FormOptions.hasAccount
              ? 'Controleer uw gegevens en corrigeer indien nodig.'
              : 'Vul uw gegevens in'}
          </Alert> */}
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
                {/* <FormSelect
                  id="sector"
                  label="Sector"
                  options={[{ label: 'test', value: 'f' }]}
                  name="sector"
                  form={props} */}
                {/* /> */}
                <FormText
                  id="dateFrom"
                  label="Datum vanaf"
                  placeholder="dd-mm-jjjj"
                  name="dateFrom"
                  form={props}
                />
              </Col>
              {/* <Col>
          <FormSelect id="theme" label="Thema" options={[]} name="theme" form={props} />
        </Col>
        <Col>
          <FormSelect
            id="competence"
            label="Licentietype"
            options={[]}
            name="competence"
            form={props}
          />
        </Col> */}
            </Row>
            {/* <Row>
        <Col>
          <FormText
            id="dateFrom"
            label="Datum vanaf"
            placeholder="dd-mm-jjjj"
            name="dateFrom"
            form={props}
          />
        </Col>
        <Col>
          <FormText
            id="dateTo"
            label="Datum tot"
            placeholder="dd-mm-jjjj"
            name="dateTo"
            form={props}
          />
        </Col>
      </Row> */}
            {/* <Row>
        <Col>
          <FormText
            id="city"
            label="Nederlandse plaats"
            placeholder="Nederlandse plaats"
            name="city"
            form={props}
          />
          <FormText
            id="zipcode"
            label="Postcode"
            placeholder="1234 AA"
            name="zipcode"
            form={props}
          />
          <FormSelect
            id="distance"
            label="Afstand"
            options={[{ label: 'Alle', value: '0' }]}
            name="distance"
            form={props}
          />
        </Col>
      </Row> */}
            {/* <Row>
        <Col>
          <FormText
            id="searchTerm"
            label="Zoekterm"
            placeholder="zoek in titel en naam"
            name="searchTerm"
            form={props}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>U maakt uw aanvraag pas verderop definitief.</p>
         
        </Col>
      </Row> */}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

// private onSubmit() {
//   if (this.validate()) {
//     this.nextStep();
//   }
// }

// private validate(): boolean {
//   let isValid = true;

//   isValid = validateField(this.props, 'Persoon.Voorletters') && isValid;
//   isValid = validateField(this.props, 'Persoon.Achternaam') && isValid;
//   isValid = validateField(this.props, 'Persoon.Geboortedatum') && isValid;
//   isValid = validateField(this.props, 'Persoon.Geslacht') && isValid;
//   isValid = validateField(this.props, 'Persoon.Contactgegevens.Adresregel1') && isValid;
//   isValid = validateField(this.props, 'Persoon.Contactgegevens.Huisnummer') && isValid;
//   isValid = validateField(this.props, 'Persoon.Contactgegevens.Postcode') && isValid;
//   isValid = validateField(this.props, 'Persoon.Contactgegevens.Woonplaats') && isValid;

//   return isValid;
// }

// }
