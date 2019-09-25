import { useQuery } from '@apollo/react-hooks';
import {
  Button,
  LinkButtonContainer,
  PanelBody,
  parseLocationSearch,
  Spinner,
} from '@erkenningen/ui';
import { addMonths } from 'date-fns';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { ICompetentie, IKennisgebied, IThema } from '../../shared/Model';
import { IListsQuery, LISTS } from '../../shared/Queries';
import { UserContext } from '../../shared/UserContext';
import FormCalendar from '../ui/FormCalendar';
import FormSelect from '../ui/FormSelect';
import FormText from '../ui/FormText';
import LinkButton from '../ui/LinkButton';
import { NormalCoursesTable } from './NormalCoursesTable';

interface IIdLabel {
  Id: number;
  Label: string;
}

interface INormalCourseFormProps extends RouteComponentProps {
  isOnline: boolean;
}

export function NormalCoursesForm(props: INormalCourseFormProps) {
  const [searchData, setSearchData] = useState();
  const toDate = addMonths(new Date(), 3);
  const { loading, data, error } = useQuery<IListsQuery>(LISTS);

  const distances: IIdLabel[] = [
    { Id: 0, Label: 'Alle' },
    { Id: 5, Label: '5' },
    { Id: 10, Label: '10' },
    { Id: 25, Label: '25' },
    { Id: 50, Label: '50' },
    { Id: 100, Label: '100' },
  ];
  const handleZipcodesChange = (event: any, form: any) => {
    if (event.target.value !== '') {
      if (form.values.distanceRadius === 0) {
        form.setFieldValue('distanceRadius', 25);
      }
    } else {
      form.setFieldValue('distanceRadius', 0);
    }
  };
  const value = useContext(UserContext);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Er is een fout opgetreden, probeer het later opnieuw. Details: {{ error }}</p>;
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
      from: new Date(),
      to: toDate,
    });

    return null;
  }

  if (!data) {
    return null;
  }
  const knowledgeAreas = [
    { KennisgebiedID: '0', Naam: 'Alle' },
    ...data.Kennisgebieden.sort((a: IKennisgebied, b: IKennisgebied) => (a.Naam < b.Naam ? -1 : 1)),
  ];
  const themes = [
    { ThemaID: '0', Naam: 'Alle' },
    ...data.Themas.sort((a: IThema, b: IThema) => (a.Naam < b.Naam ? -1 : 1)),
  ];
  const competences = [
    { CompetentieID: '0', Naam: 'Alle' },
    ...data.Competenties.sort((a: ICompetentie, b: ICompetentie) => (a.Naam < b.Naam ? -1 : 1)),
  ];
  return (
    <>
      <PanelBody>
        <LinkButtonContainer>
          <LinkButton
            to={{
              pathname: `/bijeenkomsten-zoeken/online`,
              search: props.location.search,
            }}
          >
            Online bijeenkomsten
          </LinkButton>
          {value && (
            <>
              <LinkButton
                to={{
                  pathname: `/waar-ben-ik-aangemeld`,
                  search: props.location.search,
                }}
              >
                Waar ben ik aangemeld?
              </LinkButton>
              <LinkButton
                to={{
                  pathname: `/wat-heb-ik-al-gevolgd/`,
                  search: props.location.search,
                }}
              >
                Wat heb ik al gevolgd?
              </LinkButton>
            </>
          )}
        </LinkButtonContainer>
        <h3>Zoek een bijeenkomst op locatie</h3>
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
            from: new Date(),
            to: toDate,
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
                options={knowledgeAreas.map((item: IKennisgebied) => {
                  return {
                    value: parseInt(item.KennisgebiedID, 10),
                    label: item.Naam,
                  };
                })}
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
              <FormSelect
                id="competenceId"
                label="Bijeenkomsttype"
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
              <div className="form-group row">
                <div className="col-sm-4 col-md-3 offset-sm-4 offset-md-3 col-sm-offset-4 col-md-offset-3">
                  <Button
                    buttonType="submit"
                    label="Zoeken"
                    icon="pi pi-search"
                    disabled={formProps.isSubmitting}
                  />
                </div>
              </div>
            </form>
          )}
        />
      </PanelBody>
      {searchData && <NormalCoursesTable searchData={searchData} />}
    </>
  );
}
