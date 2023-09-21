import React, { useContext, useEffect, useState } from 'react';
import { parseLocationSearch } from '@erkenningen/ui/utils';
import { Spinner } from '@erkenningen/ui/components/spinner';
import { Button } from '@erkenningen/ui/components/button';
import { PanelBody } from '@erkenningen/ui/layout/panel';
import { FormSelect } from '@erkenningen/ui/components/form';
import { LinkButton, LinkButtonContainer } from '@erkenningen/ui/components/link-button';
import { Formik } from 'formik';
import { StringParam, useQueryParam } from 'use-query-params';
import { useGetListsQuery } from '../../generated/graphql';
import { UserContext } from '../../shared/Auth';
import OnlineCoursesTable from './OnlineCoursesTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { courseTypesSelect } from '../../shared/utils';

interface OnlineCourseFormProps {
  isOnline: boolean;
  seenOverview: (seen: boolean) => void;
}

const OnlineCoursesForm: React.FC<OnlineCourseFormProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    props.seenOverview(true);
  });
  const [searchData, setSearchData] = useState<any>();
  const [themeId, setThemeId] = useQueryParam('themaId', StringParam);
  const [knowledgeAreaId, setKnowledgeAreaId] = useQueryParam('sectorId', StringParam);

  const user = useContext(UserContext);
  const { loading, data, error } = useGetListsQuery();
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Er is een fout opgetreden, probeer het later opnieuw. Details: {{ error }}</p>;
  }

  const licenseId: number | null =
    (user &&
      user?.Certificeringen &&
      user?.Certificeringen.length > 0 &&
      user?.Certificeringen[0].CertificeringID) ||
    null;

  if (!searchData) {
    let theme = '0';
    let knowledgeArea = '0';
    const params = parseLocationSearch(location.search);
    params.forEach((param: { key: string; value: string }) => {
      switch (param.key) {
        case 'themaId':
          theme = param.value;

          break;
        case 'sectorId':
          knowledgeArea = param.value;
          break;
        default:
      }
    });
    setSearchData({
      licenseId,
      themeId: theme,
      knowledgeAreaId: knowledgeArea,
      isOnlineCourse: props.isOnline,
    });

    return null;
  }

  if (!data) {
    return null;
  }

  const knowledgeAreas = [
    { KennisgebiedID: '0', Naam: 'Alle' },
    ...data.Kennisgebieden.slice().sort((a, b) => (a.Naam < b.Naam ? -1 : 1)),
  ];
  const themes = [
    { ThemaID: '0', Naam: 'Alle' },
    ...data.Themas.slice().sort((a, b) => (a.Naam < b.Naam ? -1 : 1)),
  ];
  return (
    <>
      <PanelBody>
        <LinkButtonContainer>
          {user && (
            <>
              <LinkButton to={`/wat-heb-ik-al-gevolgd${location.search}`}>
                Wat heb ik al gevolgd?
              </LinkButton>
              <LinkButton to={`/waar-ben-ik-aangemeld${location.search}`}>
                Waar ben ik aangemeld?
              </LinkButton>
            </>
          )}
        </LinkButtonContainer>
        <h3>Zoek een online bijeenkomst</h3>
      </PanelBody>
      <Formik
        initialValues={{
          courseType: courseTypesSelect[2].value,
          licenseId,
          knowledgeAreaId: (searchData && searchData.knowledgeAreaId) || '0',
          themeId: (searchData && searchData.themeId) || '0',
          isOnlineCourse: props.isOnline,
        }}
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
                if (e.label === courseTypesSelect[2].label) {
                  return;
                }
                navigate(`${e.value}${location.search}`);
              }}
              form={formProps}
            />
            <FormSelect
              label="Sector"
              formControlClassName="col-sm-6"
              options={knowledgeAreas.map((item) => ({
                value: item.KennisgebiedID.toString(),
                label: item.Naam,
              }))}
              name="knowledgeAreaId"
              onChange={(e: any) => {
                setKnowledgeAreaId(e.value);
                setSearchData({
                  licenseId,
                  themeId,
                  knowledgeAreaId: e.value,
                  isOnlineCourse: props.isOnline,
                });
              }}
              loading={loading}
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
                  themeId: e.value,
                  isOnlineCourse: props.isOnline,
                });
              }}
              name="themeId"
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

      {searchData && <OnlineCoursesTable {...props} searchData={searchData} />}
    </>
  );
};

export default OnlineCoursesForm;
