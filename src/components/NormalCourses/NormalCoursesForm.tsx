import React, { useContext, useEffect, useState } from 'react';
import { parseLocationSearch } from '@erkenningen/ui/utils';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { Button } from '@erkenningen/ui/components/button';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { FormCalendar, FormSelect, FormText } from '@erkenningen/ui/components/form';
import { LinkButton, LinkButtonContainer } from '@erkenningen/ui/components/link-button';
import { addMonths } from 'date-fns';
import { Formik } from 'formik';
import { StringParam, useQueryParam } from 'use-query-params';
import { date, object } from 'yup';
import { useGetListsQuery } from '../../generated/graphql';
import { UserContext } from '../../shared/Auth';
import NormalCoursesTable from './NormalCoursesTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { courseTypesSelect } from '../../shared/utils';

interface IIdLabel {
  Id: number;
  Label: string;
}

interface NormalCourseFormProps {
  isOnline: boolean;
  seenOverview: (seen: boolean) => void;
}

const NormalCoursesSchema = object().shape({
  from: date().typeError('Vul een geldige datum in (dd-mm-jjjj) of kies een datum'),
  to: date().typeError('Vul een geldige datum in (dd-mm-jjjj) of kies een datum'),
});

const NormalCoursesForm: React.FC<NormalCourseFormProps> = (props) => {
  useEffect(() => {
    props.seenOverview(true);
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<any>();
  const [themeId, setThemeId] = useQueryParam('themaId', StringParam);
  const [competenceId, setCompetenceId] = useQueryParam('competentieId', StringParam);
  const [knowledgeAreaId, setKnowledgeAreaId] = useQueryParam('sectorId', StringParam);

  const toDate = addMonths(new Date(), 3);
  const { loading, data, error } = useGetListsQuery();

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
  const user = useContext(UserContext);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Er is een fout opgetreden, probeer het later opnieuw. Details: {{ error }}</p>;
  }

  const licenseId: number | null =
    (user &&
      user.Certificeringen &&
      user.Certificeringen.length > 0 &&
      user.Certificeringen[0].CertificeringID) ||
    null;
  let theme = '0';
  let competence = '0';
  let knowledgeArea = '0';
  if (!searchData) {
    const params = parseLocationSearch(location.search);
    params.forEach((param: { key: string; value: string }) => {
      switch (param.key) {
        case 'sectorId':
          knowledgeArea = param.value;
          break;
        case 'themaId':
          theme = param.value;
          break;
        case 'competentieId':
          competence = param.value;
          break;
        default:
      }
    });
    setSearchData({
      licenseId,
      competenceId: competence,
      themeId: theme,
      knowledgeAreaId: knowledgeArea,
      distanceRadius: 0,
      isOnlineCourse: props.isOnline,
    });

    return null;
  }

  if (!data) {
    return null;
  }
  const knowledgeAreas = [
    { KennisgebiedID: '0', Naam: 'Alle' },
    ...data.Kennisgebieden.slice().sort((a, b) => (a?.Naam < b?.Naam ? -1 : 1)),
  ];
  const themes = [
    { ThemaID: '0', Naam: 'Alle' },
    ...data.Themas.slice().sort((a, b) => (a.Naam < b.Naam ? -1 : 1)),
  ];
  const competences = [
    { CompetentieID: '0', Naam: 'Alle' },
    ...data.Competenties.slice().sort((a, b) => (a.Naam < b.Naam ? -1 : 1)),
  ];
  return (
    <>
      <PanelBody>
        <LinkButtonContainer>
          {user && (
            <>
              <LinkButton to={`/waar-ben-ik-aangemeld${location.search}`}>
                Waar ben ik aangemeld?
              </LinkButton>
              <LinkButton to={`/wat-heb-ik-al-gevolgd/${location.search}`}>
                Wat heb ik al gevolgd?
              </LinkButton>
            </>
          )}
        </LinkButtonContainer>
        <h3>Zoek een bijeenkomst op locatie</h3>
      </PanelBody>
      <Formik
        initialValues={{
          courseType: courseTypesSelect[0].value,
          licenseId,
          knowledgeAreaId: (searchData && searchData.knowledgeAreaId) || '0',
          themeId: (searchData && searchData.themeId) || '0',
          competenceId: (searchData && searchData.competenceId) || '0',
          zipcodeNumbers: user?.Persoon?.Contactgegevens?.Postcode || '',
          distanceRadius: 0,
          from: new Date(),
          to: toDate,
          isOnlineCourse: props.isOnline,
        }}
        validationSchema={NormalCoursesSchema}
        onSubmit={(values, { setSubmitting }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { courseType, ...searchDataValues } = values;
          setSearchData(searchDataValues);
          setSubmitting(false);
        }}
      >
        {(formProps: any) => (
          <form onSubmit={formProps.handleSubmit} className="form form-horizontal">
            <FormSelect
              label="Soort bijeenkomst"
              formControlClassName="col-sm-6"
              options={courseTypesSelect}
              name="courseType"
              onChange={(e: typeof courseTypesSelect[0]) => {
                if (e.label === courseTypesSelect[0].label) {
                  return;
                }
                navigate(`${e.value}${location.search}`);
              }}
              form={formProps}
            />
            <FormSelect
              label="Sector"
              formControlClassName="col-sm-6"
              options={knowledgeAreas.map((item) => {
                return {
                  value: item.KennisgebiedID.toString(),
                  label: item.Naam,
                };
              })}
              name="knowledgeAreaId"
              onChange={(e: any) => {
                setKnowledgeAreaId(e.value);
                setSearchData({
                  licenseId,
                  competenceId,
                  themeId,
                  knowledgeAreaId: e.value,
                  distanceRadius: 0,
                  isOnlineCourse: props.isOnline,
                });
              }}
              loading={loading}
              filter
              form={formProps}
            />
            <FormSelect
              label="Thema"
              formControlClassName="col-sm-6"
              options={themes.map((item) => ({
                value: item.ThemaID.toString(),
                label: item.Naam,
              }))}
              loading={loading}
              onChange={(e: any) => {
                setThemeId(e.value);
                setSearchData({
                  licenseId,
                  knowledgeAreaId,
                  competenceId,
                  themeId: e.value,
                  distanceRadius: 0,
                  isOnlineCourse: props.isOnline,
                });
              }}
              name="themeId"
              form={formProps}
            />
            <FormSelect
              label="Bijeenkomsttype"
              formControlClassName="col-sm-6"
              options={competences.map((item) => ({
                value: item.CompetentieID.toString(),
                label: item.Naam,
              }))}
              loading={loading}
              onChange={(e: any) => {
                setCompetenceId(e.value);
                setSearchData({
                  licenseId,
                  themeId,
                  knowledgeAreaId,
                  competenceId: e.value,
                  distanceRadius: 0,
                  isOnlineCourse: props.isOnline,
                });
              }}
              name="competenceId"
              form={formProps}
            />
            <FormCalendar
              id="dateFrom"
              label="Datum vanaf"
              placeholder="dd-mm-jjjj"
              formControlClassName="col-sm-3"
              name="from"
              form={formProps}
              style={{ width: '100%' }}
            />
            <FormCalendar
              id="dateTo"
              label="Datum tot"
              placeholder="dd-mm-jjjj"
              formControlClassName="col-sm-3"
              name="to"
              form={formProps}
              style={{ width: '100%' }}
            />
            <FormText
              label="Postcode"
              placeholder="1234"
              name="zipcodeNumbers"
              formControlClassName="col-sm-3"
              formItemProps={formProps}
              onChange={(e) => handleZipcodesChange(e, formProps)}
            />
            <FormSelect
              label="Afstand in km"
              options={distances.map((item: IIdLabel) => ({
                value: item.Id,
                label: item.Label,
              }))}
              name="distanceRadius"
              formControlClassName="col-sm-3"
              loading={loading}
              form={formProps}
            />
            <div className="form-group">
              <div className="col-sm-4 col-md-3 offset-sm-4 offset-md-3 col-sm-offset-4 col-md-offset-3">
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
      </Formik>

      {searchData && <NormalCoursesTable {...props} searchData={searchData} />}
    </>
  );
};

export default NormalCoursesForm;
