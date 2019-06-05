import { Formik } from 'formik';
import { Button } from 'primereact/button';
import React, { useContext, useState } from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ICompetentie, IKennisgebied, IThema } from '../../shared/Model';
import { LISTS_QUERY } from '../../shared/Queries';
import { SelectedLicenseContext } from '../../shared/SelectedLicenseContext';
import { UserContext } from '../../shared/UserContext';
import FormCalendar from '../ui/FormCalendar';
import FormSelect from '../ui/FormSelect';
import FormText from '../ui/FormText';
import Spinner from '../ui/Spinner';
import { parseLocationSearch } from './../../helpers/url-utils';
import { NormalCoursesTable } from './NormalCoursesTable';

interface IIdLabel {
  Id: number;
  Label: string;
}

interface INormalCourseFormProps extends RouteComponentProps {
  isOnline: boolean;
}

export function NormalCoursesForm(props: INormalCourseFormProps) {
  console.log('#DH# props', props);
  const [searchData, setSearchData] = useState();
  const lic = useContext(SelectedLicenseContext);

  const distances: IIdLabel[] = [
    { Id: 0, Label: 'Alle' },
    { Id: 5, Label: '5' },
    { Id: 10, Label: '10' },
    { Id: 25, Label: '25' },
    { Id: 50, Label: '50' },
  ];
  const handleZipcodesChange = (event: any, form: any) => {
    if (event.target.value !== '') {
      if (form.values.distanceRadius === 0) {
        form.setFieldValue('distanceRadius', 5);
      }
    } else {
      form.setFieldValue('distanceRadius', 0);
    }
  };
  const value = useContext(UserContext);
  return (
    <>
      <div className="panel-body">
        <p>
          <Link
            to={{
              pathname: `/bijeenkomsten-zoeken/${props.isOnline ? 'op-locatie' : 'online'}`,
              search: props.location.search,
            }}
          >
            Ga naar{' '}
            {`${
              props.isOnline ? 'bijeenkomsten op locatie zoeken' : 'online bijeenkomsten zoeken'
            }`}
          </Link>
        </p>
      </div>
      <Query query={LISTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <div>
                <Spinner />
              </div>
            ) as React.ReactElement;
          }

          if (error) {
            return (
              <p>Er is een fout opgetreden, probeer het later opnieuw. Details: {{ error }}</p>
            ) as React.ReactElement;
          }

          const licenseId: string | null =
            (value &&
              value.my &&
              value.my.Certificeringen &&
              value.my.Certificeringen.length > 0 &&
              value.my.Certificeringen[0].CertificeringID) ||
            null;

          if (!searchData) {
            let theme = 0;
            let competence = 0;
            const params = parseLocationSearch(props.location.search);
            params.forEach((param: { key: string; value: string }) => {
              switch (param.key) {
                case 'themaId':
                  theme = parseInt(param.value, 10);

                  break;
                case 'competentieId':
                  competence = parseInt(param.value, 10);
                  break;
                default:
              }
            });
            setSearchData({
              licenseId,
              themeId: theme,
              competenceId: competence,
              distanceRadius: 0,
              isOnlineCourse: props.isOnline,
            });

            return null;
          }

          const knowledgeAreas = [{ KennisgebiedID: 0, Naam: 'Alle' }, ...data.Kennisgebieden];
          const themes = [{ ThemaID: 0, Naam: 'Alle' }, ...data.Themas];
          const competences = [{ CompetentieID: 0, Naam: 'Alle' }, ...data.Competenties];
          return (
            <Formik
              initialValues={{
                licenseId,
                knowledgeAreaId: 0,
                themeId: (searchData && searchData.themeId) || 0,
                competenceId: (searchData && searchData.competenceId) || 0,
                zipcodeNumbers:
                  (value &&
                    value.my &&
                    value.my.Persoon &&
                    value.my.Persoon.Contactgegevens.Postcode) ||
                  '',
                distanceRadius: 0,
                from: '',
                to: '',
                isOnlineCourse: props.isOnline,
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSearchData(values);
                setSubmitting(false);
              }}
              render={(formProps: any) => (
                <form onSubmit={formProps.handleSubmit} className="form form-horizontal">
                  <FormSelect
                    id="knowledgeArea"
                    label="Sector"
                    options={knowledgeAreas.map((item: IKennisgebied) => ({
                      value: parseInt(item.KennisgebiedID, 10),
                      label: item.Naam,
                    }))}
                    name="knowledgeAreaId"
                    loading={loading}
                    form={formProps}
                  />
                  <FormSelect
                    id="themeId"
                    label="Thema"
                    options={themes.map((item: IThema) => ({
                      value: parseInt(item.ThemaID, 10),
                      label: item.Naam,
                    }))}
                    loading={loading}
                    name="themeId"
                    form={formProps}
                  />
                  {!props.isOnline ? (
                    <>
                      <FormSelect
                        id="competenceId"
                        label="Licentietype"
                        options={competences.map((item: ICompetentie) => ({
                          value: parseInt(item.CompetentieID, 10),
                          label: item.Naam,
                        }))}
                        loading={loading}
                        name="competenceId"
                        form={formProps}
                      />
                      <FormCalendar
                        id="dateFrom"
                        label="Datum vanaf"
                        placeholder="dd-mm-jjjj"
                        name="from"
                        form={formProps}
                      />
                      <FormCalendar
                        id="dateTo"
                        label="Datum tot"
                        placeholder="dd-mm-jjjj"
                        name="to"
                        form={formProps}
                      />
                      <FormText
                        id="zipcode"
                        label="Postcode"
                        placeholder="1234"
                        name="zipcodeNumbers"
                        form={formProps}
                        onChange={(e) => handleZipcodesChange(e, formProps)}
                        labelClassNames="col-md-3"
                        formControlClassName="col-md-2"
                      />
                      <FormSelect
                        id="distanceRadius"
                        label="Afstand in km"
                        options={distances.map((item: IIdLabel) => ({
                          value: item.Id,
                          label: item.Label,
                        }))}
                        name="distanceRadius"
                        loading={loading}
                        form={formProps}
                      />
                    </>
                  ) : null}
                  <div className="form-group row">
                    <div className="col-md-4 col-md-offset-3">
                      <Button
                        type="submit"
                        label="Zoeken"
                        icon="pi pi-search"
                        disabled={formProps.isSubmitting}
                      />
                    </div>
                  </div>
                </form>
              )}
            />
          ) as React.ReactElement;
        }}
      </Query>
      {searchData && <NormalCoursesTable searchData={searchData} />}
    </>
  );
}
